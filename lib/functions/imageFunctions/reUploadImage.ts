import deleteImageByUrl from "./deleteImageByUrl"
import uploadImageFile from "./uploadImageFile"

//ลบรูปภาพเก่าแล้วอัพโหลดรูปภาพใหม่ จากนั้นคืนค่า URL ของรูปภาพใหม่
export default async function reUploadImage(newImageFile:File,oldImageUrl:string) {
    if(newImageFile.size === 0) throw new Error('select a new file to update')
    try{
    const newFileUrl = await uploadImageFile(newImageFile)
    await deleteImageByUrl(oldImageUrl)
    if(newFileUrl) return newFileUrl
    throw new Error('Error updating image')
    }catch(err:any){
        throw new Error(err.message)
    }
}