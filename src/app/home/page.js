import React from 'react'
import BannerSection from './components/BannerSection'
import { HomePage } from '@/utilites/helper'
import Visionary from './components/visionary';

export default function Home() {
    const {banner,visionary}=HomePage||{};
  return (
    <div>
        <BannerSection banner={banner}/>
        <Visionary visionary={visionary}/>
    </div>
  )
}

