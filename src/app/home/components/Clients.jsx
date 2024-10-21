import Link from 'next/link';
import React, { useState } from 'react';
import * as styles from "../css/clients.module.css";

export default function Clients({ clients }) {
    const { heading, clientLinks } = clients || {};
    const [hoveredClient, setHoveredClient] = useState(null);

    return (
        <div className={styles?.clientContainer}>
            <div className="container">
                <h2 className="text-4-med textClrBlack">{heading}</h2>
                <div className={styles?.clientContentWrap}>
                    <div className={`${styles?.clientwrap} text-1 textClrBlack`}>
                        {clientLinks && clientLinks.length > 0 ? (
                            clientLinks.map((client, index) => (
                                <div key={index} className={styles?.clientItem}>
                                    {/* Show the image above the client link when hovered */}
                                    {hoveredClient === client.title && (
                                        <div className={styles?.hoveredImageWrap}>
                                            <img src={client.image} alt={client.title} className={styles?.hoveredImage} />
                                        </div>
                                    )}
                                    <Link
                                        href={client.slug}
                                        className={`text-1 textClrBlack`}
                                        onMouseEnter={() => setHoveredClient(client.title)}
                                        onMouseLeave={() => setHoveredClient(null)}
                                    >
                                        {client.title}
                                    </Link>
                                    {index < clientLinks.length - 1 && ' / '}
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
