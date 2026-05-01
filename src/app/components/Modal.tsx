"use client";

import { useEffect, useRef, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    ariaLabelledBy?: string;
};

const Modal = ({ isOpen, onClose, children, ariaLabelledBy }: ModalProps) => {
    const dialogRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isOpen) return;
        const onEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", onEsc);
        return () => document.removeEventListener("keydown", onEsc);
    }, [isOpen, onClose]);

    useEffect(() => {
        if (!isOpen) return;
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = ""; };
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) return;
        const el = dialogRef.current;
        if (el) {
            const focusable = el.querySelectorAll<HTMLElement>(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            if (focusable.length > 0) focusable[0].focus();
        }
    }, [isOpen]);

    if (typeof window === "undefined") return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div
                        ref={dialogRef}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby={ariaLabelledBy}
                        className="bg-white dark:bg-zinc-900 p-6 rounded-xl max-w-3xl w-full relative"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        onClick={e => e.stopPropagation()}
                    >
                        <button
                            className="absolute top-2 right-2 text-gray-600 dark:text-gray-300"
                            onClick={onClose}
                            aria-label="Close dialog"
                        >
                            ✕
                        </button>
                        {children}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
};

export default Modal;