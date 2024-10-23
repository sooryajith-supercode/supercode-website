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

        // Set the initial state for each card (hidden and moved down)
        gsap.set(cards, { y: 200});

        gsap.utils.toArray(cards).forEach((card, index) => {
            gsap.timeline({
                scrollTrigger: {
                    trigger: card,
                    start: 'top center+=200',
                    end: 'bottom bottom-=200',
                    toggleActions: 'play none none reverse', // Play on enter, reverse on scroll back
                    onEnter: () => {
                        // Animate the card when entering the viewport
                        gsap.to(card, {
                            y: 0,
                            opacity: 1,
                            duration: 2,
                            delay: index % 2 === 0 ? 0.1 : 0.5, // Different delays for odd/even cards
                        });
                    },
                    onLeaveBack: () => {
                        // Animate the card when leaving back (scrolling up)
                        gsap.to(card, {
                            y: 200,
                            duration:2,
                            delay: index % 2 === 0 ? 0.5 : 0.1, // Ensure delay for odd/even on leave
                        });
                    },
                    // markers:true,
                    scrub:3,
                }
            });
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
