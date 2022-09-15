
import "glightbox/dist/css/glightbox.css";
import { useEffect } from 'react';
export default  function VideoPopup({videoLink}) {
    useEffect(() => {
        window.GLightbox = require('glightbox')
        const lightbox = GLightbox({
            selector:".glightbox"
        });
    })
    return (
        <>
           <a href={videoLink} className='glightbox size-60 hover-lift btn btn-warning p-0 rounded-circle d-flex align-items-center justify-content-center' data-gallery="videoGallery">
            <span className='fs-2 align-middle material-symbols-rounded'>play_arrow</span>
            </a> 
        </>
    );
}