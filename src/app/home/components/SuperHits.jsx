import React from 'react'
import * as styles from "../css/superhits.module.css"
import SuperHitCard from '@/app/components/cards/SuperHitCard';
import PrimaryButton from '@/app/components/button/PrimaryButton';
export default function SuperHits({ superhits }) {
    const { heading, hitprojects,button } = superhits || {};
    return (
        <div className={styles?.superHitsWrap}>
            <div className="container">
                <h2 className="heading-3">{heading}</h2>

                <div className={styles?.ProjectsWrap}>
                    <SuperHitCard data={hitprojects} />
                </div>
                <div className="tac">
                    <PrimaryButton
                        label={button.label}
                        href={button.slug}
                    />
                </div>
            </div>
        </div>
    )
}
