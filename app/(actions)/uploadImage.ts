import supabase from "@/lib/supabase"

export const uploadImg = async (file:File) =>{
    const filePath = `public/${Date.now()}-${file.name}`

    const {error} = await supabase.storage
    .from("images")
    .upload(filePath,file,{
    })

    if (error) throw new Error(error.message)

    const {data} = supabase.storage
    .from("images")
    .getPublicUrl(filePath)

    return data.publicUrl
}