import React from 'react';
import { Link } from 'react-router-dom';

interface CyberpunkButtonProps {
    to?: string;
    href?: string;
    onClick?: () => void;
    children: React.ReactNode;
    className?: string;
}

const CyberpunkButton: React.FC<CyberpunkButtonProps> = ({
    to,
    href,
    onClick,
    children,
    className = ''
}) => {
    const content = (
        <>
            <span className="button_lg">
                <span className="button_sl"></span>
                <span className="button_text">{children}</span>
            </span>
        </>
    );

    const baseClassName = `button ${className}`;

    if (to) {
        return (
            <Link to={to} className={baseClassName}>
                {content}
            </Link>
        );
    }

    if (href) {
        return (
            <a href={href} className={baseClassName} target="_blank" rel="noopener noreferrer">
                {content}
            </a>
        );
    }

    return (
        <button onClick={onClick} className={baseClassName}>
            {content}
        </button>
    );
};

export default CyberpunkButton;
