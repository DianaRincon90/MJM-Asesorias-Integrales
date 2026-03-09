'use client';

import { useEffect, useState } from 'react'
import { Shield, BookOpen, Settings, Package, ChevronDown, ChevronUp, ClipboardList, Database, CalendarDays, BarChart3, Wrench, GraduationCap, CheckCircle2 } from 'lucide-react'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'

export default function ServiciosPage() {
    const [title, setTitle] = useState('Nuestros Servicios')
    const [subtitle, setSubtitle] = useState('Soluciones integrales de aseguramiento metrológico y calidad.')
    const [servicesData, setServicesData] = useState<any[]>([])
    const [expandedService, setExpandedService] = useState<number | null>(0)

    useEffect(() => {
        const fetchContent = async () => {
            const keys = [
                'servicios_title', 'servicios_subtitle',
                'servicio_1_title', 'servicio_1_desc', 'servicio_1_image',
                'servicio_2_title', 'servicio_2_desc', 'servicio_2_image',
                'servicio_3_title', 'servicio_3_desc', 'servicio_3_image',
                'servicio_4_title', 'servicio_4_desc', 'servicio_4_image',
                'servicio_5_title', 'servicio_5_desc', 'servicio_5_image'
            ]
            const { data } = await supabase.from('site_settings').select('id, value').in('id', keys)
            if (data) {
                const titleData = data.find(i => i.id === 'servicios_title')
                const subtitleData = data.find(i => i.id === 'servicios_subtitle')
                if (titleData?.value) setTitle(titleData.value)
                if (subtitleData?.value) setSubtitle(subtitleData.value)

                const defaultTitles = ["Aseguramiento Metrológico", "Capacitación", "Calibración", "Suministros", "Diagnóstico"];
                const defaultDescs = [
                    "Garantizamos la trazabilidad y confiabilidad de sus mediciones según estándares internacionales.",
                    "Formación especializada en metrología y uso de instrumentación técnica.",
                    "Verificación y calibración precisa de instrumentos en diversas magnitudes.",
                    "Equipos y suministros técnicos de alta calidad para sus procesos productivos.",
                    "Diagnóstico, mantenimiento y verificación técnica integral de estado funcional."
                ];

                const dynamicServices = [1, 2, 3, 4, 5].map(num => ({
                    title: data.find(i => i.id === `servicio_${num}_title`)?.value || defaultTitles[num - 1],
                    desc: data.find(i => i.id === `servicio_${num}_desc`)?.value || defaultDescs[num - 1],
                    image: data.find(i => i.id === `servicio_${num}_image`)?.value || (num === 1 ? '/services/aseguramiento.png' : '/about/mission.png')
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
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                    marginTop: '40px',
                    maxWidth: '1000px',
                    margin: '40px auto 0 auto'
                }}>
                    {(servicesData.length > 0 ? servicesData : [
                        { title: "Aseguramiento Metrológico", desc: "Garantizamos la trazabilidad y confiabilidad de sus mediciones según estándares internacionales.", image: "/services/aseguramiento.png" },
                        { title: "Capacitación", desc: "Formación especializada en metrología y uso de instrumentación técnica.", image: "/about/mission.png" },
                        { title: "Calibración", desc: "Verificación y calibración precisa de instrumentos en diversas magnitudes.", image: "/about/mission.png" },
                        { title: "Suministros", desc: "Equipos y suministros técnicos de alta calidad para sus procesos industriales.", image: "/about/mission.png" },
                        { title: "Diagnóstico", desc: "Diagnóstico, mantenimiento y verificación técnica integral.", image: "/about/mission.png" }
                    ]).map((service, i) => {
                        const isExpanded = expandedService === i;

                        // Default sub-services logic
                        let subServices = {
                            title: `Planes y Programas de ${service.title}`,
                            desc: service.desc,
                            items: [
                                { icon: <CheckCircle2 size={32} className="text-orange" />, title: "Servicio Integrado", desc: "Detalle del componente esencial o etapa para este proceso que la empresa realiza de principio a fin." },
                                { icon: <Wrench size={32} className="text-orange" />, title: "Herramientas de Avanzada", desc: "Aplicación de tecnología punta para garantizar resultados por encima del estándar del mercado." },
                                { icon: <GraduationCap size={32} className="text-orange" />, title: "Equipo Profesional", desc: "Talento humano capacitado y entrenado bajo normas estrictas de calidad nacionales." }
                            ]
                        };

                        if (i === 0) {
                            subServices = {
                                title: "Planes y Programas de Aseguramiento y Control",
                                desc: "Gestionamos integralmente sus procesos de medición para garantizar la conformidad y la calidad de sus productos y servicios",
                                items: [
                                    { icon: <ClipboardList size={32} className="text-orange" />, title: "Clasificación de Equipos", desc: "Identificación y clasificación detallada de todos los instrumentos de medición para un control efectivo" },
                                    { icon: <Database size={32} className="text-orange" />, title: "Levantamiento de Información", desc: "Recopilación exhaustiva de datos técnicos y metrológicos para establecer la línea base del aseguramiento" },
                                    { icon: <CalendarDays size={32} className="text-orange" />, title: "Cronogramas Integrados", desc: "Planificación estratégica de rutinas para minimizar tiempos de inactividad" },
                                    { icon: <BarChart3 size={32} className="text-orange" />, title: "Indicadores de Gestión", desc: "Visualización de datos y métricas clave para la toma de decisiones basada en evidencia" }
                                ]
                            };
                        } else if (i === 1) {
                            subServices = {
                                title: "Eventos y Capacitaciones",
                                desc: "Generamos espacios para nuestros clientes y aliados, con el fin de promover la cultura metrológica, fortalecer conceptos y apoyar la aclaración de inquietudes.",
                                items: [
                                    { icon: <BookOpen size={32} className="text-orange" />, title: "Conceptos Básicos", desc: "Formación en conceptos fundamentales de metrología aplicable a su industria." },
                                    { icon: <Wrench size={32} className="text-orange" />, title: "Uso de Instrumentos", desc: "Capacitación práctica en el uso y manipulación adecuada de instrumentos de medición." },
                                    { icon: <CheckCircle2 size={32} className="text-orange" />, title: "Interpretación", desc: "Guía experta para la correcta lectura e interpretación de certificados de calibración." }
                                ]
                            };
                        } else if (i === 2) {
                            subServices = {
                                title: "Servicios de Calibración, Verificación y Mantenimiento",
                                desc: "Fortalecemos la confianza metrológica en la toma de mediciones a través de servicios de calidad, responsabilidad y compromiso.",
                                items: [
                                    { icon: <Settings size={32} className="text-orange" />, title: "Calibración Trazable", desc: "Servicios de calibración con patrones directamente trazables a estándares nacionales o internacionales." },
                                    { icon: <Shield size={32} className="text-orange" />, title: "Laboratorios Acreditados", desc: "Operaciones locales y convenios con aliados bajo el cumplimiento de lineamientos ISO/IEC 17025." },
                                    { icon: <Wrench size={32} className="text-orange" />, title: "Verificación y Ajuste", desc: "Comprobación del estado en el que se encuentra su instrumento respecto al error máximo permitido." }
                                ]
                            };
                        } else if (i === 3) {
                            subServices = {
                                title: "Suministros e Instrumentación",
                                desc: "Suministramos productos orientados a optimizar la medición y análisis de variables operacionales.",
                                items: [
                                    { icon: <Package size={32} className="text-orange" />, title: "Equipos y Repuestos", desc: "Amplio catálogo en instrumentos de medición industrial y repuestos garantizados." },
                                    { icon: <Shield size={32} className="text-orange" />, title: "Accesorios y Estuches", desc: "Suministro de elementos para la conservación y transporte seguro de los equipos." },
                                    { icon: <Settings size={32} className="text-orange" />, title: "Complementos Óptimos", desc: "Todo lo necesario para asegurar el óptimo funcionamiento continuo de la instrumentación." }
                                ]
                            };
                        } else if (i === 4) {
                            subServices = {
                                title: "Diagnóstico Integral y Verificación",
                                desc: "Estamos comprometidos con la generación de valor para nuestros clientes a través de diagnósticos rigurosos.",
                                items: [
                                    { icon: <ClipboardList size={32} className="text-orange" />, title: "Diagnóstico Técnico", desc: "Evaluación minuciosa e integral del estado funcional y metrológico de la base instalada." },
                                    { icon: <CheckCircle2 size={32} className="text-orange" />, title: "Mantenimiento Preventivo", desc: "Intervenciones proactivas para prolongar la vida útil de los equipos de medición." },
                                    { icon: <Database size={32} className="text-orange" />, title: "Reporte de Desempeño", desc: "Entrega de informes consolidados de verificación técnica para toma de decisiones." }
                                ]
                            };
                        }

                        return (
                            <div key={i} style={{
                                borderRadius: '12px',
                                backgroundColor: 'white',
                                boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                                overflow: 'hidden',
                                border: '1px solid #eee'
                            }}>
                                {/* Accordion Header */}
                                <div
                                    onClick={() => setExpandedService(isExpanded ? null : i)}
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        padding: '20px 30px',
                                        cursor: 'pointer',
                                        backgroundColor: isExpanded ? '#f8fafc' : 'white',
                                        transition: 'background-color 0.3s'
                                    }}
                                >
                                    <h2 style={{ fontSize: '1.5rem', color: 'var(--mjm-blue)', margin: 0, fontWeight: 700 }}>
                                        {service.title}
                                    </h2>
                                    <div style={{ color: 'var(--mjm-orange)' }}>
                                        {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                                    </div>
                                </div>

                                {/* Accordion Body */}
                                {isExpanded && (
                                    <div style={{ padding: '40px', backgroundColor: '#fdfdfd', borderTop: '1px solid #eee' }}>
                                        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                                            <h3 style={{ fontSize: '1.8rem', color: 'var(--mjm-blue)', marginBottom: '15px' }}>{subServices.title}</h3>
                                            <p style={{ opacity: 0.8, fontSize: '1.1rem', maxWidth: '800px', margin: '0 auto', lineHeight: 1.6 }}>{subServices.desc}</p>
                                        </div>

                                        <div style={{
                                            display: 'grid',
                                            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                                            gap: '20px'
                                        }}>
                                            {subServices.items.map((item, idx) => (
                                                <div key={idx} style={{
                                                    backgroundColor: 'white',
                                                    padding: '30px 20px',
                                                    borderRadius: '16px',
                                                    border: '1px solid #f1f5f9',
                                                    boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
                                                    textAlign: 'center',
                                                    transition: 'transform 0.3s',
                                                }}
                                                    onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                                                    onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                                                >
                                                    <div style={{
                                                        width: '70px',
                                                        height: '70px',
                                                        borderRadius: '50%',
                                                        backgroundColor: '#fff4eb',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        margin: '0 auto 20px auto'
                                                    }}>
                                                        {item.icon}
                                                    </div>
                                                    <h4 style={{ color: 'var(--mjm-blue)', fontSize: '1.1rem', marginBottom: '15px', minHeight: '40px' }}>{item.title}</h4>
                                                    <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: 1.5 }}>{item.desc}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )
                    })}
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
