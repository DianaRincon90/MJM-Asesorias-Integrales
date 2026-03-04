import { Shield, BookOpen, Settings, Package, ArrowRight } from 'lucide-react'

export default function Home() {
    return (
        <div>
            {/* Hero Section */}
            <section id="inicio" style={{
                height: '80vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, rgba(27, 54, 93, 0.9) 0%, rgba(13, 27, 42, 0.9) 100%), url("https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80") no-repeat center center/cover',
                color: 'white',
                textAlign: 'center',
                padding: '0 20px'
            }}>
                <div style={{ maxWidth: '800px' }}>
                    <h1 style={{ fontSize: '3.5rem', marginBottom: '20px', fontWeight: 800 }}>
                        Expertos en <span className="text-orange">Aseguramiento Metrológico</span>
                    </h1>
                    <p style={{ fontSize: '1.2rem', marginBottom: '40px', opacity: 0.9, lineHeight: 1.6 }}>
                        Consultoría, capacitación, verificación y calibración de instrumentos con los más altos estándares de calidad y confiabilidad.
                    </p>
                    <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                        <button className="btn-primary">Contáctanos <ArrowRight size={18} style={{ verticalAlign: 'middle', marginLeft: '5px' }} /></button>
                        <button style={{
                            padding: '12px 24px',
                            borderRadius: '8px',
                            border: '2px solid white',
                            background: 'transparent',
                            color: 'white',
                            fontWeight: 600
                        }}>Nuestros Servicios</button>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="servicios" className="section-container">
                <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '10px' }}>Nuestros Servicios</h2>
                <div style={{ width: '60px', height: '4px', backgroundColor: 'var(--mjm-orange)', margin: '0 auto 60px' }}></div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '30px'
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
                            backgroundColor: 'var(--mjm-gray)',
                            transition: 'transform 0.3s'
                        }}>
                            {service.icon}
                            <h3 style={{ margin: '20px 0 10px', fontSize: '1.5rem' }}>{service.title}</h3>
                            <p style={{ lineHeight: 1.6, opacity: 0.8 }}>{service.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* About Section */}
            <section id="nosotros" style={{ backgroundColor: 'var(--mjm-blue)', color: 'white' }}>
                <div className="section-container" style={{ display: 'flex', alignItems: 'center', gap: '60px', flexWrap: 'wrap' }}>
                    <div style={{ flex: '1 1 400px' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Sobre Nosotros</h2>
                        <p style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '20px', opacity: 0.9 }}>
                            En Asesorías Integrales MJM, somos su aliado estratégico en calidad y precisión. Con años de experiencia, brindamos soluciones integrales que optimizan los procesos de medición de nuestros clientes.
                        </p>
                        <ul style={{ listStyle: 'none', opacity: 0.9 }}>
                            <li style={{ marginBottom: '10px' }}>✓ Certificación ISO 9001</li>
                            <li style={{ marginBottom: '10px' }}>✓ Innovación Continua</li>
                            <li style={{ marginBottom: '10px' }}>✓ Personal Altamente Calificado</li>
                        </ul>
                    </div>
                    <div style={{ flex: '1 1 400px', height: '400px', borderRadius: '16px', overflow: 'hidden' }}>
                        <img
                            src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80"
                            alt="MJM Team"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </div>
                </div>
            </section>

            {/* Allies Section */}
            <section className="section-container" style={{ backgroundColor: 'white' }}>
                <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '40px', opacity: 0.6 }}>Nuestras Marcas Aliadas</h2>
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '50px',
                    opacity: 0.7
                }}>
                    {['UNI-T', 'Merit Instruments', 'Wilcoxon', 'CTC', 'DeltaTrak', 'FLUKE'].map((brand) => (
                        <div key={brand} style={{
                            fontSize: '1.5rem',
                            fontWeight: 800,
                            color: 'var(--mjm-blue)',
                            letterSpacing: '-0.02em',
                            textAlign: 'center'
                        }}>
                            {brand === 'FLUKE' ? <span style={{ backgroundColor: '#FFD500', color: 'black', padding: '2px 8px' }}>FLUKE</span> : brand}
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}
