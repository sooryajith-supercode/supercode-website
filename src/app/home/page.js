"use client"
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as styles from "./homepage.module.css";
import BannerSection from './components/BannerSection';
import { HomePage } from '@/utilites/helper';
import Visionary from './components/visionary';
import WhatWeDo from './components/WhatWeDo';
import Results from './components/Results';
import SuperHits from './components/SuperHits';
import Clients from './components/Clients';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
    const { banner, visionary, whatwedo, results, superhits, clients } = HomePage || {};
    const canvasRef = useRef(null);
    const [rotationX, setRotationX] = useState(0);
    const [rotationY, setRotationY] = useState(0);
    const animationWrapRef = useRef(null);
    const resultsWrapLogoRef = useRef(null);
    const [bgColor, setBgColor] = useState('#fff');
    const rotationSpeed = 0.1;
    const autoRotationSpeed = 0.3;

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = new window.Image();
        img.src = '/assets/result-sec-logo.png';

        img.onload = () => {
            drawImage(ctx, img, rotationX, rotationY);
        };

        img.onerror = () => {
            console.error('Image failed to load. Check the image path.');
        };

        const handleScroll = () => {
            const scrolled = window.scrollY;
            const newRotationX = (scrolled * rotationSpeed) % 360;
            const newRotationY = (scrolled * rotationSpeed * 0.5) % 360;

            setRotationX(newRotationX);
            setRotationY(newRotationY);
        };

        window.addEventListener('scroll', handleScroll);

        // Smooth scroll effect using GSAP
        gsap.to(window, {
            scrollTo: { y: 0, autoKill: false },
            duration: 0.5,
            ease: 'power1.inOut'
        });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        let animationFrameId;

        const animate = () => {
            setRotationX(prevRotation => (prevRotation + autoRotationSpeed) % 360);
            setRotationY(prevRotation => (prevRotation + autoRotationSpeed * 0.5) % 360);
            animationFrameId = requestAnimationFrame(animate);
        };

        animationFrameId = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = new window.Image();
        img.src = '/assets/result-sec-logo.png';

        img.onload = () => {
            drawImage(ctx, img, rotationX, rotationY);
        };
    }, [rotationX, rotationY]);

    const drawImage = (ctx, img, rotationX, rotationY) => {
        const centerX = ctx.canvas.width / 2;
        const centerY = ctx.canvas.height / 2;

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        ctx.save();
        ctx.translate(centerX, centerY);

        const scaleY = Math.cos(rotationY * Math.PI / 180);
        const scaleX = 1;

        ctx.scale(scaleX, scaleY);
        ctx.rotate((rotationX * Math.PI) / 180);

        const scaleWidth = ctx.canvas.width / img.width;
        const scaleHeight = ctx.canvas.height / img.height;
        const scale = Math.min(scaleWidth, scaleHeight);

        ctx.drawImage(img, -img.width / 2 * scale, -img.height / 2 * scale, img.width * scale, img.height * scale);

        ctx.restore();
    };

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
                        <canvas ref={canvasRef} width="500" height="500"></canvas>
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
