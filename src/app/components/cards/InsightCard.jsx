import React from 'react'
import Image from 'next/image';
import * as styles from "../component.module.css"
export default function InsightCard({ data }) {
    if (!data) return <></>;
    return (
        <>
            {data?.map((e, index) => {
                return (
                    <div className={styles?.InsightCard}>
                        <Image
                            src={e.image}
                            width={411}
                            height={378}
                        />
                        <div className={styles?.InsightCardtextContent}>
                            <p className="text-6-med">{e.title}</p>
                            <p className="text-5">{e.description}</p>
                        </div>
                    </div>
                );
            })}
        </>
    )
}