// import Swiper core and required modules

import Image from 'next/image';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
export default function TestimonialDefault({userName,profilePic,userPost,comment,brandLogo}) {
    return (
        <>
               <div className='card p-4 p-lg-5 h-100 border-0 shadow-lg rounded-4'>
                    <div className='width-120 h-auto mb-4'>
                        <Image layout='responsive' src={brandLogo} width="140" height="47" alt="" />
                    </div>
                    <h4 className='fw-normal flex-grow-1 lh-base mb-5'>
                     {comment}
                      </h4>
                    <div className='d-flex mt-auto align-items-center'>
                        <div className='flex-shrink-0 size-40 shadow rounded-circle'>
                            <Image layout='responsive' src={profilePic} width="256" height="256" className='rounded-circle' alt="" />
                        </div>
                        <div className='flex-grow-1 ps-3'>
                            <h5 className='mb-1'>{userName}</h5>
                            <small className='text-muted d-block lh-1'>{userPost}</small>
                        </div>
                    </div>
                </div>
        </>
    );
};