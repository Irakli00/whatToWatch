function CoverImage({ src, alt }) {
  return (
    <img
      className="max-w-[300px] rounded-xl"
      // src={coverImage.extraLarge}
      src={src}
      // alt={`${title.en} poster`}
      alt={alt}
    />
  );
}

export default CoverImage;
