import React from 'react';
import { Link } from 'react-router-dom';

interface GradientButtonProps {
    to?: string;
    href?: string;
    onClick?: () => void;
    children: React.ReactNode;
    className?: string;
}

const GradientButton: React.FC<GradientButtonProps> = ({
    to,
    href,
    onClick,
    children,
    className = ''
}) => {
    const baseClassName = `btn ${className}`;

    if (to) {
        return (
            <Link to={to} className={baseClassName}>
                {children}
            </Link>
        );
    }

    if (href) {
        return (
            <a href={href} className={baseClassName} target="_blank" rel="noopener noreferrer">
                {children}
            </a>
        );
    }

    return (
        <button onClick={onClick} className={baseClassName}>
            {children}
        </button>
    );
};

export default GradientButton;
