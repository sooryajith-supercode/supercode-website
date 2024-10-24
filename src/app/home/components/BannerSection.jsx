'use client;'
import React from 'react';
import * as styles from "../css/bannersection.module.css";

const BannerSection =({ banner }) => {
    const { MainHeading, AnimationLogo, bannerDescription } = banner || {};

    return (
        <div className={styles?.BannerSection}>
            <div className='container'>
                <div className={styles?.BannerSectionWrap}>
                    <div className={`${styles?.MainHeading} heading-1 textClrBlack`} dangerouslySetInnerHTML={{ __html: MainHeading }} />
                    <div className={`${styles?.animationLogo}`} dangerouslySetInnerHTML={{ __html: AnimationLogo }} />
                </div>
                <div className={`${styles?.bannerDescription}`}>
                    <p className='text-2 textClrBlack'>{bannerDescription}</p>
                </div>
            </div>
        </div>
    );
};

export default BannerSection;
