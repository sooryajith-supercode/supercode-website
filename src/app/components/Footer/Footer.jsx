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


const createScrollTimeline = (triggerElement, start, end, options = {}) => {
    return gsap.timeline({
        scrollTrigger: {
            trigger: triggerElement,
            start: start,
            end: end,
            scrub: true,
            ...options, // Additional ScrollTrigger options can be passed in
        },
    });
};

export default function Footer() {
    const { insight, FooterLogo, footerLinkssetOne, footerLinkssetTwo, FooterMedialinks, tellUs, copywriteText, termsPageLinks, FooterAnimationLogo } = FooterData;
    const { heading, insightData, button } = insight || {};

    // State to control rotation
    const [rotation, setRotation] = useState([0, 0, 0]);
    const [cameraPosition, setCameraPosition] = useState([5, 0, 5]);


    return (
        <div className={`${styles?.footerContainer}`}>
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

                    <div className={styles?.FooterAnimation3d}>
                        <Canvas camera={{ position: cameraPosition, fov: .11 }}  >
                            <CameraController cameraPosition={[-3.50, 0.60, 1.20]} /> {/* cameraPosition */}
                            <ambientLight intensity={1.5} />
                            <directionalLight
                                intensity={1}

                            />
                            <OrbitControls autoRotate />
                            {/* <axesHelper args={[3]} /> */}
                            <BlueINflateLogo
                                rotation={[1.62, 0.05, -1.05]}
                                //rotation
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
export function BlueINflateLogoRotation({ rotation }) {
    const meshRef = useRef();

    // Update the rotation of the 3D object based on props
    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.set(rotation[0], rotation[1], rotation[2]);
        }
    });

    return (
        <mesh ref={meshRef}>
            {/* Your 3D object content (geometry, material, etc.) */}
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="blue" />
        </mesh>
    );
}

function CameraController({ cameraPosition }) {
    const { camera } = useThree();

    useEffect(() => {
        camera.position.set(cameraPosition[0], cameraPosition[1], cameraPosition[2]);
    }, [cameraPosition, camera]);

    return null;
}