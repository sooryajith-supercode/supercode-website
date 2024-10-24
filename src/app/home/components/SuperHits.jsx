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
    const projectsContaRef = useRef(null); 

    useEffect(() => {
        const cards = projectsWrapRef.current.children;

        // initial state
        gsap.set(cards, { opacity: 1 }); 

        gsap.utils.toArray(cards).forEach((card, index) => {
            const isOdd = (index + 1) % 2 !== 0; 

            const startY = isOdd ? 300 : 400; 
            const endY = isOdd ? -10: 0;    

            // Create a timeline for each card
            gsap.timeline({
                scrollTrigger: {
                    trigger: card,
                    start: 'top bottom+=300',  
                    end: 'top top',            
                    scrub: true,                 
                    toggleActions: 'play none none none', 
                    markers: false,            
                },
            })
            .set(card, { y: startY })        
            .to(card, {
                y: endY,                       
                opacity: 1,                    
                duration: 1,                   
                ease: "power2.inOut",
            });
        });

        return () => {
            // Clean up ScrollTriggers to prevent memory leaks
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <div className={styles.superHitsWrap} ref={projectsContaRef}>
            <div className="container">
                <h2 className="heading-3 textClrBlack">{heading}</h2>

                <div className={styles.ProjectsWrap} ref={projectsWrapRef}>
                    <SuperHitCard data={hitprojects} />
                </div>
                
                <div className="tac">
                    <PrimaryButton
                        label={button?.label}
                        href={button?.slug}
                    />
                </div>
            </div>
        </div>
    );
}
