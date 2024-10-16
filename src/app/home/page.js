import React, { Suspense, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, PerspectiveCamera } from '@react-three/drei';
import * as styles from "./homepage.module.css";
import BannerSection from './components/BannerSection';
import { HomePage } from '@/utilites/helper';
import Visionary from './components/visionary';
import WhatWeDo from './components/WhatWeDo';
import Results from './components/Results';
import SuperHits from './components/SuperHits';
import Clients from './components/Clients';
import * as THREE from 'three';

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

    // Component to render GLB model
    const WhiteLogoModel = () => {
        const { scene } = useGLTF('/assets/WhiteInflateLogo.gltf');
        const box = new THREE.Box3().setFromObject(scene);
        const center = box.getCenter(new THREE.Vector3());

        // Scale the model up to make it visible
        scene.scale.set(2, 2, 2);
        scene.position.set(-center.x, -center.y, 0);

        // Store the current rotation speed
        const rotationSpeedRef = useRef(0.005); 
        const speedBoostTimeout = useRef(null);

        useFrame(() => {
            // Apply rotation using GSAP's to function
            gsap.to(scene.rotation, {
                x: scene.rotation.x + rotationSpeedRef.current,
                y: scene.rotation.y + rotationSpeedRef.current,
                duration: 0.1, 
                ease: "power1.inOut", 
            });
        });

        // Handle scroll event to set rotation based on scroll position
        useEffect(() => {
            const handleScroll = () => {
                const speedBoost = 0.1; // Increased speed during scroll 
                rotationSpeedRef.current = speedBoost;

                // Reset speed after scrolling stops
                if (speedBoostTimeout.current) clearTimeout(speedBoostTimeout.current);

                speedBoostTimeout.current = setTimeout(() => {
                    // Gradually reduce speed using GSAP
                    gsap.to(rotationSpeedRef, {
                        current: 0.03, // Adjust non-scroll speed
                        duration: 1, 
                        ease: "power1.inOut",
                        onUpdate: () => {
                            rotationSpeedRef.current = rotationSpeedRef.current; 
                        }
                    });
                }, 10); // Delay before starting decay to allow some scroll time
            };

            window.addEventListener('scroll', handleScroll);
            return () => {
                window.removeEventListener('scroll', handleScroll);
                if (speedBoostTimeout.current) clearTimeout(speedBoostTimeout.current);
            };
        }, []);
        return <primitive object={scene} />;
    };



    return (
        <div>
            <div className={`${styles.sectionMainWrap}`}>
                <div className={`${styles.sectionBanner}`}>
                    <BannerSection banner={banner} />
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
                        <div></div>
                        <Canvas >
                            <ambientLight intensity={0.9} />
                            <pointLight
                                position={[1, 1, 1]}
                                intensity={0.8}
                            />
                            <pointLight
                                position={[-1, -1, -1]}
                                intensity={0.8}
                            />
                            <Suspense fallback={null}>
                                <WhiteLogoModel />
                            </Suspense>
                            <OrbitControls />
                            <PerspectiveCamera makeDefault position={[0, 0, 0.3]} />
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
