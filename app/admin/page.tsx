'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { LayoutDashboard, FileText, Settings, LogOut, BarChart3 } from 'lucide-react'

export default function AdminDashboard() {
    const [session, setSession] = useState<any>(null)
    const router = useRouter()

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (!session) {
                router.push('/login')
            } else {
                setSession(session)
            }
        })
    }, [router])

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
                    <button style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', borderRadius: '8px', fontSize: '1rem', textAlign: 'left' }}>
                        <LayoutDashboard size={20} /> Dashboard
                    </button>
                    <button style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', background: 'transparent', border: 'none', color: 'white', borderRadius: '8px', fontSize: '1rem', textAlign: 'left' }}>
                        <FileText size={20} /> Editar Contenido
                    </button>
                    <button style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', background: 'transparent', border: 'none', color: 'white', borderRadius: '8px', fontSize: '1rem', textAlign: 'left' }}>
                        <BarChart3 size={20} /> Estadísticas
                    </button>
                    <button style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', background: 'transparent', border: 'none', color: 'white', borderRadius: '8px', fontSize: '1rem', textAlign: 'left' }}>
                        <Settings size={20} /> Configuración
                    </button>
                </nav>
                <button
                    onClick={handleLogout}
                    style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', background: 'transparent', border: 'none', color: '#ff4444', borderRadius: '8px', fontSize: '1rem', marginTop: 'auto' }}>
                    <LogOut size={20} /> Cerrar Sesión
                </button>
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1, padding: '40px', backgroundColor: '#f9f9f9', overflowY: 'auto' }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '30px' }}>Bienvenido, Administrador</h1>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '20px'
                }}>
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
            </main>
        </div>
    )
}
