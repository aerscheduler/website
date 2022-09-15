import React from "react";
export default function Numbers1({ color }) {
    return (
        <div className="row text-center">
            <div className="col-md-4 mb-7 mb-md-0" data-aos="fade-up">
                <span className={`${color ? `text-${color}` : 'text-body'} display-4 d-block mb-3`}>
                    72%
                </span>
                <h5 className="mb-0">
                    Increased productivity
                </h5>
            </div>

            <div className="col-md-4 mb-7 mb-md-0" data-aos="fade-up" data-aos-delay="100">
                <span className={`${color ? `text-${color}` : 'text-body'} display-4 d-block mb-3`}>
                   24%
                </span>
                <h5 className="mb-0">
                    Working hours save
                </h5>
            </div>
            <div className="col-md-4" data-aos="fade-up" data-aos-delay="150">
                <span className={`${color ? `text-${color}` : 'text-body'} display-4 d-block mb-3`}>
                   82%
                </span>
                <h5 className="mb-0">
                    Lower operational costs
                </h5>
            </div>
        </div>
    );
}