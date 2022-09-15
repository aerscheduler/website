// import Swiper core and required modules
import React from 'react'
import { Navigation, A11y } from 'swiper'
import 'swiper/css'
import { Swiper, SwiperSlide } from 'swiper/react'
import TestimonialsDefault from './TestimonialDefault'

export const brandAirbnb = '/img/partners/airbnb-dark.svg'
export const brandHubspot = '/img/partners/hubspot-dark.svg'
export const brandForbes = '/img/partners/forbes-dark.svg'
export const brandFitbit = '/img/partners/fitbit-dark.svg'

export const hubspotAvatar = '/img/avatars/female/1.jpg'
export const fitbitAvatar = '/img/avatars/male/1.jpg'
export const forbesAvatar = '/img/avatars/female/2.jpg'
export const airbnbAvatar = '/img/avatars/male/2.jpg'
export default function TestimonialsSlider() {
  const prevRef = React.useRef(null);
  const nextRef = React.useRef(null);
  return (
    <div className='position-relative swiper-custom'>
      <Swiper
        onInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        // install Swiper modules
        modules={[Navigation, A11y]}
        spaceBetween={30}
        autoHeight={true}
        breakpoints={
          { 640: { slidesPerView: 1, spaceBetween: 20 }, 768: { slidesPerView: 2, spaceBetween: 32 } }
        }
      >
        <SwiperSlide>
        <TestimonialsDefault userName="Emily Doe" brandLogo={brandHubspot} profilePic={hubspotAvatar} userPost="Senior developer" comment="“ We were looking for an innovation partner that could be provide all the components that we needed. SaaS, with its abilities was a good match.”"/>
        </SwiperSlide>

        <SwiperSlide>
        <TestimonialsDefault userName="Mark Otto" brandLogo={brandAirbnb} profilePic={airbnbAvatar} userPost="Senior developer" comment="“ We were looking for an innovation partner that could be provide all the components that we needed. SaaS, with its abilities was a good match.”"/>
        </SwiperSlide>

        <SwiperSlide>
        <TestimonialsDefault userName="Nikita Millner" brandLogo={brandForbes} profilePic={forbesAvatar} userPost="Senior developer" comment="“ We were looking for an innovation partner that could be provide all the components that we needed. SaaS, with its abilities was a good match.”"/>
        </SwiperSlide>

        <SwiperSlide>
        <TestimonialsDefault userName="Ruben Diaz" brandLogo={brandFitbit} profilePic={fitbitAvatar} userPost="Senior developer" comment="“ We were looking for an innovation partner that could be provide all the components that we needed. SaaS, with its abilities was a good match.”"/>
        </SwiperSlide>

        <div slot='container-end' className='d-flex align-items-center position-absolute end-0 top-0 z-index-2 me-3 mt-n1'>
          <div className='size-40 d-flex align-items-center me-2 justify-content-center btn btn-primary p-0 rounded-3 swiper-prev' ref={prevRef}>
            <span className='material-symbols-rounded'>arrow_back</span>
          </div>
          <div className='size-40 d-flex align-items-center justify-content-center btn btn-primary p-0 rounded-3 swiper-next' ref={nextRef}>
            <span className='material-symbols-rounded'>arrow_forward</span>
          </div>
        </div>
      </Swiper>

    </div>
  );
};