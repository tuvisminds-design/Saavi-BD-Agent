import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Saavi gifting prospecting",
    short_name: "Saavi",
    description: "HR heads for Saavi corporate gifting. Names stay blank until a source supports them.",
    start_url: "/m",
    scope: "/",
    display: "standalone",
    background_color: "#f8f5f0",
    theme_color: "#392616",
    icons: [
      {
        src: "/saavi-icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  }
}
