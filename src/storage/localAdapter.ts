import fs from "fs";
import path from "path";

export function saveLocalFile(tempPath: string, destDir: string, fileName: string): string {
  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

  const destPath = path.join(destDir, fileName);
  fs.copyFileSync(tempPath, destPath);

  console.log(`📦 Saved locally: ${destPath}`);
  return destPath;
}
