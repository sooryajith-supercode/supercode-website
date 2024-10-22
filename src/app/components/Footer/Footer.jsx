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
    const [cameraPosition, setCameraPosition] = useState([-3.50, 4.80, 1.20]); // Your camera position
    const [fovValue, setFovValue] = useState(0.28);
    const orbitControlsRef = useRef(null);
    let scrollTimeout;

    // Update camera position based on slider value
    // const handleCameraChange = (axis, value) => {
    //     const newPosition = [...cameraPosition];
    //     newPosition[axis] = value;
    //     setCameraPosition(newPosition);
    // };

    useEffect(() => {
        // Register ScrollTrigger
        gsap.registerPlugin(ScrollTrigger);

        gsap.set(canvasRef.current, { y: -1600 });

        gsap.set(cameraPosition, { fov: fovValue });

        // GSAP scroll animation for the footer container
        const scrollAnimation = gsap.to(footerRef.current, {
            backgroundColor: "#072AC5",
            duration: 0.5,
            scrollTrigger: {
                trigger: footerRef.current,
                start: "top center+=400",
                end: "bottom bottom",
                scrub: true,
                // markers: true,
            },
        });

        // GSAP scroll animation for the canvas
        const canvasAnimation = gsap.to(canvasRef.current, {
            y: 0,
            scrollTrigger: {
                trigger: footerRef.current,
                start: "top center",
                end: "bottom bottom",
                scrub: 1,
                markers: true,
                onUpdate: (self) => {
                    // Map scroll progress to fov and camera y position
                    const newFov = gsap.utils.mapRange(0, 1, 0.28, 0.11, self.progress);
                    const newYPosition = gsap.utils.mapRange(0, 1, 4.80, 0.60, self.progress);
                    setFovValue(newFov);
                    setCameraPosition([-3.50, newYPosition, 1.20]);
                },
            },
        });
        // Manage scroll event to toggle autoRotate
        const handleScrollStart = () => {
            orbitControlsRef.current.autoRotate = false; // Disable auto-rotate on scroll
            gsap.to(orbitControlsRef.current, { autoRotate: false });
            clearTimeout(scrollTimeout);
        };

        const handleScrollEnd = () => {
            scrollTimeout = setTimeout(() => {
                orbitControlsRef.current.autoRotate = true; // Enable auto-rotate after scrolling stops
                gsap.to(orbitControlsRef.current, { autoRotate: true });
            }, 200); // Adjust timeout duration as needed
        };

        // Event listeners for scroll events
        window.addEventListener('scroll', handleScrollStart);
        window.addEventListener('scroll', handleScrollEnd);

        // Cleanup on unmount
        return () => {
            // Kill all GSAP triggers
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            // Kill GSAP tweens for specific elements
            gsap.killTweensOf(footerRef.current);
            gsap.killTweensOf(canvasRef.current);
            // Remove event listeners
            window.removeEventListener('scroll', handleScrollStart);
            window.removeEventListener('scroll', handleScrollEnd);
            clearTimeout(scrollTimeout);
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
                    <div className={styles?.FooterAnimation3d} ref={canvasRef}>
                        <Canvas camera={{ position: cameraPosition, }}  >
                            <CameraController cameraPosition={cameraPosition} fovValue={fovValue} /> {/* [-3.50, 0.60, 1.20]*/}
                            <ambientLight intensity={1.5} />
                            <directionalLight
                                intensity={1}

                            />
                            <OrbitControls ref={orbitControlsRef} autoRotateSpeed={0.8} />

                            <BlueINflateLogo
                                rotation={[1.62, 0.05, -1.05]}
                                position={[0, 0, 0]}
                                scale={[0.1, 0.1, 0.1]}

                            />
                        </Canvas>

                    </div>


                    {/* <div className={styles?.cameraControl}>
                        <div>
                            <label>X Camera Position: {cameraPosition[0].toFixed(2)}</label>
                            <input
                                type="range"
                                min={-10}
                                max={10}
                                step={0.1}
                                value={cameraPosition[0]}
                                onChange={(e) => handleCameraChange(0, parseFloat(e.target.value))}
                            />
                        </div>
                        <div>
                            <label>Y Camera Position: {cameraPosition[1].toFixed(2)}</label>
                            <input
                                type="range"
                                min={-10}
                                max={10}
                                step={0.1}
                                value={cameraPosition[1]}
                                onChange={(e) => handleCameraChange(1, parseFloat(e.target.value))}
                            />
                        </div>
                        <div>
                            <label>Z Camera Position: {cameraPosition[2].toFixed(2)}</label>
                            <input
                                type="range"
                                min={-10}
                                max={10}
                                step={0.1}
                                value={cameraPosition[2]}
                                onChange={(e) => handleCameraChange(2, parseFloat(e.target.value))}
                            />
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    );
}

function CameraController({ cameraPosition, fovValue }) {
    const { camera } = useThree();

    useEffect(() => {
        camera.position.set(cameraPosition[0], cameraPosition[1], cameraPosition[2]);
        camera.fov = fovValue;
        camera.updateProjectionMatrix();
    }, [cameraPosition, camera, fovValue]);

    return null;
}