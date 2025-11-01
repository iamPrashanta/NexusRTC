export interface NexusConfig {
  port: number;
  corsOrigin?: string;
  redisUrl?: string;
  postgresUrl?: string;
  ffmpegPath?: string;
  s3?: {
    accessKeyId: string;
    secretAccessKey: string;
    bucket: string;
    region?: string;
  };
}

export function loadDefaults(): NexusConfig {
  return {
    port: 4000,
    corsOrigin: "*",
    redisUrl: "redis://localhost:6379",
    postgresUrl: "postgres://user:password@localhost:5432/nexus",
    ffmpegPath: "/usr/bin/ffmpeg",
  };
}
