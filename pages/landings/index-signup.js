import CtaBoxed from "@components/call-to-actions/CtaBoxed";
import ClientsDefault from "@components/clients/ClientsDefault";
import FeatureIconVertical from "@components/features/feature-icons/FeatureIconVertical";
import FeatureIconWithTitle from "@components/features/feature-icons/FeatureIconWithTitle";
import FeatureImageLeft1 from "@components/features/feature-image/FeatureScheduling";
import FeatureImageLeft2 from "@components/features/feature-image/FeatureMaintenance";
import FeatureImageRight1 from "@components/features/feature-image/FeaturePayments";
import HeroSignUp from "@components/hero-sliders/HeroSignUp";
import IntegrationDefault from "@components/integrations/IntegrationDefault";
import VideoPopup from "@components/lightbox/VideoPopup";
import TestimonialsSlider from "@components/testimonials/TestimonialsSlider";
import Layout from "@layouts/LayoutDefault";
import Head from "next/head";
import Link from "next/link";
export default function IndexSignUp() {
    return (
     <>
      <Head>
          <title>AerScheduler - Home 2</title>
        </Head>
        <HeroSignUp/>
        <section className='position-relative'>
        <div className='container pt-7' data-aos="fade-up">
          <div className="px-4 py-6 rounded-4 bg-style-1">
          <ClientsDefault/>
          <div className="mt-4 d-flex justify-content-center align-items-center">
                            <div>
                            <VideoPopup videoLink="https://www.youtube.com/watch?v=Ga6RYejo6Hk"/>
                            </div>
                            <small className="d-none d-sm-block ms-sm-2">See AerScheduler in action</small>
                        </div>
          </div>
        </div>
        </section>
      <section className='position-relative'>
        <div className='container pt-9 pt-lg-11'>
          <div className='row mb-7 mb-lg-9 align-items-center'>
            <div className='col-lg-8 mb-4 mb-md-0'>
              <h2 className='display-5 mb-0' data-aos="fade-up">
                See what AerScheduler can do for your organization.
              </h2>
            </div>
          </div>
          <FeatureImageLeft1 />
          <div className='row justify-content-around' data-aos="zoom-in-down">
              <div className='col-md-5 mt-7 mt-lg-11'>
                <FeatureIconVertical icon={<span className="material-symbols-rounded fs-2 align-middle">commit </span>}
                  color="primary" title="Proven Performance" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." />
              </div>
              <div className='col-md-5 mt-7 mt-lg-11' data-aos="zoom-in-down" data-aos-delay="100">
                <FeatureIconVertical icon={<span className="material-symbols-rounded fs-2 align-middle">commit </span>}
                  color="success" title="Unparalleled Track Record" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." />
              </div>
            </div>
        </div>
      </section>
      <section className='position-relative'>
        <div className='container pt-9 pt-lg-11 position-relative'>
          <FeatureImageRight1 />
        </div>
      </section>
      <section className='position-relative'>
        <div className='container pt-9 pt-lg-11 pb-9 pb-lg-11 position-relative'>
          <FeatureImageLeft2 />
        </div>
      </section>
      <section className='position-relative bg-style-1'>
        <div className='container py-9 py-lg-11'>
          <h2 className='display-5 text-center mb-7 mb-lg-9'>AerScheduler at your Fingertips</h2>
          <div className='row justify-content-around'>
            <div className='col-sm-6 col-lg-4 col-xl-3 mb-6' data-aos="fade-up">
              <FeatureIconWithTitle icon={
                <span className="material-symbols-rounded align-middle fs-3">
                  insights
                </span>
              } color="primary" title="Analytics" description="Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " />
            </div>
            <div className='col-sm-6 col-lg-4 col-xl-3 mb-6' data-aos="fade-up">
              <FeatureIconWithTitle icon={
                <span className="material-symbols-rounded align-middle fs-3">
                  workspaces
                </span>
              } color="success" title="Collaboration" description="Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " />
            </div>
            <div className='col-sm-6 col-lg-4 col-xl-3 mb-6' data-aos="fade-up">
              <FeatureIconWithTitle icon={
                <span className="material-symbols-rounded align-middle fs-3">
                  smart_toy
                </span>
              } color="warning" title="Automation" description="Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " />
            </div>
            <div className='col-12 d-none d-lg-block'></div>
            <div className='col-sm-6 col-lg-4 col-xl-3 mb-6 mb-md-0' data-aos="fade-up">
              <FeatureIconWithTitle icon={
                <span className="material-symbols-rounded align-middle fs-3">
                  verified_user
                </span>
              } color="danger" title="Secure & Reliable" description="Lorem ipsum dolor sit amet, adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " />
            </div>
            <div className='col-sm-6 col-lg-4 col-xl-3 mb-6 mb-lg-0' data-aos="fade-up">
              <FeatureIconWithTitle icon={
                <span className="material-symbols-rounded align-middle fs-3">
                  credit_score
                </span>
              } color="secondary" title="Affordable" description="Lorem ipsum dolor sit amet, adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " />
            </div>
            <div className='col-sm-6 col-lg-4 col-xl-3' data-aos="fade-up">
              <FeatureIconWithTitle icon={
                <span className="material-symbols-rounded align-middle fs-3">
                  contact_support
                </span>
              } color="info" title="24/7 Suupport" description="Lorem ipsum dolor sit amet, adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " />
            </div>
          </div>
        </div>
      </section>
      <section className='position-relative'>
        <div className='container py-9 py-lg-11'>
          <div className='row'>
            <IntegrationDefault />
          </div>
        </div>
      </section>
      <section className='position-relative bg-style-1 overflow-hidden'>
        <div className='container py-9 py-lg-11'>
          <div className='row mb-7 align-items-center'>
            <div className='col-md-7'>
              <h2 className='display-5 mb-4 mb-md-0'>Peoples talking</h2>
            </div>
            <div className='col-md-5 text-md-end'>
              <Link href="/more/customers">
                <a className='btn btn-warning hover-lift'>View Customer Stories <span className='material-symbols-rounded fs-5 align-middle ms-2'>arrow_forward</span></a>
              </Link>
            </div>
          </div>
          <div className='row'>
            <TestimonialsSlider />
          </div>
        </div>
      </section>

      <section className="position-relative">
      <div className='bg-dark w-100 h-50 bottom-0 start-0 position-absolute'></div>
      <div className='bg-style-1 w-100 h-50 top-0 start-0 position-absolute'></div>
        <div className="container position-relative">
        <CtaBoxed link="Request Demo" action="#" color="secondary" heading="A complete solution for you and your client's needs" subheading="Join 250,000 Customers Today" />
        </div>
      </section>
     </>
    );
}
IndexSignUp.getLayout = function getLayout(page) {
    return (
      <Layout>
        {page}
      </Layout>
    )
  }