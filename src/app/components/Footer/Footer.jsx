import React, { useRef, useState, useEffect } from 'react';
import * as styles from "./footer.module.css";
import { FooterData } from '@/utilites/helper';
import InsightCard from '../cards/InsightCard';
import PrimaryButton from '../button/PrimaryButton';
import Link from 'next/link';
import { Canvas, useLoader, useFrame, useThree } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { gsap } from 'gsap';
import { useGLTF, OrbitControls, Environment } from '@react-three/drei';
import Image from 'next/image';
import { BlueINflateLogo } from '../AnimationLOgo/BlueInflateLogo';

gsap.registerPlugin(ScrollTrigger);






export default function Footer() {
    const { insight, FooterLogo, footerLinkssetOne, footerLinkssetTwo, FooterMedialinks, tellUs, copywriteText, termsPageLinks, FooterAnimationLogo } = FooterData;
    const { heading, insightData, button } = insight || {};
    const canvasRef = useRef(null); // Ref to access the canvas
    const footerRef = useRef(null); // Ref to the footer container
    const [cameraPosition, setCameraPosition] = useState([5, 0, 5]); // Your camera position
    const initialFov = 0.30; // Initial FOV value
    const originalFov = 0.11; // Original FOV value

    useEffect(() => {
        // Register ScrollTrigger
        gsap.registerPlugin(ScrollTrigger);

        gsap.set(canvasRef.current, { y: -2000 });

        // GSAP scroll animation for the footer container
        const scrollAnimation = gsap.to(footerRef.current, {
            backgroundColor: "#072AC5", // Change this to your desired color
            duration: 0.5,
            scrollTrigger: {
                trigger: footerRef.current,
                start: "top center+=400",
                end: "bottom bottom",
                scrub: true,
                // markers: true, // Uncomment for debugging
            },
        });

        // GSAP scroll animation for the canvas
        // const canvasAnimation = gsap.to(canvasRef.current, {
        //     y: 0, // Move to original position
        //     duration: 2, // Animation duration
        //     scrollTrigger: {
        //         trigger: footerRef.current,
        //         start: "top center",
        //         end: "bottom bottom",
        //         scrub: true,
        //         markers: true,
        //     },
        // });

        // GSAP animation for FOV change on scroll
        // const fovAnimation = gsap.to(cameraPosition, {
        //     fov: originalFov, // Change this to your desired original FOV
        //     duration: 0.5,
        //     scrollTrigger: {
        //         trigger: footerRef.current,
        //         start: "bottom center", 
        //         end: "bottom bottom", 
        //         scrub: true,
        //         onUpdate: () => {
        //             // Update the camera position on scroll
        //             setCameraPosition([5, 0, 5]); // Update as needed based on FOV
        //         },
        //         markers: true,
        //     },
        // });

        // Cleanup function to kill animations on unmount
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            gsap.killTweensOf(footerRef.current);
            gsap.killTweensOf(canvasRef.current);
        };
    }, []);


    return (
        <div className={`${styles?.footerContainer}`} ref={footerRef}>
            <div className={`${styles?.footerContentContainer}`}>
                <div>
                    <div className='container'>
                        <div className={styles?.InsightHeader}>
                            <h2 className="text-4-med">{heading}</h2>
                        </div>
                        <div className={styles?.InsightCardWrap}>
                            <InsightCard data={insightData} />
                        </div>
                        <div className={styles?.insightBtn}>
                            <PrimaryButton
                                label={button.label}
                                href={button.slug}
                                buttonwhite={true}
                            />
                        </div>
                    </div>
                </div>
                <div className={styles?.footerWrapper}>
                    <div className="container">
                        <div className={styles?.footerContent}>
                            <div dangerouslySetInnerHTML={{ __html: FooterLogo }} />
                            <div className={styles?.footerPageLinks}>
                                <ul className={styles?.footerLinks}>
                                    {footerLinkssetOne?.map((e, index) => (
                                        <li key={index} className="text-5">
                                            {e.href ? (
                                                <Link href={e.href}>
                                                    {e.label}
                                                </Link>
                                            ) : (
                                                <span>{e.label || 'Missing Link'}</span>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                                <ul className={styles?.footerLinks}>
                                    {footerLinkssetTwo?.map((e, index) => (
                                        <li key={index} className="text-5">
                                            {e.href ? (
                                                <Link href={e.href}>
                                                    {e.label}
                                                </Link>
                                            ) : (
                                                <span>{e.label || 'Missing Link'}</span>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <ul className={styles?.footerLinks}>
                                    {FooterMedialinks?.map((e, index) => (
                                        <li key={index} className="text-5">
                                            {e.href ? (
                                                <Link href={e.href}>
                                                    {e.label}
                                                </Link>
                                            ) : (
                                                <span>{e.label || 'Missing Link'}</span>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className={styles?.tellusContent}>
                                <p className="heading-4">{tellUs?.title}</p>
                                <PrimaryButton
                                    label={tellUs?.button?.label}
                                    href={tellUs?.button?.slug}
                                    icon={tellUs?.button?.icon}
                                    greenBg={true}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles?.copyrightSection}>
                    <div className="container">
                        <div className={styles?.copyrightContent}>
                            <p className="text-8-med ">{copywriteText}</p>
                            <ul className={`${styles?.footerLinks} ${styles?.termsPageLinks}`}>
                                {termsPageLinks?.map((e, index) => (
                                    <li key={index} className="text-8-med ">
                                        {e.href ? (
                                            <Link href={e.href}>
                                                {e.label}
                                            </Link>
                                        ) : (
                                            <span>{e.label || 'Missing Link'}</span>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles?.FooterAnimationLogo}>
                <div className="container">

                    <div className={styles?.FooterAnimation3d}> {/*ref={canvasRef}*/} 
                        <Canvas camera={{ position: cameraPosition, fov: .11  }}  >
                            <CameraController cameraPosition={[-3.50, 0.60, 1.20]} /> {/* cameraPosition */}
                            <ambientLight intensity={1.5} />
                            <directionalLight
                                intensity={1}

                            />
                            <OrbitControls autoRotate autoRotateSpeed={1.2} />
                            {/* <axesHelper args={[3]} /> */}
                            <BlueINflateLogo
                                rotation={[1.62, 0.05, -1.05]}
                                position={[0, 0, 0]}
                                scale={[0.1, 0.1, 0.1]}

                            />
                        </Canvas>

                    </div>
                </div>
            </div>
        </div>
    );
}

function CameraController({ cameraPosition }) {
    const { camera } = useThree();

    useEffect(() => {
        camera.position.set(cameraPosition[0], cameraPosition[1], cameraPosition[2]);
    }, [cameraPosition, camera]);

    return null;
}