import React from 'react';
import Image from 'next/image';

export const Logo: React.FC<{
    className?: string,
    width?: number,
    height?: number
}> = ({ className, width = 120, height = 120 }) => {
    return (
        <div className={`logo-container ${className}`} style={{ display: 'flex', alignItems: 'center' }}>
            <Image
                src="/logo.png"
                alt="MJM Logo"
                width={width}
                height={height}
                style={{ objectFit: 'contain' }}
            />
        </div>
    );
};
