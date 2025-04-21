import { createClient } from '@supabase/supabase-js'

const supabaseConnect = async () => {
    try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string

        if (!supabaseUrl || !supabaseKey) {
            throw new Error("Supabase URL or Key is not defined in environment variables.")
        }

        const supabase = createClient(supabaseUrl, supabaseKey)
        if (!supabase) {
            throw new Error("Failed to create Supabase client.")
        }
        console.log("Connected to Supabase successfully.")
    }catch (error) {
        console.error("Error connecting to Supabase:", error)
    }

}

export default supabaseConnect