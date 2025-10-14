import supabase from "@/lib/supabase"

//อัพโหลดรูปภาพไปที่ Supabase Storage แล้วคืนค่า URL ของรูปภาพที่อัพโหลด
export default async function uploadImageFile( fileBody:File | null) : Promise<string | null> {
        if(fileBody === null){
            return null
        }
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