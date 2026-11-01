import { execFileSync } from "node:child_process";
import { globSync } from "glob";
import fs from "node:fs";
import path from "node:path";

const imageFiles = globSync(
  "src/assets/**/*.{jpg,jpeg,png}",
  { windowsPathsNoEscape: true }
);

console.log(`Found ${imageFiles.length} images`);

if (imageFiles.length === 0) {
  console.log("No images found");
  process.exit(0);
}

const exifJson = execFileSync(
  "exiftool",
  ["-json", ...imageFiles],
  { encoding: "utf8" }
);

const exifData = JSON.parse(exifJson);

const metadata = {};

for (const photo of exifData) {
    console.log(photo);
    process.exit(0);
  const fileName = path.basename(photo.SourceFile);

  metadata[fileName] = {
    camera: photo.CameraModelName ?? null,
    lens: photo.LensID ?? photo.LensModel ?? null,
    focalLength: photo.FocalLength ?? null,
    aperture: photo.FNumber
      ? `f/${photo.FNumber}`
      : null,
    shutterSpeed:
      photo.ExposureTime ?? null,
    iso: photo.ISO ?? null,
    dateTaken:
      photo.DateTimeOriginal ?? null,
  };
}

fs.mkdirSync("src/generated", {
  recursive: true,
});

fs.writeFileSync(
  "src/generated/metadata.json",
  JSON.stringify(metadata, null, 2)
);

console.log(
  `Generated metadata for ${Object.keys(metadata).length} images`
);