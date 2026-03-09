'use client';

import { useEffect, useState } from 'react'
import { Shield, BookOpen, Settings, Package, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'

export default function Home() {
    const [teamImage, setTeamImage] = useState('/about/team-cimga.jpg')
    const [heroTitle, setHeroTitle] = useState('Expertos en Aseguramiento Metrológico')
    const [heroSubtitle, setHeroSubtitle] = useState('Consultoría, capacitación, verificación y calibración con los más altos estándares de calidad y trazabilidad internacional.')

    useEffect(() => {
        const fetchContent = async () => {
            const { data } = await supabase.from('site_settings').select('id, value')
            if (data) {
                const imgData = data.find(i => i.id === 'nosotros_url')
                const titleData = data.find(i => i.id === 'home_hero_title')
                const subtitleData = data.find(i => i.id === 'home_hero_subtitle')

                if (imgData?.value) setTeamImage(imgData.value)
                if (titleData?.value) setHeroTitle(titleData.value)
                if (subtitleData?.value) setHeroSubtitle(subtitleData.value)
            }
        }
        fetchContent()
    }, [])

    return (
        <div>
            {/* Hero Section */}
            <section style={{
                height: '85vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, rgba(27, 54, 93, 0.9) 0%, rgba(13, 27, 42, 0.9) 100%), url("https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80") no-repeat center center/cover',
                color: 'white',
                textAlign: 'center',
                padding: '0 20px'
            }}>
                <div style={{ maxWidth: '900px' }}>
                    <h1 style={{ fontSize: '4rem', marginBottom: '25px', fontWeight: 800, lineHeight: 1.1 }}>
                        <span dangerouslySetInnerHTML={{ __html: heroTitle.replace('Aseguramiento Metrológico', '<span class="text-orange">Aseguramiento Metrológico</span>') }} />
                    </h1>
                    <p style={{ fontSize: '1.3rem', marginBottom: '45px', opacity: 0.9, lineHeight: 1.6 }}>
                        {heroSubtitle}
                    </p>
                    <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                        <a href="/contacto" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
                            Contáctanos <ArrowRight size={18} style={{ marginLeft: '10px' }} />
                        </a>
                        <a href="/servicios" style={{
                            padding: '14px 28px',
                            borderRadius: '12px',
                            border: '2px solid white',
                            background: 'transparent',
                            color: 'white',
                            fontWeight: 600,
                            textDecoration: 'none',
                            transition: 'all 0.3s'
                        }}>Explorar Servicios</a>
                    </div>
                </div>
            </section>

            {/* Quick Overview Section */}
            <section className="section-container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
                    <div style={{ padding: '40px', borderRadius: '24px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                        <div style={{ width: '60px', height: '60px', backgroundColor: 'var(--mjm-blue)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '25px' }}>
                            <Shield className="text-orange" size={32} />
                        </div>
                        <h3 style={{ fontSize: '1.8rem', marginBottom: '15px' }}>Confianza Técnica</h3>
                        <p style={{ opacity: 0.7, lineHeight: 1.6 }}>Garantizamos la precisión en sus procesos a través de un riguroso aseguramiento metrológico y normativo.</p>
                        <a href="/servicios" style={{ color: 'var(--mjm-orange)', fontWeight: 600, textDecoration: 'none', marginTop: '20px', display: 'inline-block' }}>Ver detalles →</a>
                    </div>
                    <div style={{ padding: '40px', borderRadius: '24px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                        <div style={{ width: '60px', height: '60px', backgroundColor: 'var(--mjm-blue)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '25px' }}>
                            <BookOpen className="text-orange" size={32} />
                        </div>
                        <h3 style={{ fontSize: '1.8rem', marginBottom: '15px' }}>Formación Experta</h3>
                        <p style={{ opacity: 0.7, lineHeight: 1.6 }}>Capacitamos a su personal con metodologías avanzadas y conocimiento práctico de vanguardia.</p>
                        <a href="/servicios" style={{ color: 'var(--mjm-orange)', fontWeight: 600, textDecoration: 'none', marginTop: '20px', display: 'inline-block' }}>Ver capacitaciones →</a>
                    </div>
                    <div style={{ padding: '40px', borderRadius: '24px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                        <div style={{ width: '60px', height: '60px', backgroundColor: 'var(--mjm-blue)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '25px' }}>
                            <Settings className="text-orange" size={32} />
                        </div>
                        <h3 style={{ fontSize: '1.8rem', marginBottom: '15px' }}>Calibración Precisa</h3>
                        <p style={{ opacity: 0.7, lineHeight: 1.6 }}>Servicios de calibración de alta exactitud para asegurar la excelencia en sus mediciones industriales.</p>
                        <a href="/servicios" style={{ color: 'var(--mjm-orange)', fontWeight: 600, textDecoration: 'none', marginTop: '20px', display: 'inline-block' }}>Ver magnitudes →</a>
                    </div>
                </div>
            </section>

            {/* Featured Section */}
            <section style={{ backgroundColor: 'var(--mjm-blue)', color: 'white', padding: '100px 0' }}>
                <div className="section-container">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '80px', flexWrap: 'wrap' }}>
                        <div style={{ flex: '1 1 500px', position: 'relative', height: '500px', borderRadius: '32px', overflow: 'hidden', boxShadow: '0 25px 50px rgba(0,0,0,0.3)' }}>
                            <Image
                                src={teamImage}
                                alt="MJM en CIMGA"
                                fill
                                style={{ objectFit: 'cover', objectPosition: 'center top' }}
                            />
                        </div>
                        <div style={{ flex: '1 1 400px' }}>
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '30px', color: 'var(--mjm-orange)' }}>Más que asesorías, somos su socio en calidad</h2>
                            <p style={{ fontSize: '1.2rem', lineHeight: 1.8, marginBottom: '40px', opacity: 0.9 }}>
                                Descubra nuestra filosofía empresarial y el equipo de expertos que respalda cada uno de nuestros procesos técnicos.
                            </p>
                            <a href="/nosotros" className="btn-primary" style={{ textDecoration: 'none' }}>Conocer Nuestra Historia</a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
