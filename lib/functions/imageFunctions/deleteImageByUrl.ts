import supabase from "@/lib/supabase"

//ลบรูปภาพจาก Supabase Storage โดยใช้ URL ของรูปภาพ
export default async function deleteImageByUrl (fileUrl:string) : Promise<void> {
    try {
    const urlObj = new URL(fileUrl)
    const pathIndex = urlObj.pathname.indexOf('/images/')
    if (pathIndex === -1) throw new Error('Invalid URL')

    const filePath = urlObj.pathname.slice(pathIndex + '/images/'.length)

    const { error } = await supabase
      .storage
      .from('images')
      .remove([filePath])
    if (error) throw new Error(error.message)

  } catch (err: any) {
    throw new Error(err.message || 'Error deleting image')
  }
}