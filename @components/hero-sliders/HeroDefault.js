import Image from "next/image"
import Link from "next/link"
import 'material-symbols'
export const HeroStaticBG = '/img/img1.jpg'
import VideoPopup from "@components/lightbox/VideoPopup"
import FeatureIconTiny from "@components/features/feature-icons/FeatureIconTiny"
export default function HeroDefault() {
    return (
        <section className="pt-12 pt-lg-15 pb-7 bg-blur position-relative overflow-hidden">

            <div className="container position-relative">
                <div className="row align-items-center">
                    <div className="col-lg-6 col-md-10 text-center text-lg-start ms-lg-0 me-lg-auto mx-md-auto">
                        <h1 className="mb-4 display-3 position-relative z-index-2">
                            A software to manage your business
                        </h1>
                        <p className="mb-5 w-lg-75 lead">
                            AerScheduler helps to launch your products fast and grow exponentially.
                        </p>
                        <div className="d-flex justify-content-lg-start justify-content-center mb-3">

                            <Link href="/demo-request">
                                <a className="btn hover-lift mb-2 btn-gradient-primary btn-lg d-flex align-items-center">
                                    Start for free
                                    <span className="material-symbols-rounded align-middle ms-2">arrow_forward</span>
                                </a>
                            </Link>
                        </div>
                        <div className="mb-5 d-flex align-items-center justify-content-lg-start justify-content-center">
                            <div>
                                <VideoPopup videoLink="https://www.youtube.com/watch?v=Ga6RYejo6Hk"/>
                            </div>
                            <small className="d-none d-sm-block ms-sm-2">See AerScheduler in action</small>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-10 mx-auto mx-lg-0 position-relative">

                        <div className="position-relative w-100 p-3 p-lg-5">

                            <div className="position-relative w-100 h-auto">
                                <Image priority layout="responsive" width="690px" height="690px" className="rounded-5" src={HeroStaticBG} alt="" />
                            </div>
                            {/**Feature Icon */}
                            <div className='bg-white rotate-4 shadow-lg position-absolute end-0 top-0 width-240 h-auto text-dark rounded-4 p-3'>
                                <FeatureIconTiny icon={
                                    <span className="material-symbols-rounded align-middle fs-3">
                                        workspaces
                                    </span>
                                } color="warning" text="Easy scheduling" />
                            </div>
                            {/**Feature Icon */}
                            <div className='bg-white rotate-n4 shadow-lg position-absolute start-0 bottom-0 width-200 h-auto text-dark rounded-4 p-3'>
                                <FeatureIconTiny icon={
                                    <span className="material-symbols-rounded align-middle fs-3">
                                        task
                                    </span>
                                } color="primary" text="Manage your organization" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}