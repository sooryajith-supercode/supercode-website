import { HeaderData } from '@/utilites/helper'
import Link from 'next/link';
import React from 'react'
import * as styles from "./header.module.css"
import PrimaryButton from '../button/PrimaryButton';
export default function Header() {
    const { button, logo, navLinks } = HeaderData || {};
    return (
        <div className='container'>
            <div className={styles?.NavWrap}>
                <div dangerouslySetInnerHTML={{ __html: logo }} />
                <div className={styles?.NavWrapLinkBtn}>
                    <div className={`${styles?.NavWrapLink} text-5`}>
                        {navLinks?.map(({ label, slug }, index) => {
                            return <div key={index}>
                                {slug ? <Link href={slug}>{label}</Link> : <div>no link slug</div>}
                            </div>
                        })}
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
    )
}
