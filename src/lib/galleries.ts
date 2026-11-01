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

  galleries[gallery] ??= [];

  galleries[gallery].push({
    src: image.src,
    width: image.width,
    height: image.height,
    alt: ""
  });
}

export { galleries };