'use client';

import { useEffect, useState } from 'react'
import { Shield, BookOpen, Settings, Package } from 'lucide-react'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'

export default function ServiciosPage() {
    const [title, setTitle] = useState('Nuestros Servicios')
    const [subtitle, setSubtitle] = useState('Soluciones integrales de aseguramiento metrológico y calidad.')
    const [servicesData, setServicesData] = useState<any[]>([])

    useEffect(() => {
        const fetchContent = async () => {
            const keys = [
                'servicios_title', 'servicios_subtitle',
                'servicio_1_title', 'servicio_1_desc', 'servicio_1_image',
                'servicio_2_title', 'servicio_2_desc', 'servicio_2_image',
                'servicio_3_title', 'servicio_3_desc', 'servicio_3_image',
                'servicio_4_title', 'servicio_4_desc', 'servicio_4_image'
            ]
            const { data } = await supabase.from('site_settings').select('id, value').in('id', keys)
            if (data) {
                const titleData = data.find(i => i.id === 'servicios_title')
                const subtitleData = data.find(i => i.id === 'servicios_subtitle')
                if (titleData?.value) setTitle(titleData.value)
                if (subtitleData?.value) setSubtitle(subtitleData.value)

                const dynamicServices = [1, 2, 3, 4].map(num => ({
                    title: data.find(i => i.id === `servicio_${num}_title`)?.value || `Servicio ${num}`,
                    desc: data.find(i => i.id === `servicio_${num}_desc`)?.value || 'Descripción pendiente...',
                    image: data.find(i => i.id === `servicio_${num}_image`)?.value || '/about/mission.png'
                }))
                // Only set if at least one service has a custom title (basic check to see if DB has data)
                if (data.some(i => i.id.startsWith('servicio_'))) {
                    setServicesData(dynamicServices)
                }
            }
        }
        fetchContent()
    }, [])
    return (
        <div className="pb-20">
            {/* Services Header */}
            <div style={{
                backgroundColor: 'var(--mjm-blue)',
                color: 'white',
                padding: '100px 20px',
                textAlign: 'center'
            }}>
                <h1 style={{ fontSize: '3rem', fontWeight: 800 }}>{title}</h1>
                <p style={{ fontSize: '1.2rem', opacity: 0.9, marginTop: '20px' }}>{subtitle}</p>
            </div>

            {/* Services Section */}
            <section className="section-container">
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '30px',
                    marginTop: '60px'
                }}>
                    {(servicesData.length > 0 ? servicesData : [
                        { title: "Aseguramiento Metrológico", desc: "Garantizamos la trazabilidad y confiabilidad de sus mediciones según estándares internacionales.", image: "/about/mission.png" },
                        { title: "Capacitación", desc: "Formación especializada en metrología y uso de instrumentación técnica.", image: "/about/mission.png" },
                        { title: "Calibración", desc: "Verificación y calibración precisa de instrumentos en diversas magnitudes.", image: "/about/mission.png" },
                        { title: "Suministros", desc: "Equipos y suministros técnicos de alta calidad para sus procesos industriales.", image: "/about/mission.png" }
                    ]).map((service, i) => (
                        <div key={i} style={{
                            borderRadius: '16px',
                            backgroundColor: 'white',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                            overflow: 'hidden',
                            transition: 'transform 0.3s'
                        }}>
                            <div style={{ position: 'relative', height: '200px', width: '100%', backgroundColor: '#f4f4f4' }}>
                                <Image src={service.image} alt={service.title} fill style={{ objectFit: 'cover' }} />
                            </div>
                            <div style={{ padding: '30px' }}>
                                <h3 style={{ margin: '0 0 15px', fontSize: '1.5rem', color: 'var(--mjm-blue)' }}>{service.title}</h3>
                                <p style={{ lineHeight: 1.6, opacity: 0.8, color: '#444' }}>{service.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Allies Section */}
            <section className="section-container" style={{ backgroundColor: '#f9fafb', borderRadius: '24px', padding: '80px 40px' }}>
                <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '40px', opacity: 0.6 }}>Nuestras Marcas Aliadas</h2>
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '40px',
                    opacity: 1
                }}>
                    {[
                        { name: 'UNI-T', src: '/brands/uni-t.jpg' },
                        { name: 'Fluke', src: '/brands/fluke.png' },
                        { name: 'Wilcoxon', src: '/brands/wilcoxon.png' },
                        { name: 'CTC', src: '/brands/ctc.jpg' },
                        { name: 'DeltaTrak', src: '/brands/deltatrak.jpg' },
                        { name: 'SKF', src: '/brands/skf.png' },
                        { name: 'Easy-Laser', src: '/brands/easylaser.png' }
                    ].map((brand) => (
                        <div key={brand.name} style={{
                            width: '160px',
                            height: '90px',
                            position: 'relative',
                            filter: 'grayscale(100%)',
                            transition: 'filter 0.3s'
                        }} onMouseOver={(e) => e.currentTarget.style.filter = 'none'} onMouseOut={(e) => e.currentTarget.style.filter = 'grayscale(100%)'}>
                            <Image
                                src={brand.src}
                                alt={brand.name}
                                fill
                                style={{ objectFit: 'contain' }}
                            />
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}
