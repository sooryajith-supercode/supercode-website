import React from 'react'
import Image from 'next/image';
import * as styles from "../component.module.css"
import SecondaryButton from '../button/SecondaryButton';
export default function SuperHitCard({ data }) {
    if (!data) return <></>;
    return (
        <>
            {data?.map((e, index) => {
                return (
                    <div className={styles?.SuperHitCard} key={index} >
                        <div className={`${styles?.SuperHitcontentWrap} `} >
                            <div className={`${styles?.SuperHitTextContent}`}>
                                <p className={`${styles?.SuperHitTitle} text-3-reg`}>{e.title}</p>
                            </div>
                            <div className={styles?.SuperHitProject}>
                                <Image
                                    src={e.image}
                                    width={519}
                                    height={519}
                                />
                                <p className={`${styles?.SuperHitclientName} text-5`}>{e.clientName}</p>
                            </div>
                            <div className={styles?.SuperHitbtnWrap}>
                                <SecondaryButton
                                    className={styles.SecondaryButton}
                                    label={e.buttonDesign.label}
                                    href={e.buttonDesign.slug}
                                />
                                <SecondaryButton
                                    className={styles.SecondaryButton}
                                    label={e.buttonDev.label}
                                    href={e.buttonDev.slug}
                                />
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
}