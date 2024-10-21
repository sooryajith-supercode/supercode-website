import React from "react";
import * as styles from "../css/visionary.module.css";

export default function Visionary({ visionary = {} }) {
    const { description } = visionary;

    return (
        <div className={`${styles?.visionaryWrap}`}>
            <div className='container'>
                <div className={`${styles?.visionarycontent}`}>
                    <p className={`${styles?.VisionaryDescription} text-1 textClrBlack`}>{description}</p>
                </div>
            </div>
        </div>
    );
}
