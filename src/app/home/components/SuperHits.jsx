import React, { useEffect, useRef } from 'react';
import * as styles from "../css/superhits.module.css";
import SuperHitCard from '@/app/components/cards/SuperHitCard';
import PrimaryButton from '@/app/components/button/PrimaryButton';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SuperHits({ superhits }) {
    const { heading, hitprojects, button } = superhits || {};
    const projectsWrapRef = useRef(null);

    useEffect(() => {
        const cards = projectsWrapRef.current.children;

        // Set the initial state for each card
        gsap.set(cards, { y: 200, opacity: 0 });

        gsap.utils.toArray(cards).forEach((card, index) => {
            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: card,
                    start: 'top bottom+=100',  // Same scroll trigger for both
                    end: 'top top',
                    toggleActions: 'play none none none',
                    scrub: 3, // Smooth scroll animation
                    // markers: true,
                },
            });

            if (index % 2 === 0) {
                // Animation for even cards
                timeline.to(card, {
                    y: 0, 
                    opacity: 1,
                    duration: 0.5,
                    ease: "power2.inOut", 
                    delay: 0.1, // Delay specific to even cards
                });
            } else {
                // Animation for odd cards
                timeline.to(card, {
                    y: 0, 
                    opacity: 1,
                    duration: 0.5,
                    ease: "power2.inOut", 
                    delay: 0.15, // Delay specific to odd cards
                });
            }
        });

        return () => {
            // Clean up ScrollTriggers
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <div className={styles?.superHitsWrap}>
            <div className="container">
                <h2 className="heading-3 textClrBlack">{heading}</h2>

                <div className={styles?.ProjectsWrap} ref={projectsWrapRef}>
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
    );
}
