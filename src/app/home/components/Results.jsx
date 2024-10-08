import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Image from 'next/image';
import * as styles from "../css/results.module.css"
import { Autoplay } from "swiper/modules";
import PrimaryButton from '@/app/components/button/PrimaryButton';
export default function Results({ results }) {
    const { heading, slides, slidestwo, button } = results || {};
    const getSlideColor = (index) => {
        const colors = ['#D8DFFE', '#FFD6EB', '#D6FFD6', '#FFF4D6'];
        return colors[index % colors.length];
    };
    const getSlidetwoColor = (index) => {
        const colors = ['#FFD6EB', '#D8DFFE', '#FFF4D6', '#D6FFD6'];
        return colors[index % colors.length];
    };
    return (
        <>
            <div className={`${styles?.resultsWrapLogo}`}>
                <img src="./assets/result-sec-logo.png" alt="" />

            </div>
            <div className={`${styles?.resultsWrap}`}>
                <div className="container">
                    <div className={`${styles?.resultsMainHeading}`}>
                        <h2 className="heading-5-med">{heading}</h2>
                    </div>
                </div>
                {slides && slides.length > 0 ? (
                    <Swiper
                        spaceBetween={8}
                        slidesPerView={'auto'}
                        loop={true}
                        centeredSlides={true}
                        className={styles?.customSwiper}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        modules={[Autoplay]}
                    >
                        {slides.map((slide, index) => (
                            <SwiperSlide key={index} className={`${styles[`slide-${index}`]}`}>
                                <div className={`${styles?.SliderContentWrap} slide-content`} style={{ backgroundColor: getSlideColor(index) }}>
                                    <div className={styles?.testimonialContent}>
                                        {slide.testimonial && <p className={`${styles?.testimonialDesc} text-5`}>{slide.testimonial}</p>}
                                        <div className={styles?.NamePosition}>
                                            {slide.Name && <h4 className="text-6-med">{slide.Name}</h4>}
                                            {slide.position && <p className={styles?.position}>{slide.position}</p>}
                                        </div>
                                    </div>
                                    <div className={styles?.awardContent}>
                                        {slide.image && (
                                            <Image
                                                src={slide.image}
                                                alt={slide.awardName || "Award Image"}
                                                width={164}
                                                height={267}
                                            />
                                        )}
                                        <div className={styles?.awardinfo}>
                                            {slide.awardFor && <p className={styles?.awardFor}>{slide.awardFor}</p>}
                                            {slide.awardName && <p className={styles?.awardName}>{slide.awardName}</p>}
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <p></p>
                )}
                {slidestwo && slides.length > 0 ? (
                    <Swiper
                        spaceBetween={8}
                        slidesPerView={'auto'}
                        loop={true}
                        centeredSlides={true}
                        className={styles?.customSwiperTwo}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        modules={[Autoplay]}
                    >
                        {slidestwo.map((slide, index) => (
                            <SwiperSlide key={index} className={`${styles[`slide-${index}`]}`}>
                                <div className={`${styles?.SliderContentWrap} slide-content`} style={{ backgroundColor: getSlidetwoColor(index) }}>
                                    <div className={styles?.testimonialContent}>
                                        {slide.testimonial && <p className={`${styles?.testimonialDesc} text-5`}>{slide.testimonial}</p>}
                                        <div className={styles?.NamePosition}>
                                            {slide.Name && <h4 className="text-6-med">{slide.Name}</h4>}
                                            {slide.position && <p className={styles?.position}>{slide.position}</p>}
                                        </div>
                                    </div>
                                    <div className={styles?.awardContent}>
                                        {slide.image && (
                                            <Image
                                                src={slide.image}
                                                alt={slide.awardName || "Award Image"}
                                                width={164}
                                                height={267}
                                            />
                                        )}
                                        <div className={styles?.awardinfo}>
                                            {slide.awardFor && <p className={styles?.awardFor}>{slide.awardFor}</p>}
                                            {slide.awardName && <p className={styles?.awardName}>{slide.awardName}</p>}
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <p></p>
                )}
                <div className={styles?.impactButtonWrap}>
                    <PrimaryButton
                        className={styles.PrimaryButton}
                        href={button?.slug}
                        label={button?.label}
                        icon={button.icon}
                    />
                </div>
            </div>
        </>
    )
}