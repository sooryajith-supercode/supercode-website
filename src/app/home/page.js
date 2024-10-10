import React, { useEffect } from 'react';
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

    useEffect(() => {
        // GSAP animation for the image
        const imageElement = document.querySelector(`.${styles.sectionMainimage} img`);

        gsap.fromTo(imageElement,
            { width: '300px', y: 0 },
            {
                width: '90%',
                scrollTrigger: {
                    trigger: imageElement,
                    start: 'top-=300px center',  
                    end: 'bottom+=200px center',  
                    scrub: true, 
                }
            }
        );
    }, []);

    return (
        <div>
            <div className={`${styles.sectionMainWrap}`}>
                <BannerSection banner={banner} />
                <Visionary visionary={visionary} />

                <div className='container'>
                    <div className={`${styles.sectionMainimage}`}>
                        <img src="/assets/bannerimage.jpg" alt="Description of the image" />
                    </div>
                </div>
            </div>
            <WhatWeDo whatwedo={whatwedo} />
            <Results results={results} />
            <SuperHits superhits={superhits} />
            <Clients clients={clients} />
        </div>
    );
}
