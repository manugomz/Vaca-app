import React, { useState, useEffect } from 'react';
import { IoClose, IoCheckmarkCircle, IoCloseCircle } from 'react-icons/io5';

export default function Toast({ message, onClose, isOpen }) {
    const styles = {
        toast: `w-full fixed 
                top-0 right-0 
                flex h-16
                rounded-b-md
                md:rounded-md 
                md:w-80
                md:top-6 md:right-6`,
        iconBackground: `flex items-center justify-center 
                        w-1/6 
                        rounded-bl-md
                        md:w-20
                        md:rounded-l-md`,
        icon: 'h-14 aspect-square text-5xl',
        textSection: 'flex w-5/6 items-center justify-between px-5',
    };

    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        let timer;
        if (isOpen) {
            timer = setInterval(() => {
                setCountdown((prevCount) => prevCount - 1);
            }, 1000);
        }

        return () => {
            clearInterval(timer);
        };
    }, [isOpen]);

    useEffect(() => {
        if (countdown === 0) {
            onClose();
        }
    }, [countdown, onClose]);

    if (message) {
        return (
            <div className={styles.toast + ' bg-green-200'}>
                <div className={styles.iconBackground + ' bg-green-700'}>
                    <IoCheckmarkCircle className={styles.icon + ' text-green-200'} />
                </div>
                <div className={styles.textSection}>
                    <div>
                        <p className="text-green-900">{message}</p>
                        <p className="text-green-900 text-xs"> Cerrando en {countdown} segundos</p>
                    </div>
                    <button type="reset" onClick={() => onClose()}>
                        <IoClose className="text-green-700 text-2xl" />
                    </button>
                </div>
            </div>
        );
    } else {
        return (
            <div className={styles.toast + ' bg-red-200'}>
                <div className={styles.iconBackground + ' bg-red-700'}>
                    <IoCloseCircle className={styles.icon + ' text-red-200'} />
                </div>
                <div className={styles.textSection}>
                    <div>
                        <p className="text-red-900">Oops, hubo un error</p>
                        <p className="text-red-900 text-xs"> Cerrando en {countdown} segundos</p>
                    </div>
                    <button type="reset" onClick={() => onClose()}>
                        <IoClose className="text-red-700 text-2xl" />
                    </button>
                </div>
            </div>
        );
    }
}
