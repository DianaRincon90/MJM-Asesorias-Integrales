'use client';

import { useEffect, useState } from 'react'
import { Shield, BookOpen, Settings, Package, ChevronDown, ChevronUp, ClipboardList, Database, CalendarDays, BarChart3, Wrench, GraduationCap, CheckCircle2 } from 'lucide-react'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'

export default function ServiciosPage() {
    const [title, setTitle] = useState('Nuestros Servicios')
    const [subtitle, setSubtitle] = useState('Soluciones integrales de aseguramiento metrológico y calidad.')
    const [bannerImage, setBannerImage] = useState('')
    const [servicesData, setServicesData] = useState<any[]>([])
    const [expandedService, setExpandedService] = useState<number | null>(0)

    useEffect(() => {
        const fetchContent = async () => {
            const keys = [
                'servicios_title', 'servicios_subtitle', 'servicios_image',
                'servicio_1_title', 'servicio_1_desc', 'servicio_1_image', 'servicio_1_subservices',
                'servicio_2_title', 'servicio_2_desc', 'servicio_2_image', 'servicio_2_subservices',
                'servicio_3_title', 'servicio_3_desc', 'servicio_3_image', 'servicio_3_subservices',
                'servicio_4_title', 'servicio_4_desc', 'servicio_4_image', 'servicio_4_subservices',
                'servicio_5_title', 'servicio_5_desc', 'servicio_5_image', 'servicio_5_subservices'
            ]
            const { data } = await supabase.from('site_settings').select('id, value').in('id', keys)
            if (data) {
                const titleData = data.find(i => i.id === 'servicios_title')
                const subtitleData = data.find(i => i.id === 'servicios_subtitle')
                const bannerData = data.find(i => i.id === 'servicios_image')
                if (titleData?.value) setTitle(titleData.value)
                if (subtitleData?.value) setSubtitle(subtitleData.value)
                if (bannerData?.value) setBannerImage(bannerData.value)

                const defaultTitles = ["Aseguramiento Metrológico", "Capacitación", "Calibración", "Suministros", "Diagnóstico"];
                const defaultDescs = [
                    "Garantizamos la trazabilidad y confiabilidad de sus mediciones según estándares internacionales.",
                    "Formación especializada en metrología y uso de instrumentación técnica.",
                    "Verificación y calibración precisa de instrumentos en diversas magnitudes.",
                    "Equipos y suministros técnicos de alta calidad para sus procesos productivos.",
                    "Diagnóstico, mantenimiento y verificación técnica integral de estado funcional."
                ];

                const defaultSubServices = [
                    {
                        title: "Planes y Programas de Aseguramiento y Control",
                        desc: "Gestionamos integralmente sus procesos de medición para garantizar la conformidad y la calidad de sus productos y servicios",
                        items: [
                            { title: "Clasificación de Equipos", desc: "Identificación y clasificación detallada de todos los instrumentos de medición para un control efectivo" },
                            { title: "Levantamiento de Información", desc: "Recopilación exhaustiva de datos técnicos y metrológicos para establecer la línea base del aseguramiento" },
                            { title: "Cronogramas Integrados", desc: "Planificación estratégica de rutinas para minimizar tiempos de inactividad" },
                            { title: "Indicadores de Gestión", desc: "Visualización de datos y métricas clave para la toma de decisiones basada en evidencia" }
                        ]
                    },
                    {
                        title: "Eventos y Capacitaciones",
                        desc: "Generamos espacios para nuestros clientes y aliados, con el fin de promover la cultura metrológica, fortalecer conceptos y apoyar la aclaración de inquietudes.",
                        items: [
                            { title: "Conceptos Básicos", desc: "Formación en conceptos fundamentales de metrología aplicable a su industria." },
                            { title: "Uso de Instrumentos", desc: "Capacitación práctica en el uso y manipulación adecuada de instrumentos de medición." },
                            { title: "Interpretación", desc: "Guía experta para la correcta lectura e interpretación de certificados de calibración." }
                        ]
                    },
                    {
                        title: "Servicios de Calibración, Verificación y Mantenimiento",
                        desc: "Fortalecemos la confianza metrológica en la toma de mediciones a través de servicios de calidad, responsabilidad y compromiso.",
                        items: [
                            { title: "Calibración Trazable", desc: "Servicios de calibración con patrones directamente trazables a estándares nacionales o internacionales." },
                            { title: "Laboratorios Acreditados", desc: "Operaciones locales y convenios con aliados bajo el cumplimiento de lineamientos ISO/IEC 17025." },
                            { title: "Verificación y Ajuste", desc: "Comprobación del estado en el que se encuentra su instrumento respecto al error máximo permitido." }
                        ]
                    },
                    {
                        title: "Suministros e Instrumentación",
                        desc: "Suministramos productos orientados a optimizar la medición y análisis de variables operacionales.",
                        items: [
                            { title: "Equipos y Repuestos", desc: "Amplio catálogo en instrumentos de medición industrial y repuestos garantizados." },
                            { title: "Accesorios y Estuches", desc: "Suministro de elementos para la conservación y transporte seguro de los equipos." },
                            { title: "Complementos Óptimos", desc: "Todo lo necesario para asegurar el óptimo funcionamiento continuo de la instrumentación." }
                        ]
                    },
                    {
                        title: "Diagnóstico Integral y Verificación",
                        desc: "Estamos comprometidos con la generación de valor para nuestros clientes a través de diagnósticos rigurosos.",
                        items: [
                            { title: "Diagnóstico Técnico", desc: "Evaluación minuciosa e integral del estado funcional y metrológico de la base instalada." },
                            { title: "Mantenimiento Preventivo", desc: "Intervenciones proactivas para prolongar la vida útil de los equipos de medición." },
                            { title: "Reporte de Desempeño", desc: "Entrega de informes consolidados de verificación técnica para toma de decisiones." }
                        ]
                    }
                ];

                const dynamicServices = [1, 2, 3, 4, 5].map((num, idx) => {
                    let subData = defaultSubServices[idx];
                    const dbSub = data.find(i => i.id === `servicio_${num}_subservices`);
                    if (dbSub?.value) {
                        try {
                            subData = JSON.parse(dbSub.value);
                        } catch (e) { }
                    }

                    return {
                        title: data.find(i => i.id === `servicio_${num}_title`)?.value || defaultTitles[num - 1],
                        desc: data.find(i => i.id === `servicio_${num}_desc`)?.value || defaultDescs[num - 1],
                        image: data.find(i => i.id === `servicio_${num}_image`)?.value || (num === 1 ? '/services/aseguramiento.png' : '/about/mission.png'),
                        subServices: subData
                    }
                })
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
                position: 'relative',
                backgroundColor: 'var(--mjm-blue)',
                color: 'white',
                padding: '100px 20px',
                textAlign: 'center',
                overflow: 'hidden'
            }}>
                {bannerImage && (
                    <Image src={bannerImage} alt="Banner Servicios" fill style={{ objectFit: 'cover', opacity: 0.3 }} priority />
                )}
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <h1 style={{ fontSize: '3rem', fontWeight: 800 }}>{title}</h1>
                    <p style={{ fontSize: '1.2rem', opacity: 0.9, marginTop: '20px' }}>{subtitle}</p>
                </div>
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
                        const subServices = service.subServices || { title: '', desc: '', items: [] };

                        const getIcon = (sIdx: number, iIdx: number) => {
                            if (sIdx === 0) {
                                if (iIdx === 0) return <ClipboardList size={32} className="text-orange" />;
                                if (iIdx === 1) return <Database size={32} className="text-orange" />;
                                if (iIdx === 2) return <CalendarDays size={32} className="text-orange" />;
                                if (iIdx === 3) return <BarChart3 size={32} className="text-orange" />;
                            }
                            if (sIdx === 1) {
                                if (iIdx === 0) return <BookOpen size={32} className="text-orange" />;
                                if (iIdx === 1) return <Wrench size={32} className="text-orange" />;
                                if (iIdx === 2) return <CheckCircle2 size={32} className="text-orange" />;
                            }
                            if (sIdx === 2) {
                                if (iIdx === 0) return <Settings size={32} className="text-orange" />;
                                if (iIdx === 1) return <Shield size={32} className="text-orange" />;
                                if (iIdx === 2) return <Wrench size={32} className="text-orange" />;
                            }
                            if (sIdx === 3) {
                                if (iIdx === 0) return <Package size={32} className="text-orange" />;
                                if (iIdx === 1) return <Shield size={32} className="text-orange" />;
                                if (iIdx === 2) return <Settings size={32} className="text-orange" />;
                            }
                            if (sIdx === 4) {
                                if (iIdx === 0) return <ClipboardList size={32} className="text-orange" />;
                                if (iIdx === 1) return <CheckCircle2 size={32} className="text-orange" />;
                                if (iIdx === 2) return <Database size={32} className="text-orange" />;
                            }
                            return <CheckCircle2 size={32} className="text-orange" />;
                        };

                        if (subServices.items) {
                            subServices.items = subServices.items.map((item: any, idx: number) => ({
                                ...item,
                                icon: getIcon(i, idx)
                            }));
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
                                        {/* Imagen dinámica desde el Panel Administrador */}
                                        {service.image && service.image !== '' && (
                                            <div style={{ position: 'relative', width: '100%', height: '350px', marginBottom: '40px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
                                                <Image src={service.image} alt={service.title} fill style={{ objectFit: 'cover' }} />
                                            </div>
                                        )}

                                        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                                            <h3 style={{ fontSize: '1.8rem', color: 'var(--mjm-blue)', marginBottom: '15px' }}>{subServices.title}</h3>
                                            <p style={{ opacity: 0.8, fontSize: '1.1rem', maxWidth: '800px', margin: '0 auto', lineHeight: 1.6 }}>{subServices.desc}</p>
                                        </div>

                                        <div style={{
                                            display: 'grid',
                                            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                                            gap: '20px'
                                        }}>
                                            {subServices.items.map((item: any, idx: number) => (
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
                                                        borderRadius: item.image ? '16px' : '50%',
                                                        backgroundColor: item.image ? 'transparent' : '#fff4eb',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        margin: '0 auto 20px auto',
                                                        overflow: 'hidden',
                                                        position: 'relative'
                                                    }}>
                                                        {item.image ? (
                                                            <Image src={item.image} alt={item.title} fill style={{ objectFit: 'cover' }} />
                                                        ) : (
                                                            item.icon
                                                        )}
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
