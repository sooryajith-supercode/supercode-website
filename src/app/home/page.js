import React from 'react'
import * as styles from "./homepage.module.css"
import BannerSection from './components/BannerSection'
import { HomePage } from '@/utilites/helper'
import Visionary from './components/visionary';

export default function Home() {
    const { banner, visionary } = HomePage || {};
    return (
        <div>
            <div className={`${styles?.sectionMainWrap}`}>
                <BannerSection banner={banner} />
                <Visionary visionary={visionary} />

                <div className='container'>
                    <div className={`${styles?.sectionMainimage}`}>
                        <img src="/assets/bannerimage.jpg" alt="Description of the image" />
                    </div>
                </div>
            </div>
        </div>
    )
}

