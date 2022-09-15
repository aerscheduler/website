import FeatureIconTiny from "@components/features/feature-icons/FeatureIconTiny";
import VideoPopup from "@components/lightbox/VideoPopup";
import Image from "next/image";
import Link from "next/link";
export const heroImage = "/img/shots/dashboard.svg";
export default function HeroDecorative() {
  return (
    <section className="bg-dark position-relative">
      {/**Blur background */}
      <div className="bg-blur position-absolute start-0 top-0 w-100 h-100 opacity-25"></div>
      {/**Page header shape background */}
      <svg className="position-absolute start-0 bottom-0 w-100 fill-body-bg" height="40%" preserveAspectRatio="none" viewBox="0 0 1200 145" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 0L50 16.9167C100 33.8333 200 67.6667 300 77.3333C400 87 500 72.5 600 62.8333C700 53.1667 800 48.3333 900 55.5833C1000 62.8333 1100 82.1667 1150 91.8333L1200 101.5V145H1150C1100 145 1000 145 900 145C800 145 700 145 600 145C500 145 400 145 300 145C200 145 100 145 50 145H0V0Z"
          fill="currentColor"
        />
      </svg>
      <div className="container pt-11 pt-lg-13 position-relative z-index-1">
        <div className="row pb-9 pb-lg-11 pt-lg-5">
          <div className="col-lg-11 mx-auto text-center">
            {/* <h1 className="display-4 mb-5 text-white">Connect to your customers in whole new way with worlds #No1 software</h1> */}
            <h1 className="display-4 mb-5 text-white">Manage your flight school with the best mobile software available</h1>
            <p className="mb-5 lead text-white text-opacity-75 mx-auto w-lg-80">
              AerScheduler is a modern aviation software company. Our mission is to make the lives of aviation schools, clubs, charters, and individuals easier through affordable and modern
              technologies.
            </p>
            <div className="mb-7 d-flex justify-content-center align-items-center">
              <Link href="/demo-request">
                <a className="btn btn-primary btn-lg">Start for free</a>
              </Link>
              <div className="d-flex align-items-center ms-4">
                <div>
                  <VideoPopup videoLink="https://www.youtube.com/watch?v=Ga6RYejo6Hk" />
                </div>
                <small className="d-none text-white text-opacity-50 d-sm-block ms-sm-2">See AerScheduler in action</small>
              </div>
            </div>
            <div className="position-relative mx-lg-9 rounded-3 overflow-hidden shadow-lg z-index-1">
              <Image width="1424" height="1014" alt="" className="" src={heroImage} layout="responsive" priority />
            </div>
            <div className="d-flex pt-7 pt-lg-9 flex-wrap align-items-center justify-content-center">
              <div className="ps-3 pe-4 me-2 mb-2 py-2 bg-style-1 rounded-pill">
                <FeatureIconTiny icon={<span className="material-symbols-rounded align-middle fs-3">group</span>} color="primary" text="Easy scheduling" />
              </div>
              <div className="ps-3 pe-4 me-2 mb-2 py-2 bg-style-1 rounded-pill">
                <FeatureIconTiny icon={<span className="material-symbols-rounded align-middle fs-3">task</span>} color="warning" text="Mobile friendly" />
              </div>
              <div className="ps-3 pe-4 me-2 mb-2 py-2 bg-style-1 rounded-pill">
                <FeatureIconTiny icon={<span className="material-symbols-rounded align-middle fs-3">upload</span>} color="info" text="Affordable" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
