"use client"
import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, PerspectiveCamera } from '@react-three/drei';
import * as styles from "./homepage.module.css";
import BannerSection from './components/BannerSection';
import { HomePage } from '@/utilites/helper';
import Visionary from './components/Visionary';
import WhatWeDo from './components/WhatWeDo';
import Results from './components/Results';
import SuperHits from './components/SuperHits';
import Clients from './components/Clients';
import * as THREE from 'three';
import { WhiteInflateLogo } from '../components/AnimationLOgo/WhiteInflateLogo';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
    const { banner, visionary, whatwedo, results, superhits, clients } = HomePage || {};
    const animationWrapRef = useRef(null);
    const resultsWrapLogoRef = useRef(null);
    const [scrollSpeedBoost, setScrollSpeedBoost] = useState(0); // State to control scroll-based speed boost
    const speedBoostTimeout = useRef(null);
    const currentSpeedBoost = useRef(0); // Ref to store the current speed boost

    useEffect(() => {
        const imageElement = document.querySelector(`.${styles.sectionMainimage} img`);
        const sectionMainWrap = document.querySelector(`.${styles.sectionMainWrap}`);
        const sectionBanner = document.querySelector(`.${styles.sectionBanner}`);

        if (!imageElement || !sectionMainWrap || !sectionBanner) {
            console.error('Elements not found!');
            return;
        }

        gsap.set(`.${styles.sectionMainWrap}`, { background: 'transparent' });
        gsap.set(`.${styles.sectionBanner}`, { opacity: '1' });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: imageElement,
                start: 'top-=300px center',
                end: 'bottom+=200px center',
                scrub: true,
            }
        });

        tl.fromTo(imageElement,
            { width: '300px', y: 0 },
            { width: '90%' }
        );
        tl
            .to(sectionBanner, {
                opacity: '0',
                duration: 0.3
            }, 0)
            .to(sectionMainWrap, {
                background: 'black',
                duration: 0.3
            }, 0);
    }, []);

    useEffect(() => {
        const animationWrap = resultsWrapLogoRef.current;
        const animationLogoWrap = animationWrapRef.current;

        gsap.timeline({
            scrollTrigger: {
                trigger: animationWrap,
                start: 'top top',
                end: () => `+=${animationLogoWrap.offsetHeight}`,
                pin: true,
                scrub: true,
            },
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);


    const AutoRotateLogo = ({ defaultScale }) => {
        const logoRef = useRef();
        const [rotationSpeed, setRotationSpeed] = useState(0.01); // Initial speed
        const [scale, setScale] = useState(2.1); // Initial scale 

        // Update the logo's rotation and scale in the animation frame
        useFrame(() => {
            if (logoRef.current) {
                logoRef.current.rotation.x += rotationSpeed; 
                logoRef.current.rotation.y += rotationSpeed; 
                logoRef.current.scale.set(scale, scale, scale); 
            }
        });

        const handleScroll = () => {
            // When scrolling, set speed to 3 and scale to 1.5
            setRotationSpeed(0.02);
            setScale(2.1);
        };

        const handleStopScroll = () => {
            // When not scrolling, 
            setRotationSpeed(0.01);

            setTimeout(() => {
                setScale(2.1); // Reset scale to default
            }, 500); // Adjust this duration for smoothness
        };

        useEffect(() => {
            let isScrolling;

            window.addEventListener('scroll', () => {
                handleScroll();

                // Clear previous timeout
                clearTimeout(isScrolling);

                // Set a timeout to run when scrolling ends
                isScrolling = setTimeout(() => {
                    handleStopScroll();
                }, 200);
            });

            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        }, []);

        return (
            <mesh ref={logoRef} >
                <WhiteInflateLogo  />
            </mesh>
        ); 
    };


    const bannerSection = useMemo(() => <BannerSection banner={banner} />, [banner])

    return (
        <div>
            <div className={`${styles.sectionMainWrap}`}>
                <div className={`${styles.sectionBanner}`}>
                    {bannerSection}
                </div>
                <Visionary visionary={visionary} />
                <div className='container'>
                    <div className={`${styles.sectionMainimage}`}>
                        <img src="/assets/bannerimage.jpg" alt="Description of the image" />
                    </div>
                </div>
            </div>

            <div className={styles?.AnimationLogoWrap} ref={animationWrapRef}>
                <div>
                    <div className={`${styles?.resultsWrapLogo}`} ref={resultsWrapLogoRef}>
                        <Canvas  >
                            <ambientLight intensity={2.5} />
                            <pointLight position={[1, 1, 1]} intensity={2.5} />
                            <pointLight position={[-1, -1, -1]} intensity={2.5} />
                            <directionalLight position={[0, 1, 2]} intensity={2} castShadow={true} />
                            <AutoRotateLogo />
                            <PerspectiveCamera makeDefault position={[0, 0, .35]}  />
                        </Canvas>
                    </div>
                    <div className={styles?.AnimationLogoWrapcontent}>
                        <WhatWeDo whatwedo={whatwedo} />
                        <Results results={results} />
                        <SuperHits superhits={superhits} />
                    </div>
                </div>
            </div>
            <Clients clients={clients} />
        </div>
    );
}
