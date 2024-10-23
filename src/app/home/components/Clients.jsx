import Link from 'next/link';
import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap'; // Import GSAP
import * as styles from "../css/clients.module.css";

export default function Clients({ clients }) {
    const { heading, clientLinks } = clients || {};
    const [hoveredClient, setHoveredClient] = useState(null);
    const [transformID, setTransformID] = useState(null);
    const [imagePosition, setImagePosition] = useState(null); 
    const hoveredImageRef = useRef(null);

    // Function to show the image
    const showImage = (transformID) => {
        if (transformID) {
            gsap.to('#' + transformID, {
                opacity: 1,
                duration: 0.3,
                ease: "power1.out",
            });
        }
    };

    // Function to hide the image
    const hideImage = (transformID) => {
        if (transformID) {
            gsap.to('#' + transformID, {
                opacity: 0,
                duration: 0.3,
                ease: "power2.in",
            });
        }
    };

    useEffect(() => {
        if (hoveredClient) {
            showImage(transformID);
        } else {
            hideImage(transformID);
        }
    }, [hoveredClient, transformID]); 

    // Function to handle mouse movement and set the image at the cursor position
    const handleMouseMove = (event) => {
        const { clientX, clientY } = event;
        const offsetY = 100; // Adjust Y offset to show image slightly above the cursor
        setImagePosition({ x: clientX, y: clientY - offsetY });
    };

    return (
        <div className={styles?.clientContainer}>
            <div className="container">
                <h2 className="text-4-med textClrBlack">{heading}</h2>
                <div className={styles?.clientContentWrap}>
                    <div className={`${styles?.clientwrap} text-1 textClrBlack`}>
                        {clientLinks && clientLinks.length > 0 ? (
                            clientLinks.map((client, index) => (
                                <div
                                    key={index}
                                    className={styles?.clientItem}
                                    onMouseEnter={() => {
                                        setHoveredClient(client.title);
                                        setTransformID('hoverImage' + index);
                                        handleMouseMove({ clientX: 0, clientY: 0 }); 
                                    }}
                                    onMouseLeave={() => {
                                        setHoveredClient(null);
                                        setImagePosition(null); 
                                    }}
                                    onMouseMove={handleMouseMove} 
                                >
                                    <Link href={client.slug} className={`text-1 textClrBlack`}>
                                        {client.title}
                                    </Link>
                                    {index < clientLinks.length - 1 && ' / '}

                                    {/* Show the image only if imagePosition is valid */}
                                    {imagePosition && (
                                        <div
                                            id={'hoverImage' + index}
                                            className={styles?.hoveredImageWrap}
                                            style={{
                                                opacity: hoveredClient === client.title ? 1 : 0,
                                                zIndex: hoveredClient === client.title ? 9999 : -9999,
                                                position: 'fixed',
                                                pointerEvents: 'none',
                                                left: `${imagePosition.x}px`, 
                                                top: `${imagePosition.y}px`, 
                                                transform: 'translate(-50%, -50%)', 
                                                transition: "opacity 0s ease", 
                                            }}
                                        >
                                            <img src={client.image} alt={client.title} className={styles?.hoveredImage} />
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p>No clients available</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
