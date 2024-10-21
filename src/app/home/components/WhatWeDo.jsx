import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as styles from "../css/whatwedo.module.css";

gsap.registerPlugin(ScrollTrigger);

const WhatWeDo = React.memo(function WhatWeDo({ whatwedo }) {
    const { heading, serviceData } = whatwedo || {};
    const colors = ["#70FF70", "#FFBE0B"];
    const cardwrapRef = useRef(null);
    const cardRef = useRef(null);
    const firstCardIconRef = useRef(null);

    useEffect(() => {
        const cardWrapElement = cardwrapRef.current;
        const secondCard = cardRef.current;
        const firstCardIcon = firstCardIconRef.current;


        if (cardWrapElement && secondCard && firstCardIcon) {
            gsap.fromTo(
                secondCard,
                { y: 0 },
                {
                    y: -180,
                    duration: 1,
                    ease: "power1.inOut",
                    scrollTrigger: {
                        trigger: secondCard,
                        start: "top-=200 center",
                        end: "top+=100 center",
                        scrub: 1,
                        onEnter: () => {
                            gsap.to(firstCardIcon, {
                                opacity: 0,
                                duration: 0,
                            });
                        },
                        onLeaveBack: () => {
                            gsap.to(firstCardIcon, {
                                opacity: 1,
                                duration: 0,
                            });
                        }
                    },
                }
            );
        }
    }, []);

    return (
        <div>
            <div className={`${styles?.whatwedoHeading}`}>
                <div className="container">
                    <h2 className="text-4-med textClrBlack">{heading}</h2>
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
                            ref={index === 1 ? cardRef : null}
                        >
                            <div className={`${styles?.ServiceCardText} container`}>
                                <div className={`${styles?.ServiceCardTextContent}`}>
                                    <p className="heading-3 textClrBlack">{e.heading}</p>
                                    <p className={`${styles?.ServiceCarddesc} text-5 textClrBlack`}>{e.description}</p>
                                </div>
                                <div
                                    className={styles?.ServiceCardIcon}
                                    dangerouslySetInnerHTML={{ __html: e.icon }}
                                    ref={index === 0 ? firstCardIconRef : null}
                                    style={{ transition: "opacity 0.5s ease" }} 
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
});

export default WhatWeDo;
