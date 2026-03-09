'use client';

import { Shield, BookOpen, Settings, Package } from 'lucide-react'
import Image from 'next/image'

export default function ServiciosPage() {
    return (
        <div className="pb-20">
            {/* Services Header */}
            <div style={{
                backgroundColor: 'var(--mjm-blue)',
                color: 'white',
                padding: '100px 20px',
                textAlign: 'center'
            }}>
                <h1 style={{ fontSize: '3rem', fontWeight: 800 }}>Nuestros Servicios</h1>
                <p style={{ fontSize: '1.2rem', opacity: 0.9, marginTop: '20px' }}>Soluciones integrales de aseguramiento metrológico y calidad.</p>
            </div>

            {/* Services Section */}
            <section className="section-container">
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '30px',
                    marginTop: '60px'
                }}>
                    {[
                        {
                            icon: <Shield size={40} className="text-orange" />,
                            title: "Aseguramiento Metrológico",
                            desc: "Garantizamos la trazabilidad y confiabilidad de sus mediciones según estándares internacionales."
                        },
                        {
                            icon: <BookOpen size={40} className="text-orange" />,
                            title: "Capacitación",
                            desc: "Formación especializada en metrología y uso de instrumentación técnica."
                        },
                        {
                            icon: <Settings size={40} className="text-orange" />,
                            title: "Calibración",
                            desc: "Verificación y calibración precisa de instrumentos en diversas magnitudes."
                        },
                        {
                            icon: <Package size={40} className="text-orange" />,
                            title: "Suministros",
                            desc: "Equipos y suministros técnicos de alta calidad para sus procesos industriales."
                        }
                    ].map((service, i) => (
                        <div key={i} style={{
                            padding: '40px',
                            borderRadius: '16px',
                            backgroundColor: 'white',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                            transition: 'transform 0.3s'
                        }}>
                            {service.icon}
                            <h3 style={{ margin: '20px 0 10px', fontSize: '1.5rem', color: 'var(--mjm-blue)' }}>{service.title}</h3>
                            <p style={{ lineHeight: 1.6, opacity: 0.8, color: '#444' }}>{service.desc}</p>
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
