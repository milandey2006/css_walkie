// SERVER COMPONENT — fetches from Sanity on the server (no CORS issues)
import { client } from '../../lib/sanity'
import ProductsClient from './ProductsClient'

const RENTAL_PRODUCTS_QUERY = `
  *[_type == "rentalProduct" && inStock == true] | order(order asc, _createdAt asc) {
    _id,
    name,
    "id": slug.current,
    description,
    "price": pricePerDay,
    category,
    range,
    durability,
    badge,
    "imageUrl": image.asset->url
  }
`

export default async function ProductsPage() {
  let products = []

  try {
    products = await client.fetch(RENTAL_PRODUCTS_QUERY, {}, { cache: 'no-store' })
  } catch (err) {
    console.error('Sanity fetch error:', err)
  }

  return <ProductsClient products={products} />
}
