import metadata from "../generated/metadata.json";

const allImages = import.meta.glob(
  "../assets/**/*.{jpg,jpeg,png}",
  {
    eager: true,
    import: "default"
  }
);

const galleries = {};

for (const [path, image] of Object.entries(allImages)) {
  const gallery = path.split("/").at(-2);
  const filename = path.split("/").pop();

  galleries[gallery] ??= [];

  galleries[gallery].push({
    src: image.src,
    width: image.width,
    height: image.height,
    alt: "",
    exif: metadata[filename] ?? null
  });
}

export { galleries };