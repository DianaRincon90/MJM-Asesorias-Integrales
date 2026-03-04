import { Shield, BookOpen, Settings, Package, ArrowRight, Mail, Phone, MessageSquare, MapPin, Clock } from 'lucide-react'
import Image from 'next/image'

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
                        <a href="#contacto" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
                            Contáctanos <ArrowRight size={18} style={{ marginLeft: '5px' }} />
                        </a>
                        <a href="#servicios" style={{
                            padding: '12px 24px',
                            borderRadius: '8px',
                            border: '2px solid white',
                            background: 'transparent',
                            color: 'white',
                            fontWeight: 600,
                            textDecoration: 'none'
                        }}>Nuestros Servicios</a>
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
                    gap: '40px',
                    opacity: 0.8
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
                            width: '150px',
                            height: '80px',
                            position: 'relative',
                            filter: 'grayscale(100%) brightness(0.8)',
                            transition: 'filter 0.3s'
                        }} onMouseOver={(e) => e.currentTarget.style.filter = 'none'} onMouseOut={(e) => e.currentTarget.style.filter = 'grayscale(100%) brightness(0.8)'}>
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

            {/* Contact Section */}
            <section id="contacto" style={{ backgroundColor: '#1B365D', color: 'white', padding: '100px 0' }}>
                <div className="section-container">
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '15px' }}>Contáctanos</h2>
                        <p style={{ opacity: 0.8, fontSize: '1.1rem' }}>
                            Estamos listos para atender sus requerimientos y brindarle soluciones metrológicas de calidad
                        </p>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '40px'
                    }}>
                        {/* Contact Info Card */}
                        <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '40px', borderRadius: '16px' }}>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '30px' }}>Información de Contacto</h3>

                            <div style={{ display: 'flex', gap: '15px', marginBottom: '25px' }}>
                                <Mail className="text-orange" />
                                <div>
                                    <p style={{ fontWeight: 600 }}>Email</p>
                                    <p style={{ opacity: 0.8 }}>proyectos@asesoriasmjm.com</p>
                                    <p style={{ opacity: 0.8 }}>comercial.asesoriasmjm@gmail.com</p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '15px', marginBottom: '25px' }}>
                                <Phone className="text-orange" />
                                <div>
                                    <p style={{ fontWeight: 600 }}>Teléfonos</p>
                                    <p style={{ opacity: 0.8 }}>+57 315 9253952</p>
                                    <p style={{ opacity: 0.8 }}>+57 313 7960800</p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '15px', marginBottom: '25px' }}>
                                <MessageSquare className="text-orange" />
                                <div>
                                    <p style={{ fontWeight: 600 }}>WhatsApp</p>
                                    <p style={{ opacity: 0.8 }}>+57 315 9253952</p>
                                    <p style={{ opacity: 0.8 }}>+57 313 7960800</p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '15px' }}>
                                <MapPin className="text-orange" />
                                <div>
                                    <p style={{ fontWeight: 600 }}>Ubicación</p>
                                    <p style={{ opacity: 0.8 }}>Cl 2 #71d-84, Bogotá, Colombia</p>
                                </div>
                            </div>
                        </div>

                        {/* Map and Schedule */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                            {/* Map (Embed or Placeholder) */}
                            <div style={{
                                height: '250px',
                                backgroundColor: 'rgba(255,255,255,0.1)',
                                borderRadius: '16px',
                                overflow: 'hidden',
                                position: 'relative'
                            }}>
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.844342894584!2d-74.13781702416954!3d4.62186594247271!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9ebba6441589%3A0xe5a3c9d784cfc804!2sCl.%202%20%2371d-84%2C%20Bogot%C3%A1!5e0!3m2!1sen!2sco!4v1709565000000!5m2!1sen!2sco"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                ></iframe>
                            </div>

                            {/* Schedule */}
                            <div style={{ backgroundColor: 'var(--mjm-orange)', padding: '25px', borderRadius: '16px', color: 'white' }}>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '15px' }}>
                                    <Clock size={20} />
                                    <h4 style={{ fontWeight: 700 }}>Horario de Atención</h4>
                                </div>
                                <p style={{ fontSize: '0.9rem', marginBottom: '5px' }}>Lunes - Viernes: 8:00 AM - 5:00 PM</p>
                                <p style={{ fontSize: '0.9rem' }}>Sábados - Domingos: Cerrado</p>
                                <hr style={{ margin: '15px 0', border: '0', borderTop: '1px solid rgba(255,255,255,0.2)' }} />
                                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '5px' }}>Recepción y Entrega de Equipos</h4>
                                <p style={{ fontSize: '0.9rem' }}>Lunes - Viernes: 8:30 AM - 4:30 PM</p>
                            </div>
                        </div>

                        {/* QR and Services */}
                        <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '40px', borderRadius: '16px', textAlign: 'center' }}>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Solicitud de Servicios</h3>
                            <p style={{ opacity: 0.8, fontSize: '0.9rem', marginBottom: '20px' }}>Escanea el código QR para solicitar nuestros servicios</p>
                            <a
                                href="https://docs.google.com/forms/d/e/1FAIpQLScgrsyFcCrP_Aq2j_CAjb5T8IkWJ3Is_RIRaYqPVcLkVRJmsA/viewform"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ padding: '20px', backgroundColor: 'white', borderRadius: '12px', display: 'inline-block' }}
                            >
                                <Image
                                    src="/brands/qr-service.jpg"
                                    alt="QR Code Solicitud de Servicios"
                                    width={150}
                                    height={150}
                                />
                            </a>
                            <p style={{ marginTop: '20px', fontSize: '0.8rem', opacity: 0.6 }}>Click en el código QR para acceder al formulario</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
