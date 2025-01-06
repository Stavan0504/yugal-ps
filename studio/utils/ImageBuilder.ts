import {SanityImageSource} from '@sanity/image-url/lib/types/types'
import client from '../../lib/createClient'
import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source).url()
}
