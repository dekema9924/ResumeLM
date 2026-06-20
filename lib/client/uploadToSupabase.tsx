import { createClient } from '@supabase/supabase-js'

export async function uploadToSupabase(file: File, userId: string) {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const filePath = `${userId}/${Date.now()}_${file.name}`

    // 1. Upload
    const { data, error } = await supabase.storage
        .from('resume-files')
        .upload(filePath, file)

    if (error) {
        console.error('Upload error:', error)
        return null
    }

    // console.log("UPLOAD SUCCESS PATH:", filePath)

    // 2. Signed URL
    const { data: signed, error: signedError } = await supabase.storage
        .from('resume-files')
        .createSignedUrl(filePath, 60 * 60 * 24 * 7)

    if (signedError) {
        console.error('Signed URL error:', signedError)
        return null
    }

    return {
        path: filePath,
        signedUrl: signed.signedUrl
    }
}