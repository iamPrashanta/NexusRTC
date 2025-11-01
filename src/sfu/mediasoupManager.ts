import { NexusConfig } from "../config/defaults";

/**
 * Placeholder for managing mediasoup routers, workers, producers, and consumers.
 * This class sets up the structure so integration can come later.
 */
export class MediasoupManager {
  private config: NexusConfig;

  constructor(config: NexusConfig) {
    this.config = config;
  }

  async init(): Promise<void> {
    // Future: initialize mediasoup Workers & Routers
    console.log("🛰️ MediasoupManager initialized (stub)");
  }
}
