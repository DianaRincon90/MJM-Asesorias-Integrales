import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function main() {
    const { error } = await supabase.from('site_settings').upsert({
        id: 'servicio_1_image',
        value: '/services/aseguramiento.png'
    })
    if (error) console.error('Error:', error)
    else console.log('Successfully set servicio_1_image')
}
main()
