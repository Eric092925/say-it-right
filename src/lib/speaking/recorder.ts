"use client";

import { SPEAKING_ERRORS } from "./scoring";

export interface RecordingResult {
  audioBlob: Blob;
  audioBase64: string;
  mimeType: string;
  durationSeconds: number;
  hasSpeech: boolean;
}

export type RecorderState =
  | "idle"
  | "requesting_permission"
  | "recording"
  | "processing"
  | "error";

/**
 * Determine supported audio MIME type for MediaRecorder across browsers.
 * Handles Chrome/Edge/Firefox (audio/webm) and Safari/iOS (audio/mp4 or audio/aac).
 */
export function getSupportedMimeType(): string {
  if (typeof window === "undefined" || !window.MediaRecorder) {
    return "audio/webm";
  }

  const candidateTypes = [
    "audio/webm;codecs=opus",
    "audio/webm",
    "audio/mp4",
    "audio/aac",
    "audio/ogg;codecs=opus",
    "",
  ];

  for (const type of candidateTypes) {
    if (!type || MediaRecorder.isTypeSupported(type)) {
      return type;
    }
  }

  return "";
}

/**
 * AudioRecorder class managing Web Audio API RMS volume analysis and MediaRecorder stream.
 */
export class AudioRecorder {
  private mediaStream: MediaStream | null = null;
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private animFrameId: number | null = null;
  private startTime: number = 0;
  private peakVolume: number = 0;
  private totalVolumeSamples: number = 0;
  private sumVolume: number = 0;
  private negotiatedMimeType: string = "";

  public isRecording = false;

  /**
   * Start microphone recording with live volume metering.
   */
  public async start(
    onVolumeChange?: (level: number) => void
  ): Promise<void> {
    if (typeof window === "undefined") {
      throw new Error(SPEAKING_ERRORS.UNSUPPORTED);
    }

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error(SPEAKING_ERRORS.UNSUPPORTED);
    }

    try {
      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });
    } catch (err: any) {
      if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
        throw new Error(SPEAKING_ERRORS.MIC_DENIED);
      } else if (err.name === "NotFoundError" || err.name === "DevicesNotFoundError") {
        throw new Error(SPEAKING_ERRORS.MIC_NOT_FOUND);
      } else {
        throw new Error(SPEAKING_ERRORS.MIC_DENIED);
      }
    }

    // Set up Web Audio API AnalyserNode for volume / silence detection
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.audioContext = new AudioCtx();
        const source = this.audioContext.createMediaStreamSource(this.mediaStream);
        this.analyser = this.audioContext.createAnalyser();
        this.analyser.fftSize = 256;
        source.connect(this.analyser);

        const dataArray = new Uint8Array(this.analyser.frequencyBinCount);

        const checkVolume = () => {
          if (!this.isRecording || !this.analyser) return;

          this.analyser.getByteFrequencyData(dataArray);

          // Calculate RMS volume
          let sumSquares = 0;
          for (let i = 0; i < dataArray.length; i++) {
            const normalized = dataArray[i] / 255;
            sumSquares += normalized * normalized;
          }
          const rms = Math.sqrt(sumSquares / dataArray.length);

          if (rms > this.peakVolume) {
            this.peakVolume = rms;
          }
          this.sumVolume += rms;
          this.totalVolumeSamples += 1;

          onVolumeChange?.(Math.min(1.0, rms * 3.5)); // Scale up slightly for visual feedback

          this.animFrameId = requestAnimationFrame(checkVolume);
        };

        this.animFrameId = requestAnimationFrame(checkVolume);
      }
    } catch (e) {
      console.warn("[AudioRecorder] Web Audio analyser setup warning:", e);
    }

    // Initialize MediaRecorder
    this.negotiatedMimeType = getSupportedMimeType();
    const options: MediaRecorderOptions = this.negotiatedMimeType
      ? { mimeType: this.negotiatedMimeType }
      : {};

    try {
      this.mediaRecorder = new MediaRecorder(this.mediaStream, options);
    } catch {
      this.mediaRecorder = new MediaRecorder(this.mediaStream);
      this.negotiatedMimeType = this.mediaRecorder.mimeType || "audio/webm";
    }

    this.audioChunks = [];
    this.mediaRecorder.ondataavailable = (event) => {
      if (event.data && event.data.size > 0) {
        this.audioChunks.push(event.data);
      }
    };

    this.isRecording = true;
    this.startTime = Date.now();
    this.peakVolume = 0;
    this.sumVolume = 0;
    this.totalVolumeSamples = 0;

    this.mediaRecorder.start(150); // Collect data chunks every 150ms
  }

  /**
   * Stop microphone recording and return processed audio payload.
   */
  public async stop(): Promise<RecordingResult> {
    if (!this.mediaRecorder || !this.isRecording) {
      throw new Error("Recording is not currently active.");
    }

    const durationSeconds = Math.max(0.1, (Date.now() - this.startTime) / 1000);
    this.isRecording = false;

    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }

    return new Promise<RecordingResult>((resolve, reject) => {
      if (!this.mediaRecorder) {
        reject(new Error("MediaRecorder instance missing."));
        return;
      }

      this.mediaRecorder.onstop = async () => {
        try {
          const finalMime = this.negotiatedMimeType || "audio/webm";
          const audioBlob = new Blob(this.audioChunks, { type: finalMime });

          // Convert Blob to Base64
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64data = reader.result as string;
            // Remove "data:audio/...;base64," prefix
            const cleanBase64 = base64data.split(",")[1] || "";

            // Check if audio has detectable speech based on volume and duration
            const avgVolume =
              this.totalVolumeSamples > 0
                ? this.sumVolume / this.totalVolumeSamples
                : 0;

            const hasSpeech =
              durationSeconds >= 0.8 &&
              (this.peakVolume >= 0.012 || avgVolume >= 0.006 || audioBlob.size > 1500);

            this.cleanup();

            resolve({
              audioBlob,
              audioBase64: cleanBase64,
              mimeType: finalMime,
              durationSeconds,
              hasSpeech,
            });
          };

          reader.onerror = () => {
            this.cleanup();
            reject(new Error("Failed to process audio recording buffer."));
          };

          reader.readAsDataURL(audioBlob);
        } catch (err) {
          this.cleanup();
          reject(err);
        }
      };

      try {
        this.mediaRecorder.stop();
      } catch (e) {
        this.cleanup();
        reject(e);
      }
    });
  }

  /**
   * Release media stream tracks and close AudioContext cleanly.
   */
  public cleanup(): void {
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }

    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((track) => {
        try {
          track.stop();
        } catch {
          // Ignore
        }
      });
      this.mediaStream = null;
    }

    if (this.audioContext && this.audioContext.state !== "closed") {
      try {
        this.audioContext.close();
      } catch {
        // Ignore
      }
      this.audioContext = null;
    }

    this.analyser = null;
    this.mediaRecorder = null;
    this.audioChunks = [];
    this.isRecording = false;
  }
}
