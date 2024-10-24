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
    const [rotationPosition, setrotationPosition] = useState([1.62, 0.05, -1.05]); // Your camera position
    const [fovValue, setFovValue] = useState(0.28);
    const orbitControlsRef = useRef(null);
    const [rotation, setRotation] = useState([0, 0, 0]);
    const [canvasVisible, setCanvasVisible] = useState(false); 
    const [logoScale, setLogoScale] = useState([0.1, 0.1, 0.1]); 
    let scrollTimeout;

    // Update camera position based on slider value
    // const handleCameraChange = (axis, value) => {
    //     const newPosition = [...cameraPosition];
    //     newPosition[axis] = value;
    //     setCameraPosition(newPosition);
    // };

 // Update rotation based on slider value
 const handleSliderChange = (axis, value) => {
    const newRotation = [...rotation];
    newRotation[axis] = value;
    setRotation(newRotation);
};
    useEffect(() => {
        // Register ScrollTrigger
        gsap.registerPlugin(ScrollTrigger);

        gsap.set(canvasRef.current, { y: -1500 });

        gsap.set(cameraPosition, { fov: fovValue });

        // GSAP scroll animation for the footer container
        const scrollAnimation = gsap.to(footerRef.current, {
            backgroundColor: "#072AC5",
            duration: 1,
            scrollTrigger: {
                trigger: footerRef.current,
                start: "top center+=300",
                end: "bottom bottom",
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
                scrub: 2,
                // markers: true,
                onUpdate: (self) => {
                    // Map scroll progress to fov and camera y position
                    const newFov = gsap.utils.mapRange(0, 1, 0.25, 0.11, self.progress);
                    const newYPosition = gsap.utils.mapRange(0, 1, -4.80, 0.60, self.progress);
                    const newXrotation = gsap.utils.mapRange(0, 1, -1.62, 1.62, self.progress);
                    setFovValue(newFov)
                    setCameraPosition([-3.50, newYPosition, 1.20]);
                    setrotationPosition([newXrotation, 0.05, -1.05]);
                },
            },
        });
       // Manage scroll event to toggle autoRotate
const handleScrollStart = () => {
    // Check if orbitControlsRef.current is not null before accessing it
    if (orbitControlsRef.current) {
        orbitControlsRef.current.autoRotate = false; // Disable auto-rotate on scroll
        gsap.to(orbitControlsRef.current, { autoRotate: false });
    }
    clearTimeout(scrollTimeout);
};

const handleScrollEnd = () => {
    if (orbitControlsRef.current) {
        scrollTimeout = setTimeout(() => {
            orbitControlsRef.current.autoRotate = true; // Enable auto-rotate after scrolling stops
            gsap.to(orbitControlsRef.current, { autoRotate: true });
        }, 200); // Adjust timeout duration as needed
    }
};

        // Event listeners for scroll events
        window.addEventListener('scroll', handleScrollStart);
        window.addEventListener('scroll', handleScrollEnd);

         // GSAP scroll trigger to control canvas visibility
         ScrollTrigger.create({
            trigger: footerRef.current,
            start: "top bottom", // Start when the footer top hits the bottom of the viewport
            onEnter: () => setCanvasVisible(true),  // Show the canvas when entering the footer
            onLeaveBack: () => setCanvasVisible(false), // Hide the canvas when scrolling back up
            markers: false, // Enable for debugging
        });

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

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;

            // Adjust the scale based on screen width
            if (width < 768) {
                setLogoScale([0.05, 0.05, 0.05]);
            } else if (width >= 768 && width < 1200) {
                setLogoScale([0.08, 0.08, 0.08]);
            } else {
                setLogoScale([0.1, 0.1, 0.1]); 
            }
        };

        // Initial setup
        handleResize();

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Clean up event listener on unmount
        return () => window.removeEventListener('resize', handleResize);
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
                {/* Conditionally render the Canvas */}
            {canvasVisible && (
                <Canvas camera={{ position: cameraPosition }} style={{height: "100vh", position: "fixed", bottom: 0 }} ref={canvasRef}>
                    <CameraController cameraPosition={cameraPosition} fovValue={fovValue} />
                    <ambientLight intensity={1.5} />
                    <directionalLight intensity={1} />
                    <OrbitControls ref={orbitControlsRef} autoRotateSpeed={0.8} />
                    <BlueINflateLogo
                        rotation={rotationPosition}
                        position={[0, -.0043, 0]}
                        scale={logoScale}
                    />
                </Canvas>
            )}
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