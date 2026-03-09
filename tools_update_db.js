require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function run() {
    const { data, error } = await supabase.from('site_settings').upsert({
        id: 'servicio_1_image',
        value: '/services/aseguramiento.png'
    });
    console.log('Error?', error);
    console.log('Success!', data);
}
run();
