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
        gsap.set(cards, { y: 400, opacity: 0 }); // Also set opacity to 0 initially

        gsap.utils.toArray(cards).forEach((card, index) => {
            gsap.timeline({
                scrollTrigger: {
                    trigger: card,
                    start: 'top bottom+=100',
                    end: 'top center',
                    toggleActions: 'play none none none',
                    scrub: 3, // Smooth scroll animation
                    // markers: true,
                },
            })
                .to(card, {
                    y: 0, 
                    opacity: 1,
                    duration: .5,
                    ease: "power2.inOut", 
                    delay: index % 2 === 0 ? 0.1 : 0.2, 
                })
                
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
