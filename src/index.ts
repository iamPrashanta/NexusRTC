import { createAppServer } from "./server/app.js";
import { MediasoupManager } from "./sfu/mediasoupManager.js";
// import { createStorage } from "./storage/index.js";
import { NexusConfig, loadDefaults } from "./config/defaults";

export class NexusRTC {
  private config: NexusConfig;
  private mediasoup: MediasoupManager | null = null;

  constructor(config?: Partial<NexusConfig>) {
    this.config = { ...loadDefaults(), ...config };
  }

  async listen(port: number = this.config.port): Promise<void> {
    const appServer = await createAppServer(this.config);
    this.mediasoup = new MediasoupManager(this.config);

    appServer.listen(port, () => {
      console.log(`🚀 NexusRTC running on http://localhost:${port}`);
    });
  }
}

export * from "./config/defaults";
export * from "./storage";
export * from "./recorder/ffmpegWorker";
