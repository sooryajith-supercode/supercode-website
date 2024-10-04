import React from "react";
import * as styles from "../css/bannersection.module.css";

export default function Visionary({ visionary = {} }) {
    const { description } = visionary;

    return (
        <div className={`${styles?.visionaryWrap}`}>
            <div className='container'>
                <div>
                    <p className="text-1">{description}</p>
                </div>
            </div>
        </div>
    );
}
