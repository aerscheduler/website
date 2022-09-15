// import Swiper core and required modules

import Image from 'next/image';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
export default function TestimonialBoxed({comment,profilePic,brandLogo,username,userpost,classes}) {
    return (
        <>
             <div className={classes}>
                <div className='row'>
                <div className='col-md-10 col-lg-9 mx-auto text-center'>
                    <div className='width-160 mx-auto h-auto mb-4'>
                        <Image layout='responsive' src={brandLogo} width="400" height="125" alt="" />
                    </div>
                    <h3 className='fw-normal flex-grow-1 lh-base mb-4 mb-lg-5'>
                    {comment}
                    </h3>
                    <div className='d-flex justify-content-center mt-auto align-items-center'>
                        <div className='flex-shrink-0 width-60 shadow rounded-circle'>
                            <Image layout='responsive' src={profilePic} width="256" height="256" className='rounded-circle' alt=""/>
                        </div>
                        <div className='ps-3 text-start'>
                            <h5 className='mb-1'>{username}</h5>
                            <small className='text-white text-opacity-75'>{userpost}</small>
                        </div>
                    </div>
            </div>
                </div>
                </div>
        </>
    );
}
