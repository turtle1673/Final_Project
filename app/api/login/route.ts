import supabaseConnect from "@/lib/supabase"

const login = async(formData:FormData) => {
    try{
    const email = formData.get("email")
    const password = formData.get("password")

    const supabase = supabaseConnect()
    }catch(err){
        console.log("Login error: ",err)
    }
}