import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  useCdn: false, // server-side fetching — no CDN needed
})


// Helper: build a Sanity image URL from an image asset reference
export function imageUrl(source) {
  if (!source?.asset?._ref) return null
  const ref = source.asset._ref
  // ref format: image-{id}-{width}x{height}-{format}
  const [, id, dimensions, format] = ref.split('-')
  return `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${id}-${dimensions}.${format}`
}
