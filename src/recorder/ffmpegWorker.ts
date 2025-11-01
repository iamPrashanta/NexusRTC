import { spawn, ChildProcessWithoutNullStreams } from "child_process";

export interface FFmpegOptions {
  input: string;
  output: string;
  codec?: string;
  format?: string;
}

export class FFmpegWorker {
  private process: ChildProcessWithoutNullStreams | null = null;

  start(options: FFmpegOptions): void {
    const { input, output, codec = "libx264", format = "mp4" } = options;

    const args = [
      "-y",
      "-i", input,
      "-c:v", codec,
      "-preset", "veryfast",
      output,
    ];

    this.process = spawn("ffmpeg", args);

    this.process.stdout.on("data", (data) =>
      console.log(`[FFmpeg]: ${data.toString()}`)
    );
    this.process.stderr.on("data", (data) =>
      console.error(`[FFmpeg Error]: ${data.toString()}`)
    );

    this.process.on("close", (code) =>
      console.log(`FFmpeg exited with code ${code}`)
    );
  }

  stop(): void {
    if (this.process) {
      this.process.kill("SIGINT");
      console.log("🛑 FFmpeg stopped");
    }
  }
}
