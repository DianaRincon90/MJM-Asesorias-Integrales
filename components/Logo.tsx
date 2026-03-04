import React from 'react';
import Image from 'next/image';

export const Logo: React.FC<{ className?: string }> = ({ className }) => {
    return (
        <div className={`logo-container ${className}`} style={{ display: 'flex', alignItems: 'center' }}>
            <Image
                src="/logo-official.png"
                alt="MJM Logo"
                width={120}
                height={120}
                style={{ objectFit: 'contain' }}
            />
        </div>
    );
};
