import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
export default function Results({results}) {
    const { heading, slides } = results || {};
    return (
        <div>
            <div className="container">
                <h2>{heading}</h2>
            </div>
            {slides && slides.length > 0 ? (
                <Swiper
                    spaceBetween={50}
                    slidesPerView={1}
                >
                    {slides.map((slide, index) => (
                        <SwiperSlide key={index}>
                            <div className="slide-content">
                                <p>{slide.testimonial}</p>
                                <h4>{slide.Name}</h4>
                                <p>{slide.position}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            ) : (
                <p>No slides available</p>
            )}
        </div>
    )
}