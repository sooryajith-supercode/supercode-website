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
            //initial states
            gsap.set(secondCard, { y: "0px",duration: .5,  });
            gsap.set(firstCardIcon, { opacity: 1 });

            //timeline for animations
            const masterTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: cardWrapElement, 
                    start: "top center-=200",
                    end: "top center-=300",
                    scrub: 3,
                    // markers:true,

                },
            });

            masterTimeline
            .to(secondCard, { y: "-180", duration: 2.5,  }, 0) 
            .to(firstCardIcon, { opacity: 0, duration: 1,  }, 1); 

            return () => {
                // Clean up on unmount
                ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
                gsap.killTweensOf([secondCard, firstCardIcon]);
            };
        }
    }, [serviceData]);

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
                            style={{ backgroundColor: cardColor, transition: "ease 0.2s" }}
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
