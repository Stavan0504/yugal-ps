
import { createClient } from "@/utils/auth-helpers/client";

export async function uploadImages(images: File[]) {
    const supabase = await createClient();
  const {data,error} = await supabase.auth.getSession()
    const user = data.session?.user

  if (!user) {
    throw new Error('User not authenticated')
  }

  const uploadedImageUrls = []

  for (const image of images) {
    const fileName = `${user.id}/-${image.name}`

    const { data, error } = await supabase
      .storage
      .from('uploads')
      .upload(fileName, image)

    if (error) {
      console.error('Error uploading image:', error.message)
      continue
    }

    // Directly generate the public URL based on the file path
    const publicURL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/uploads/${data.path}`
    uploadedImageUrls.push(publicURL)
    // // Optionally, save the public URL in a database table for the user
    // await supabase.from('life_style').insert([
    //   { id: user.id, uploaded_photos: publicURL },
    // ])
  }

  return uploadedImageUrls
}
