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
    
        // Using gsap.utils.toArray to create a stagger effect
        gsap.utils.toArray(cards).forEach((card, index) => {
            gsap.fromTo(card, 
                { y: 200, opacity: 0 }, 
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.5, // Animation duration
                    scrollTrigger: {
                        trigger: card,
                        start: 'top center+=300', // Adjust this to control when the animation starts
                        end: 'bottom bottom-=200',
                        toggleActions: 'play none none reverse',
                        // markers: true,
                    },
                    
                    delay: index % 2 === 0 ? 0.1 : 0.8, // Adjust the delays for staggered effect
                }
            );
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
