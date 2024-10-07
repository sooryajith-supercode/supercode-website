import React from "react";
import * as styles from "../component.module.css";
export default function ServiceCard({ data }) {
    if (!data) return <></>;
    const colors = ["#70FF70", "#FFBE0B",];
    return (
        <>
            {data?.map((e, index) => {
                const cardColor = colors[index % colors.length];
                return (
                    <div className={styles?.ServiceCard} key={index} style={{ backgroundColor: cardColor }}>
                        <div className={`${styles?.ServiceCardText} container`} >
                            <div className={`${styles?.ServiceCardTextContent}`}>
                                <p className="heading-3">{e.heading}</p>
                                <p className={`${styles?.ServiceCarddesc} text-5`}>{e.description}</p>
                            </div>
                            <div dangerouslySetInnerHTML={{ __html: e.icon }} />
                        </div>
                    </div>
                );
            })}
        </>
    );
}