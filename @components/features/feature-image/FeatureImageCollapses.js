import Image from "next/image";
import Link from "next/link";
import ListCheck from "@components/lists/ListCheck";
import CollapseDefault from "@components/collapse/CollapseDefault";
export const FeatureImage1 = '/img/img1.jpg';
export const FeatureImage2 = '/img/img-lg1.jpg';

export const FeatureImage3 = '/img/shots/03.svg';
export default function FeatureImageCollapses() {
    return (
        <div className="row align-items-start">
        <div className="col-lg-6 mb-6 mb-lg-0 mx-auto" data-aos="fade-up" data-aos-delay="100">
            <div className="row align-items-center">
                <div className="col-6">
                <div className="position-relative overflow-hidden shadow-lg rounded-3 mb-4">
                    <Image src={FeatureImage3} priority layout="responsive" width="432" height="244" alt="" />
                </div>
                  <div className="position-relative overflow-hidden rounded-4 shadow-lg">
                    <Image src={FeatureImage1} priority layout="responsive" width="690" height="690" alt=""/>
                  </div>
                </div>
                <div className="col-6">
                  <div className="position-relative overflow-hidden rounded-4 shadow-lg">
                    <Image src={FeatureImage2} priority layout="responsive" width="640" height="960" alt=""/>
                  </div>
                </div>
            </div>
        </div>
       <div className="col-lg-5 mx-auto">
        <h2 className='position-relative fs-1 mb-4' data-aos="fade-up">Manage your school from your phone.</h2>
        <p className='lead mb-4' data-aos="fade-up" data-aos-delay="100">Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing.</p>
        <div className="accordion card border-0 mb-4" id='collapseGroup'>
                {/* Collapse accordion item */}
                <div className="accordion-item">
                    <h6 className="card-header border-bottom-0" role="button" data-bs-toggle="collapse" aria-expanded="true" data-bs-target='#collapseItem1'>
                       <span className="d-block text-truncate"> Fully Responsive</span>
                    </h6>
                    <div id='collapseItem1' className="accordion-collapse collapse show" data-bs-parent='#collapseGroup'>
                        <div className="card-body border-top">
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </div>
                    </div>
                </div>
                {/* Collapse accordion item */}
                <div className="accordion-item">
                    <h6 className="card-header border-bottom-0" role="button" data-bs-toggle="collapse" aria-expanded="false" data-bs-target='#collapseItem2'>
                    <span className="d-block text-truncate"> Re-usable Components</span>
                    </h6>
                    <div id='collapseItem2' className="accordion-collapse collapse" data-bs-parent='#collapseGroup'>
                        <div className="card-body border-top">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </div>
                    </div>
                </div>
                {/* Collapse accordion item */}
                <div className="accordion-item">
                    <h6 className="card-header border-bottom-0" role="button" data-bs-toggle="collapse" aria-expanded="false" data-bs-target='#collapseItem3'>
                       Weekly updates
                    </h6>
                    <div id='collapseItem3' className="accordion-collapse collapse" data-bs-parent='#collapseGroup'>
                        <div className="card-body border-top">
                         Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        </div>
                    </div>
                </div>
            </div>
       <div data-aos="fade-up" data-aos-delay="300">
       <Link href='/#'><a className='fw-bold'>Learn More About Analytics
       <span className='material-symbols-rounded fs-5 ms-2 align-middle lh-1'>arrow_forward</span>
       </a></Link>
       </div>
       
       </div>
    </div>
    );
}