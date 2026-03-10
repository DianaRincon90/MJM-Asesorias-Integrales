import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Faltan variables de entorno NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY')
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function seedSettings() {
    const keysToEnsure = [
        'servicio_1_title', 'servicio_1_desc', 'servicio_1_image',
        'servicio_2_title', 'servicio_2_desc', 'servicio_2_image',
        'servicio_3_title', 'servicio_3_desc', 'servicio_3_image',
        'servicio_4_title', 'servicio_4_desc', 'servicio_4_image',
        'servicio_5_title', 'servicio_5_desc', 'servicio_5_image'
    ]

    const records = keysToEnsure.map(key => ({
        id: key,
        value: '' // Valor vacío por defecto para que el Admin UI lo llene
    }))

    const { data, error } = await supabase
        .from('site_settings')
        .upsert(records, { onConflict: 'id' })

    if (error) {
        console.error('Error al inyectar llaves maestras:', error.message)
    } else {
        console.log('✅ Llaves maestras inyectadas con éxito. Ahora todas las operaciones del Admin serán simples UPDATEs.')
    }
}

seedSettings()
