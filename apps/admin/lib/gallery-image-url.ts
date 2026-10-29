export function getGalleryImageUrl(imageUrl: string) {
  if (!imageUrl.startsWith("/api/gallery/")) {
    return imageUrl;
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (siteUrl) {
    return new URL(imageUrl, siteUrl).toString();
  }

  return process.env.NODE_ENV === "production"
    ? imageUrl
    : new URL(imageUrl, "http://localhost:3000").toString();
}
