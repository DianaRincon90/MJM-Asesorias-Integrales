import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className }) => {
    return (
        <div className={`logo-container ${className}`} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <svg width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Outer Circle Text Border (Simplification as SVG text) */}
                <circle cx="50" cy="50" r="45" stroke="#1B365D" strokeWidth="1" strokeDasharray="2 2" />

                {/* Lightbulb Ray */}
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                    <line
                        key={angle}
                        x1="50" y1="50"
                        x2={50 + 35 * Math.cos((angle * Math.PI) / 180)}
                        y2={50 + 35 * Math.sin((angle * Math.PI) / 180)}
                        stroke="#F58220"
                        strokeWidth="3"
                        strokeLinecap="round"
                    />
                ))}

                {/* Lightbulb Body */}
                <path
                    d="M50 25C40 25 32 33 32 43C32 50 36 56 42 60V70C42 71.1 42.9 72 44 72H56C57.1 72 58 71.1 58 70V60C64 56 68 50 68 43C68 33 60 25 50 25Z"
                    fill="#1B365D"
                />
                <rect x="44" y="74" width="12" height="4" rx="2" fill="#1B365D" />
                <path d="M46 72V73H54V72H46Z" fill="#F58220" />
            </svg>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ color: '#1B365D', fontWeight: 800, fontSize: '1.2rem', lineHeight: 1, letterSpacing: '0.05em' }}>
                    ASESORÍAS INTEGRALES
                </span>
                <span style={{ color: '#F58220', fontWeight: 900, fontSize: '1.4rem', lineHeight: 1 }}>
                    MJM S.A.S
                </span>
            </div>
        </div>
    );
};
