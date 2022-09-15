// import Swiper core and required modules
import Image from 'next/image';
import React from 'react'
import { Pagination, A11y } from 'swiper'
import 'swiper/css'
import { Swiper, SwiperSlide } from 'swiper/react'
export default function ClientsCarousel() {
    return (
        <div className='position-relative'>
        <Swiper
        pagination={{ clickable: true }}  
        
          // install Swiper modules
          modules={[Pagination, A11y]}
          spaceBetween={24}
          autoHeight={true}
          breakpoints={
            { 320: { slidesPerView: 2, spaceBetween: 20 }, 640: { slidesPerView: 4, spaceBetween: 24 }, 768: { slidesPerView: 5, spaceBetween: 24 } }
          }
        >
              <SwiperSlide>
             <div className='width-120 mx-auto h-auto'>
             <Image src="/img/partners/fitbit-dark.svg" layout='responsive' width="140" height="48" alt=""/>
             </div>
          </SwiperSlide>

          <SwiperSlide>
             <div className='width-120 mx-auto h-auto'>
             <Image src="/img/partners/capsule-dark.svg" layout='responsive' width="140" height="48" alt=""/>
             </div>
          </SwiperSlide>
          <SwiperSlide>
             <div className='width-120 mx-auto h-auto'>
             <Image src="/img/partners/forbes-dark.svg" layout='responsive' width="140" height="48" alt=""/>
             </div>
          </SwiperSlide>
          <SwiperSlide>
             <div className='width-120 mx-auto h-auto'>
             <Image src="/img/partners/mailchimp-dark.svg" layout='responsive' width="140" height="48" alt=""/>
             </div>
          </SwiperSlide>
          <SwiperSlide>
             <div className='width-120 mx-auto h-auto'>
             <Image src="/img/partners/hubspot-dark.svg" layout='responsive' width="140" height="48" alt=""/>
             </div>
          </SwiperSlide>
             <SwiperSlide>
             <div className='width-120 mx-auto h-auto'>
             <Image src="/img/partners/fitbit-dark.svg" layout='responsive' width="140" height="48" alt=""/>
             </div>
          </SwiperSlide>

          <SwiperSlide>
             <div className='width-120 mx-auto h-auto'>
             <Image src="/img/partners/capsule-dark.svg" layout='responsive' width="140" height="48" alt=""/>
             </div>
          </SwiperSlide>
          <SwiperSlide>
             <div className='width-120 mx-auto h-auto'>
             <Image src="/img/partners/forbes-dark.svg" layout='responsive' width="140" height="48" alt=""/>
             </div>
          </SwiperSlide>
          <SwiperSlide>
             <div className='width-120 mx-auto h-auto'>
             <Image src="/img/partners/mailchimp-dark.svg" layout='responsive' width="140" height="48" alt=""/>
             </div>
          </SwiperSlide>
          <SwiperSlide>
             <div className='width-120 mx-auto h-auto'>
             <Image src="/img/partners/hubspot-dark.svg" layout='responsive' width="140" height="48" alt=""/>
             </div>
          </SwiperSlide>
            </Swiper>
            </div>
    );
}