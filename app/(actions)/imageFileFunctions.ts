import supabase from "@/lib/supabase"

//อัพโหลดรูปภาพไปที่ Supabase Storage แล้วคืนค่า URL ของรูปภาพที่อัพโหลด
export const uploadImg = async ( fileBody:File) : Promise<string> => {
    const path = `public/${Date.now()}_${fileBody.name}`
    const {error} = await supabase.storage
    .from("images")
    .upload(path,fileBody)

    if (error) throw new Error(error.message)

    const {data} = supabase.storage
    .from("images")
    .getPublicUrl(path)

    const imageUrl = data.publicUrl
    if(!imageUrl) throw new Error('Error getting public URL')

    return imageUrl
}


//ลบรูปภาพจาก Supabase Storage โดยใช้ URL ของรูปภาพ
export const deleteImg = async (fileUrl:string) : Promise<void> => {
    try {
    const urlObj = new URL(fileUrl)
    const pathIndex = urlObj.pathname.indexOf('/images/')
    if (pathIndex === -1) throw new Error('Invalid URL')

    const filePath = urlObj.pathname.slice(pathIndex + '/images/'.length)

    const { error } = await supabase
      .storage
      .from('images')
      .remove([filePath])

    if (error) throw error
  } catch (err: any) {
    throw new Error(err.message || 'Error deleting image')
  }
}


//ลบรูปภาพเก่าแล้วอัพโหลดรูปภาพใหม่ จากนั้นคืนค่า URL ของรูปภาพใหม่
export const updateImg = async (oldFileUrl:string,newFileBody:File) : Promise<string> => {
    if(newFileBody.size === 0) throw new Error('select a new file to update')
    try{
    const newFileUrl = await uploadImg(newFileBody)
    await deleteImg(oldFileUrl)
    if(newFileUrl) return newFileUrl
    throw new Error('Error updating image')
    }catch(err:any){
        throw new Error(err.message)
    }
}