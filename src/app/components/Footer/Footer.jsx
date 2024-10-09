import React from 'react';
import * as styles from "./footer.module.css";
import { FooterData } from '@/utilites/helper';
import InsightCard from '../cards/InsightCard';
import PrimaryButton from '../button/PrimaryButton';
import Link from 'next/link';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';
import Image from 'next/image';
export default function Footer() {
    const { insight, FooterLogo, footerLinkssetOne, footerLinkssetTwo, FooterMedialinks, tellUs, copywriteText, termsPageLinks, FooterAnimationLogo } = FooterData;
    const { heading, insightData, button } = insight || {};

    const Model = () => {
        const { scene } = useGLTF('/assets/supercode.gltf');
        return <primitive object={scene} />;
    };

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
                    <Image
                        src={FooterAnimationLogo}
                        layout="responsive"
                        width={500}
                        height={647}
                    />
                </div>
                {/* <Canvas>
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[5, 5, 5]} />
                    <Model />
                    <OrbitControls />
                </Canvas> */}
            </div>
        </div>
    );
}
