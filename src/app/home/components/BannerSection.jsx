import React from 'react'
export default function BannerSection({ banner }) {
    const { MainHeading } = banner || {};
    return (
        <div className='container'>
            <div dangerouslySetInnerHTML={{ __html: MainHeading }} />
        </div>
    )
}