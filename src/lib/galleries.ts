export const galleries = {
  tenerife: Object.values(
    import.meta.glob(
      "../assets/tenerife/*.{jpg,jpeg,png}",
      {
        eager: true,
        import: "default",
      }
    )
  ),

  bali: Object.values(
    import.meta.glob(
      "../assets/bali/*.{jpg,jpeg,png}",
      {
        eager: true,
        import: "default",
      }
    )
  ),
};