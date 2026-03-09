'use client'

import { useEffect, useState, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { LayoutDashboard, FileText, Settings, LogOut, BarChart3, Upload, Save, Image as ImageIcon, Home, Briefcase, Phone } from 'lucide-react'
import Image from 'next/image'

export default function AdminDashboard() {
    const [session, setSession] = useState<any>(null)
    const [activeTab, setActiveTab] = useState('dashboard')
    const [contentTab, setContentTab] = useState('inicio')
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    // Content State
    const [content, setContent] = useState<Record<string, string>>({
        home_hero_title: '',
        home_hero_subtitle: '',
        nosotros_url: '',
        servicios_title: '',
        servicios_subtitle: '',
        servicio_1_title: '',
        servicio_1_desc: '',
        servicio_1_image: '',
        servicio_2_title: '',
        servicio_2_desc: '',
        servicio_2_image: '',
        servicio_3_title: '',
        servicio_3_desc: '',
        servicio_3_image: '',
        servicio_4_title: '',
        servicio_4_desc: '',
        servicio_4_image: '',
        contacto_email_1: '',
        contacto_email_2: '',
        contacto_phone_1: '',
        contacto_phone_2: '',
        contacto_address: ''
    })

    const [uploading, setUploading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const router = useRouter()

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (!session) {
                router.push('/login')
            } else {
                setSession(session)
                fetchAllContent()
            }
        })
    }, [router])

    const fetchAllContent = async () => {
        setLoading(true)
        const { data, error } = await supabase.from('site_settings').select('id, value')

        if (data && !error) {
            const newContent = { ...content }
            data.forEach(item => {
                // @ts-ignore
                newContent[item.id] = item.value
            })
            setContent(newContent)
        } else {
            console.error('Error fetching content:', error)
        }
        setLoading(false)
    }

    const handleTextChange = (id: string, value: string) => {
        setContent(prev => ({ ...prev, [id]: value }))
    }

    const saveTextContent = async (idsToSave: string[]) => {
        setSaving(true)
        try {
            const updates = idsToSave.map(id => ({
                id,
                // @ts-ignore
                value: content[id]
            }))

            const { error } = await supabase.from('site_settings').upsert(updates)

            if (error) throw error
            alert('¡Contenido guardado exitosamente!')
        } catch (error: any) {
            alert('Error guardando el contenido: ' + error.message)
        } finally {
            setSaving(false)
        }
    }

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, settingId: string) => {
        const file = e.target.files?.[0]
        if (!file) return

        setUploading(true)
        try {
            const fileExt = file.name.split('.').pop()
            const fileName = `${Math.random()}.${fileExt}`
            const filePath = `${fileName}`

            const { error: uploadError } = await supabase.storage
                .from('website-images')
                .upload(filePath, file)

            if (uploadError) throw uploadError

            const { data: { publicUrl } } = supabase.storage
                .from('website-images')
                .getPublicUrl(filePath)

            setContent(prev => ({ ...prev, [settingId]: publicUrl }))

            const { error: dbError } = await supabase.from('site_settings').upsert({
                id: settingId,
                value: publicUrl
            })

            if (dbError) throw dbError

            alert('Imagen actualizada exitosamente')
        } catch (error: any) {
            alert('Error subiendo la imagen: ' + error.message)
        } finally {
            setUploading(false)
            if (fileInputRef.current) fileInputRef.current.value = ''
        }
    }

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.push('/login')
    }

    if (!session || loading) return <div style={{ padding: '50px', textAlign: 'center', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Cargando administrador...</div>

    return (
        <div style={{ display: 'flex', height: '100vh', paddingTop: '100px' }}>
            {/* Sidebar */}
            <aside style={{
                width: '280px',
                backgroundColor: 'var(--mjm-blue)',
                color: 'white',
                padding: '40px 20px',
                display: 'flex',
                flexDirection: 'column',
                height: 'calc(100vh - 100px)'
            }}>
                <h2 style={{ fontSize: '1.2rem', marginBottom: '40px', color: 'var(--mjm-orange)' }}>ADMIN DASHBOARD</h2>
                <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
                    <button
                        onClick={() => setActiveTab('dashboard')}
                        style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', background: activeTab === 'dashboard' ? 'rgba(255,255,255,0.1)' : 'transparent', border: 'none', color: 'white', borderRadius: '8px', fontSize: '1rem', textAlign: 'left', cursor: 'pointer' }}>
                        <LayoutDashboard size={20} /> Dashboard
                    </button>
                    <button
                        onClick={() => setActiveTab('content')}
                        style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', background: activeTab === 'content' ? 'rgba(255,255,255,0.1)' : 'transparent', border: 'none', color: 'white', borderRadius: '8px', fontSize: '1rem', textAlign: 'left', cursor: 'pointer' }}>
                        <FileText size={20} /> Editar Contenido
                    </button>
                    <button style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', background: 'transparent', border: 'none', color: 'white', borderRadius: '8px', fontSize: '1rem', textAlign: 'left', opacity: 0.5, cursor: 'not-allowed' }}>
                        <BarChart3 size={20} /> Estadísticas
                    </button>
                    <button style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', background: 'transparent', border: 'none', color: 'white', borderRadius: '8px', fontSize: '1rem', textAlign: 'left', opacity: 0.5, cursor: 'not-allowed' }}>
                        <Settings size={20} /> Configuración
                    </button>
                </nav>
                <button
                    onClick={handleLogout}
                    style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', background: 'transparent', border: 'none', color: '#ff4444', borderRadius: '8px', fontSize: '1rem', marginTop: 'auto', cursor: 'pointer' }}>
                    <LogOut size={20} /> Cerrar Sesión
                </button>
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1, padding: '40px', backgroundColor: '#f9f9f9', overflowY: 'auto' }}>
                {activeTab === 'dashboard' ? (
                    <>
                        <h1 style={{ fontSize: '2rem', marginBottom: '30px' }}>Bienvenido, Administrador</h1>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                            <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                                <h3 style={{ marginBottom: '15px' }}>Resumen de Sistema</h3>
                                <p style={{ opacity: 0.8, lineHeight: 1.6 }}>El Módulo de Gobernanza está activo. Ahora puedes modificar textos e imágenes de todas las secciones principales públicas usando el panel de "Editar Contenido".</p>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div style={{ maxWidth: '900px' }}>
                            <h1 style={{ fontSize: '2rem', marginBottom: '30px' }}>Editar Contenido de la Web</h1>

                            {/* Content Navigation */}
                            <div style={{ display: 'flex', gap: '10px', marginBottom: '30px', borderBottom: '1px solid #e2e8f0', paddingBottom: '15px' }}>
                                <button onClick={() => setContentTab('inicio')} className={contentTab === 'inicio' ? 'btn-primary' : ''} style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', background: contentTab === 'inicio' ? 'var(--mjm-blue)' : 'transparent', color: contentTab === 'inicio' ? 'white' : '#666', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}><Home size={18} /> Inicio</button>
                                <button onClick={() => setContentTab('nosotros')} className={contentTab === 'nosotros' ? 'btn-primary' : ''} style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', background: contentTab === 'nosotros' ? 'var(--mjm-blue)' : 'transparent', color: contentTab === 'nosotros' ? 'white' : '#666', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}><ImageIcon size={18} /> Nosotros</button>
                                <button onClick={() => setContentTab('servicios')} className={contentTab === 'servicios' ? 'btn-primary' : ''} style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', background: contentTab === 'servicios' ? 'var(--mjm-blue)' : 'transparent', color: contentTab === 'servicios' ? 'white' : '#666', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}><Briefcase size={18} /> Servicios</button>
                                <button onClick={() => setContentTab('contacto')} className={contentTab === 'contacto' ? 'btn-primary' : ''} style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', background: contentTab === 'contacto' ? 'var(--mjm-blue)' : 'transparent', color: contentTab === 'contacto' ? 'white' : '#666', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}><Phone size={18} /> Contacto</button>
                            </div>

                            {/* INICIO TAB */}
                            {contentTab === 'inicio' && (
                                <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                                    <h3 style={{ marginBottom: '20px', color: 'var(--mjm-blue)' }}>Textos de la Página Principal</h3>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                        <div>
                                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: '#444' }}>Título Principal (Hero)</label>
                                            <input
                                                type="text"
                                                value={content.home_hero_title}
                                                onChange={(e) => handleTextChange('home_hero_title', e.target.value)}
                                                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '1rem' }}
                                            />
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: '#444' }}>Subtítulo Principal</label>
                                            <textarea
                                                value={content.home_hero_subtitle}
                                                onChange={(e) => handleTextChange('home_hero_subtitle', e.target.value)}
                                                rows={3}
                                                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '1rem', resize: 'vertical' }}
                                            />
                                        </div>
                                        <button
                                            onClick={() => saveTextContent(['home_hero_title', 'home_hero_subtitle'])}
                                            disabled={saving}
                                            className="btn-primary"
                                            style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
                                            <Save size={18} /> {saving ? 'Guardando...' : 'Guardar Cambios de Inicio'}
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* NOSOTROS TAB */}
                            {contentTab === 'nosotros' && (
                                <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                                    <h3 style={{ marginBottom: '20px', color: 'var(--mjm-blue)' }}>Imagen del Equipo</h3>
                                    <p style={{ opacity: 0.7, marginBottom: '20px', lineHeight: 1.6 }}>Esta imagen representa la empresa en la página de Nosotros y en la vista rápida de la página principal.</p>

                                    <div style={{ marginBottom: '30px' }}>
                                        <div style={{ position: 'relative', height: '350px', width: '100%', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#f0f0f0', border: '1px solid #e2e8f0' }}>
                                            {content.nosotros_url ? (
                                                <Image src={content.nosotros_url} alt="Current team image" fill style={{ objectFit: 'cover', objectPosition: 'center 20%' }} />
                                            ) : (
                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#888' }}>Sin imagen guardada</div>
                                            )}
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleImageUpload(e, 'nosotros_url')}
                                            ref={fileInputRef}
                                            style={{ display: 'none' }}
                                            id="image-upload"
                                            disabled={uploading}
                                        />
                                        <label htmlFor="image-upload" style={{
                                            display: 'inline-flex', alignItems: 'center', gap: '10px',
                                            padding: '14px 28px', backgroundColor: 'var(--mjm-orange)', color: 'white',
                                            borderRadius: '8px', cursor: uploading ? 'not-allowed' : 'pointer',
                                            fontWeight: 600, opacity: uploading ? 0.7 : 1, transition: 'all 0.3s'
                                        }}>
                                            <Upload size={20} />
                                            {uploading ? 'Subiendo nueva imagen a Supabase...' : 'Subir Nueva Imagen'}
                                        </label>
                                        <span style={{ fontSize: '0.9rem', color: '#666' }}>Se guarda automáticamente.</span>
                                    </div>
                                </div>
                            )}

                            {/* SERVICIOS TAB */}
                            {contentTab === 'servicios' && (
                                <>
                                    <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                                        <h3 style={{ marginBottom: '20px', color: 'var(--mjm-blue)' }}>Encabezado de Servicios</h3>

                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                            <div>
                                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: '#444' }}>Título de la Página</label>
                                                <input
                                                    type="text"
                                                    value={content.servicios_title}
                                                    onChange={(e) => handleTextChange('servicios_title', e.target.value)}
                                                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '1rem' }}
                                                />
                                            </div>
                                            <div>
                                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: '#444' }}>Descripción o Subtítulo</label>
                                                <textarea
                                                    value={content.servicios_subtitle}
                                                    onChange={(e) => handleTextChange('servicios_subtitle', e.target.value)}
                                                    rows={2}
                                                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '1rem', resize: 'vertical' }}
                                                />
                                            </div>
                                            <button
                                                onClick={() => saveTextContent(['servicios_title', 'servicios_subtitle'])}
                                                disabled={saving}
                                                className="btn-primary"
                                                style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
                                                <Save size={18} /> {saving ? 'Guardando...' : 'Guardar Encabezado'}
                                            </button>
                                        </div>
                                    </div>

                                    <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', marginTop: '30px' }}>
                                        <h3 style={{ marginBottom: '20px', color: 'var(--mjm-blue)' }}>Tarjetas de Servicios</h3>
                                        <p style={{ opacity: 0.7, marginBottom: '20px' }}>A continuación puedes configurar cada uno de los 4 servicios principales mostrados en tarjetas.</p>

                                        {[1, 2, 3, 4].map((num) => {
                                            const titleKey = `servicio_${num}_title` as keyof typeof content;
                                            const descKey = `servicio_${num}_desc` as keyof typeof content;
                                            const imageKey = `servicio_${num}_image` as keyof typeof content;

                                            return (
                                                <div key={num} style={{ borderBottom: num < 4 ? '1px solid #e2e8f0' : 'none', paddingBottom: '30px', marginBottom: '30px' }}>
                                                    <h4 style={{ color: 'var(--mjm-orange)', marginBottom: '15px' }}>Servicio #{num}</h4>

                                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                                        <div>
                                                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: '#444' }}>Título del Servicio</label>
                                                            <input
                                                                type="text"
                                                                value={content[titleKey]}
                                                                onChange={(e) => handleTextChange(titleKey, e.target.value)}
                                                                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '1rem', marginBottom: '15px' }}
                                                            />

                                                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: '#444' }}>Descripción Breve</label>
                                                            <textarea
                                                                value={content[descKey]}
                                                                onChange={(e) => handleTextChange(descKey, e.target.value)}
                                                                rows={3}
                                                                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '1rem', resize: 'vertical', marginBottom: '15px' }}
                                                            />

                                                            <button
                                                                onClick={() => saveTextContent([titleKey, descKey])}
                                                                disabled={saving}
                                                                className="btn-primary"
                                                                style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                                <Save size={18} /> Guardar Textos S. {num}
                                                            </button>
                                                        </div>

                                                        <div>
                                                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: '#444' }}>Imagen / Banner del Servicio</label>
                                                            <div style={{ position: 'relative', height: '150px', width: '100%', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#f0f0f0', border: '1px solid #e2e8f0', marginBottom: '15px' }}>
                                                                {content[imageKey] ? (
                                                                    <Image src={content[imageKey]} alt={`Servicio ${num}`} fill style={{ objectFit: 'cover' }} />
                                                                ) : (
                                                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#888', fontSize: '0.9rem' }}>Sin imagen (use la opción de abajo)</div>
                                                                )}
                                                            </div>

                                                            <input
                                                                type="file"
                                                                accept="image/*"
                                                                onChange={(e) => {
                                                                    const file = e.target.files?.[0];
                                                                    if (file) {
                                                                        handleImageUpload(e, imageKey);
                                                                    }
                                                                }}
                                                                style={{ display: 'none' }}
                                                                id={`image-upload-srv-${num}`}
                                                                disabled={uploading}
                                                            />
                                                            <label htmlFor={`image-upload-srv-${num}`} style={{
                                                                display: 'inline-flex', alignItems: 'center', gap: '10px',
                                                                padding: '10px 20px', backgroundColor: 'var(--mjm-blue)', color: 'white',
                                                                borderRadius: '8px', cursor: uploading ? 'not-allowed' : 'pointer',
                                                                fontWeight: 600, opacity: uploading ? 0.7 : 1, transition: 'all 0.3s', fontSize: '0.9rem'
                                                            }}>
                                                                <Upload size={16} />
                                                                {uploading ? 'Subiendo...' : 'Actualizar Imagen'}
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                            )}

                                    {/* CONTACTO TAB */}
                                    {contentTab === 'contacto' && (
                                        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                                            <h3 style={{ marginBottom: '20px', color: 'var(--mjm-blue)' }}>Información de Contacto</h3>

                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                                <div>
                                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: '#444' }}>Correo Principal</label>
                                                    <input
                                                        type="text"
                                                        value={content.contacto_email_1}
                                                        onChange={(e) => handleTextChange('contacto_email_1', e.target.value)}
                                                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '1rem' }}
                                                    />
                                                </div>
                                                <div>
                                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: '#444' }}>Correo Secundario</label>
                                                    <input
                                                        type="text"
                                                        value={content.contacto_email_2}
                                                        onChange={(e) => handleTextChange('contacto_email_2', e.target.value)}
                                                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '1rem' }}
                                                    />
                                                </div>
                                                <div>
                                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: '#444' }}>Teléfono / Celular 1</label>
                                                    <input
                                                        type="text"
                                                        value={content.contacto_phone_1}
                                                        onChange={(e) => handleTextChange('contacto_phone_1', e.target.value)}
                                                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '1rem' }}
                                                    />
                                                </div>
                                                <div>
                                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: '#444' }}>Teléfono / Celular 2</label>
                                                    <input
                                                        type="text"
                                                        value={content.contacto_phone_2}
                                                        onChange={(e) => handleTextChange('contacto_phone_2', e.target.value)}
                                                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '1rem' }}
                                                    />
                                                </div>
                                                <div style={{ gridColumn: '1 / -1' }}>
                                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: '#444' }}>Dirección Física</label>
                                                    <input
                                                        type="text"
                                                        value={content.contacto_address}
                                                        onChange={(e) => handleTextChange('contacto_address', e.target.value)}
                                                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '1rem' }}
                                                    />
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => saveTextContent(['contacto_email_1', 'contacto_email_2', 'contacto_phone_1', 'contacto_phone_2', 'contacto_address'])}
                                                disabled={saving}
                                                className="btn-primary"
                                                style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '30px' }}>
                                                <Save size={18} /> {saving ? 'Guardando...' : 'Guardar Información de Contacto'}
                                            </button>
                                        </div>
                                    )}
                                </div>
                        </>
                )}
                    </main>
        </div>
    )
}
