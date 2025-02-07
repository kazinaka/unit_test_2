import React, { useEffect } from 'react';

interface ModalProps {
    isOpen: boolean;
    title?: string;
    onClose?: () => void;
    children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, title, onClose, children }) => {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && onClose) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
        }
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div data-testid="modal-backdrop" className="modal-backdrop" onClick={onClose}>
            <div role="dialog" className="modal-content" onClick={(e) => e.stopPropagation()}>
                {title && <h2>{title}</h2>}
                <button onClick={onClose} aria-label="close">Close</button>
                <div className="modal-body">{children}</div>
            </div>
        </div>
    );
};
