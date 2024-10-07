import React from 'react'
import * as styles from "../css/whatwedo.module.css"
import ServiceCard from '@/app/components/cards/ServiceCard';

export default function WhatWeDo({ whatwedo }) {
    const { heading,serviceData } = whatwedo || {};
    return (
        <div>
            <div className={`${styles?.whatwedoHeading}`}>
                <div className="container">
                    <h2 className="text-4-med">{heading}</h2>
                </div>
            </div>
            <div>
                <ServiceCard data={serviceData}/>
            </div>
        </div>
    )
}
