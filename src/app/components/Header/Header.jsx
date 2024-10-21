import { HeaderData } from '@/utilites/helper';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import * as styles from "./header.module.css";
import PrimaryButton from '../button/PrimaryButton';

export default function Header() {
    const { button, logo, navLinks } = HeaderData || {};
    const [visible, setVisible] = useState(true);
    const [atTop, setAtTop] = useState(true); // Track if navbar is at the top
    let lastScrollY = 0;

    const handleScroll = () => {
        if (typeof window !== 'undefined') {
            const currentScrollY = window.scrollY;

            // Show navbar when scrolling up, hide when scrolling down
            if (currentScrollY > lastScrollY) {
                setVisible(false); // scrolling down
            } else {
                setVisible(true); // scrolling up
            }

            // Check if at the top of the page
            setAtTop(currentScrollY === 0);

            lastScrollY = currentScrollY;
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={`${styles.NavWrap} ${visible ? styles.visible : styles.hidden} ${atTop ? styles.atTop : styles.notAtTop}`}>
            <div className={`container`}>
                <div className={styles.NavItems}>
                    <div dangerouslySetInnerHTML={{ __html: logo }} />
                    <div className={styles.NavWrapLinkBtn}>
                        <div className={`${styles.NavWrapLink} text-5 textClrBlack`}>
                            {navLinks?.map(({ label, slug }, index) => (
                                <div key={index}>
                                    {slug ? <Link href={slug}>{label}</Link> : <div>no link slug</div>}
                                </div>
                            ))}
                        </div>
                        <PrimaryButton
                            className={styles.PrimaryButton}
                            href={button?.slug}
                            label={button?.label}
                            icon={button.icon}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
