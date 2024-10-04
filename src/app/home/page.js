import React from 'react'
import BannerSection from './components/BannerSection'
import { HomePage } from '@/utilites/helper'

export default function Home() {
    const {banner}=HomePage||{};
  return (
    <div>
        <BannerSection banner={banner}/>
    </div>
  )
}

