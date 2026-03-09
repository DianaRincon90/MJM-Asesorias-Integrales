'use client'

import { useEffect, useState, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { LayoutDashboard, FileText, Settings, LogOut, BarChart3, Upload } from 'lucide-react'
import Image from 'next/image'

export default function AdminDashboard() {
    const [session, setSession] = useState<any>(null)
    const [activeTab, setActiveTab] = useState('dashboard')
    const [currentImageUrl, setCurrentImageUrl] = useState('')
    const [uploading, setUploading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const router = useRouter()

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (!session) {
                router.push('/login')
            } else {
                setSession(session)
                fetchCurrentImage()
            }
        })
    }, [router])

    const fetchCurrentImage = async () => {
        const { data, error } = await supabase
            .from('site_settings')
            .select('value')
            .eq('id', 'nosotros_url')
            .single()

        if (data) {
            setCurrentImageUrl(data.value)
        } else {
            console.error('Error fetching image:', error)
            setCurrentImageUrl('/about/team-cimga.jpg') // Fallback
        }
    }

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            if (!e.target.files || e.target.files.length === 0) {
                return
            }
            setUploading(true)
            const file = e.target.files[0]
            const fileExt = file.name.split('.').pop()
            const fileName = `team-nosotros-${Math.random()}.${fileExt}`
            const filePath = `${fileName}`

            // Upload to storage
            const { error: uploadError } = await supabase.storage
                .from('website-images')
                .upload(filePath, file, { cacheControl: '3600', upsert: false })

            if (uploadError) throw uploadError

            // Get public URL
            const { data: { publicUrl } } = supabase.storage
                .from('website-images')
                .getPublicUrl(filePath)

            // Update database
            const { error: dbError } = await supabase
                .from('site_settings')
                .upsert({ id: 'nosotros_url', value: publicUrl })

            if (dbError) throw dbError

            setCurrentImageUrl(publicUrl)
            alert('¡Imagen actualizada correctamente!')

        } catch (error: any) {
            alert('Error subiendo la imagen: ' + error.message)
        } finally {
            setUploading(false)
            if (fileInputRef.current) {
                fileInputRef.current.value = ''
            }
        }
    }

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.push('/login')
    }

    if (!session) return <div style={{ padding: '50px', textAlign: 'center' }}>Cargando...</div>

    return (
        <div style={{ display: 'flex', height: '100vh', marginTop: '-100px' }}>
            {/* Sidebar */}
            <aside style={{
                width: '280px',
                backgroundColor: 'var(--mjm-blue)',
                color: 'white',
                padding: '40px 20px',
                display: 'flex',
                flexDirection: 'column'
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
                                <h3 style={{ marginBottom: '15px' }}>Resumen de Visitas</h3>
                                <div style={{ height: '200px', backgroundColor: 'var(--mjm-gray)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888' }}>
                                    [Gráfico de Estadísticas]
                                </div>
                            </div>
                            <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                                <h3 style={{ marginBottom: '15px' }}>Últimos Cambios</h3>
                                <ul style={{ listStyle: 'none', opacity: 0.7 }}>
                                    <li style={{ padding: '10px 0', borderBottom: '1px solid #eee' }}>• Se actualizó el banner principal</li>
                                    <li style={{ padding: '10px 0', borderBottom: '1px solid #eee' }}>• Ajuste en descripción de calibración</li>
                                    <li style={{ padding: '10px 0' }}>• Nuevo aliado añadido: FLUKE</li>
                                </ul>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div style={{ maxWidth: '800px' }}>
                            <h1 style={{ fontSize: '2rem', marginBottom: '30px' }}>Editar Contenido de la Web</h1>
                            <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                                <h3 style={{ marginBottom: '20px', color: 'var(--mjm-blue)' }}>Imagen del Equipo (Sección Nosotros)</h3>
                                <p style={{ opacity: 0.7, marginBottom: '20px', lineHeight: 1.6 }}>
                                    Esta es la imagen que se muestra actualmente tanto en la página de "Nosotros" como en la página principal para representar a su equipo. Utilice una imagen de buena calidad y formato horizontal para un mejor encuadre.
                                </p>
                                <div style={{ marginBottom: '30px' }}>
                                    <div style={{ position: 'relative', height: '350px', width: '100%', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#f0f0f0', border: '1px solid #e2e8f0' }}>
                                        {currentImageUrl ? (
                                            <Image src={currentImageUrl} alt="Current team image" fill style={{ objectFit: 'cover', objectPosition: 'center 20%' }} />
                                        ) : (
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#888' }}>Cargando imagen...</div>
                                        )}
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
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
                                    <span style={{ fontSize: '0.9rem', color: '#666' }}>Formatos recomendados: JPG, PNG.</span>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </main>
        </div>
    )
}
