import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as styles from "../css/whatwedo.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function WhatWeDo({ whatwedo }) {
    const { heading, serviceData } = whatwedo || {};
    const colors = ["#70FF70", "#FFBE0B"];
    const cardwrapRef = useRef(null); // Reference for .ServiceCardWrap
    const cardRef = useRef(null); // Reference for second card

    useEffect(() => {
        const cardWrapElement = cardwrapRef.current;
        const secondCard = cardRef.current;

        // Initialize GSAP ScrollTrigger animation
        if (cardWrapElement && secondCard) {
            gsap.fromTo(
                secondCard,
                { y: 0 }, 
                {
                    y: -180,
                    scrollTrigger: {
                        trigger: secondCard,
                        start: "top-=200 center", 
                        toggleActions: "play reverse play reverse",
                    },
                    
                }
            );
        }
    }, []);

    return (
        <div>
            <div className={`${styles?.whatwedoHeading}`}>
                <div className="container">
                    <h2 className="text-4-med">{heading}</h2>
                </div>
            </div>
            <div className={styles?.ServiceCardWrap} ref={cardwrapRef}>
                {serviceData?.map((e, index) => {
                    const cardColor = colors[index % colors.length];
                    return (
                        <div
                            className={styles?.ServiceCard}
                            key={index}
                            style={{ backgroundColor: cardColor }}
                            ref={index === 1 ? cardRef : null} // Attach ref to the second card
                        >
                            <div className={`${styles?.ServiceCardText} container`}>
                                <div className={`${styles?.ServiceCardTextContent}`}>
                                    <p className="heading-3">{e.heading}</p>
                                    <p className={`${styles?.ServiceCarddesc} text-5`}>{e.description}</p>
                                </div>
                                <div dangerouslySetInnerHTML={{ __html: e.icon }} />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
