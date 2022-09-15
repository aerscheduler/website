import React from "react";
import Image from "next/image";
import Rating  from 'react-rating';

export default function TestimonialRating({ classes,comment,profilePic,profilePost,profileName,stars}) {
    
    return (
        <div className={classes}>
            <div className="mb-4 size-60 rounded-circle overflow-hidden shadow-lg mx-auto">
                <Image src={profilePic} layout="responsive" width="128" height="128" alt=""/>
            </div>
            <div className="text-warning d-flex align-items-center justify-content-center mb-3">
            <Rating quiet stop={5} readonly fullSymbol={<span className='material-symbols-rounded text-warning'>star</span>} emptySymbol={<span className='material-symbols-rounded text-muted opacity-25'>star</span>} initialRating={stars}/>
            </div>
            <p className="fs-5 fw-normal mb-4">{comment}</p>
            <h5>{profileName}</h5>
            <p className="mb-0 text-muted">{profilePost}</p>
        </div>
    );
}