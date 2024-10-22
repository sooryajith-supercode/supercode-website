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
            },
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);


    const AutoRotateLogo = () => {
        const logoRef = useRef();
        const rotationSpeedX = 0.003; // speed for X-axis rotation

        // Set initial scale
        const initialScale = 8;
        useFrame(() => {
            if (logoRef.current) {
                // Continuous rotation around the X-axis
                logoRef.current.rotation.x += rotationSpeedX;
            }
        });

        useEffect(() => {
            let lastScrollPos = 0;

            const handleScroll = () => {
                const currentScrollPos = window.scrollY;
                const scrollDelta = currentScrollPos - lastScrollPos; // Calculate scroll change

                // Reverse rotation direction based on scroll
                const yRotationSpeed = scrollDelta > 0 ? 0.06 : (scrollDelta < 0 ? -0.06 : 0);

                // Use GSAP to animate the Y-axis rotation
                gsap.to(logoRef.current.rotation, {
                    y: `+=${yRotationSpeed}`,
                    duration: 0.1,
                    overwrite: 'auto',
                });

                lastScrollPos = currentScrollPos;

            };

            // Add scroll event listener
            window.addEventListener('scroll', handleScroll);
            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        }, []);

        return (
            <mesh ref={logoRef} scale={[initialScale, initialScale, initialScale]} position={[0, 0, 0]}>
                <WhiteInflateLogo />
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
                        <Canvas style={{ width: "100%", height: "500px" }}>
                            <ambientLight intensity={4.5} />
                            <pointLight position={[1, 1, 1]} intensity={3} />
                            <pointLight position={[-1, -1, -1]} intensity={.5} />
                            <directionalLight position={[0, 1, 2]} intensity={2} castShadow={true} />
                            <AutoRotateLogo />
                            <PerspectiveCamera makeDefault position={[0, 0, 2]} fov={32} near={0.1} far={500} />
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
