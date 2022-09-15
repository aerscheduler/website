import Head from 'next/head'
import 'material-symbols'
import Link from 'next/link'
import FeatureIconDefault from '@components/features/feature-icons/FeatureIconDefault'
import HeroDefault from '@components/hero-sliders/HeroDefault'
import Layout from '@layouts/LayoutDefault'
import FeatureImageLeft1 from '@components/features/feature-image/FeatureImageLeft1'
import FeatureImageRight1 from '@components/features/feature-image/FeatureImageRight1'
import FeatureImageLeft2 from '@components/features/feature-image/FeatureImageLeft2'
import CtaBoxed from '@components/call-to-actions/CtaBoxed'
import IntegrationDefault from '@components/integrations/IntegrationDefault'
import FeatureIconLeft from '@components/features/feature-icons/FeatureIconLeft'
export const airbnb = '/img/partners/airbnb-white.svg';
export const airbnbAvatar = '/img/avatars/male/1.jpg';
import FeatureIconVertical from '@components/features/feature-icons/FeatureIconVertical'
import TestimonialBoxed from '@components/testimonials/TestimonialBoxed'
import PricingDefault from '@components/pricing-tables/PricingDefault'
export default function Index() {
  return (
    <>
      <Head>
        <title>AerScheduler | Home</title>
      </Head>
      <HeroDefault />
      <section className='position-relative'>
        <div className='container py-9 py-lg-11'>
          <div className='row'>
            <div className='col-md-4 mb-6 mb-md-0' data-aos="fade-up">
              <FeatureIconDefault icon={
                <span className="material-symbols-rounded align-middle fs-1">
                  insights
                </span>
              } color="primary" title="Analytics" description="Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor dolore magna aliqua enim ad minim veniam." />
            </div>
            <div className='col-md-4 mb-6 mb-md-0' data-aos="fade-up" data-aos-delay="100">
              <FeatureIconDefault icon={
                <span className="material-symbols-rounded align-middle fs-1">
                  smart_toy
                </span>
              } color="success" title="Automation" description="Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor dolore magna aliqua enim ad minim veniam." />
            </div>
            <div className='col-md-4' data-aos="fade-up" data-aos-delay="200">
              <FeatureIconDefault icon={
                <span className="material-symbols-rounded align-middle fs-1">
                  workspaces
                </span>
              } color="warning" title="Collaboration" description="Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor dolore magna aliqua enim ad minim veniam." />
            </div>
          </div>
        </div>
      </section>

      <section className='position-relative border-top'>
        <div className='container pt-9 pt-lg-11'>
          <div className='row align-items-center'>
            <div className='col-lg-8 mx-auto text-center mb-7'>
              <h2 className='display-5 mb-0' data-aos="fade-up">
                See what AerScheduler can do for your organization.
              </h2>
              <div className='bg-primary width-80 my-7 mx-auto pt-1 rounded-pill' data-aos="fade-up" data-aos-delay="100"></div>
            </div>
          </div>
          <div className='pb-9 pb-lg-11 border-bottom'>
            <div className='row'>
              <div className='col-xl-10 mx-auto'>
              <FeatureImageLeft1 />
              </div>
            </div>
            <div className='row justify-content-around' data-aos="zoom-in-down">
              <div className='col-md-5 col-xl-4 mt-7 mt-lg-11'>
                <FeatureIconVertical icon={<span className="material-symbols-rounded fs-2 align-middle">commit </span>}
                  color="primary" title="Proven Performance" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip commodo." />
              </div>
              <div className='col-md-5 col-xl-4 mt-7 mt-lg-11' data-aos="zoom-in-down" data-aos-delay="100">
                <FeatureIconVertical icon={<span className="material-symbols-rounded fs-2 align-middle">commit </span>}
                  color="warning" title="Unparalleled Track Record" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip commodo." />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='position-relative'>
        <div className='container py-9 py-lg-11 position-relative'>
          <FeatureImageRight1 />
        </div>
      </section>
      <section>
        <div className='container'>
          <TestimonialBoxed classes="bg-primary rounded-4 shadow-lg text-white py-7 px-4" userpost="Marketing manager" username="John Doe" comment="“ We were looking for an innovation partner that could be provide all the components that we needed. SaaS, with its abilities was a good match.”" brandLogo={airbnb} profilePic={airbnbAvatar} />
        </div>
      </section>
      <section className='position-relative'>
        <div className='container py-9 py-lg-11 position-relative'>
          <FeatureImageLeft2 />
        </div>
      </section>
      <section className='position-relative overflow-hidden bg-dark text-white'>
          {/**Page header shape background */}
<svg className="position-absolute start-0 bottom-0 w-100 fill-body-bg" height="48" preserveAspectRatio="none" viewBox="0 0 1200 145" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fillRule="evenodd" clipRule="evenodd" d="M0 0L50 16.9167C100 33.8333 200 67.6667 300 77.3333C400 87 500 72.5 600 62.8333C700 53.1667 800 48.3333 900 55.5833C1000 62.8333 1100 82.1667 1150 91.8333L1200 101.5V145H1150C1100 145 1000 145 900 145C800 145 700 145 600 145C500 145 400 145 300 145C200 145 100 145 50 145H0V0Z"/>
</svg>
        <div className='container py-9 py-lg-11 position-relative z-index-1'>
          <div className='row'>
            <div className='col-xl-8 col-lg-10 mx-auto text-center'>
            <h5 className='mb-4 text-warning'>More benefits</h5>
              <h2 className='display-5 mb-4 mb-lg-5'>
                AerScheduler at your fingertips
              </h2>
            </div>
          </div>
          <div className='row pb-6'>
            <div className='col-md-6 mt-4'>
              <div className='bg-white bg-opacity-10 rounded-4 p-4' data-aos="fade-up">
                <FeatureIconLeft icon={
                  <span className="material-symbols-rounded align-middle fs-1">
                    insights
                  </span>
                } color="info" title="Analytics" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " />
              </div>
            </div>
            <div className='col-md-6 mt-4'>
              <div className='bg-white bg-opacity-10 rounded-4 p-4' data-aos="fade-up">
                <FeatureIconLeft icon={
                  <span className="material-symbols-rounded align-middle fs-1">
                    workspaces
                  </span>
                } color="warning" title="Collaboration" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " />
              </div>
            </div>
            <div className='col-md-6 mt-4'>
              <div className='bg-white bg-opacity-10 rounded-4 p-4' data-aos="fade-up">
                <FeatureIconLeft icon={
                  <span className="material-symbols-rounded align-middle fs-1">
                    smart_toy
                  </span>
                } color="primary" title="Automation" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " />
              </div>
            </div>
            <div className='col-md-6 mt-4'>
              <div className='bg-white bg-opacity-10 rounded-4 p-4' data-aos="fade-up">
                <FeatureIconLeft icon={
                  <span className="material-symbols-rounded align-middle fs-1">
                    verified_user
                  </span>
                } color="success" title="Secure & Reliable" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " />
              </div>
            </div>
            <div className='col-md-6 mt-4'>
              <div className='bg-white bg-opacity-10 rounded-4 p-4' data-aos="fade-up">
                <FeatureIconLeft icon={
                  <span className="material-symbols-rounded align-middle fs-1">
                    credit_score
                  </span>
                } color="danger" title="Affordable" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " />
              </div>
            </div>
            <div className='col-md-6 mt-4'>
              <div className='bg-white bg-opacity-10 rounded-4 p-4' data-aos="fade-up">
                <FeatureIconLeft icon={
                  <span className="material-symbols-rounded align-middle fs-1">
                    contact_support
                  </span>
                } color="light" title="24/7 Support" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='position-relative overflow-hidden'>
        <div className='position-absolute start-0 bottom-0 w-100 h-50 bg-style-1'></div>
        <div className='container py-9 py-lg-11 position-relative'>
          <div className='row mb-5 mb-lg-7'>
            <div className='col-lg-8 mx-auto text-center'>
              <h5 className='mb-4'>Pay as you go</h5>
              <h2 className='display-5 mb-0'>
              Simple pricing plan for you
              </h2>
            </div>
          </div>

          <div className='row mb-7'>
            <PricingDefault />
          </div>
          <div className='text-center'>
            <Link href="/pricing">
              <a>Learn More about Pricing <span className='material-symbols-rounded align-middle ms-1'>arrow_forward</span></a>
            </Link>
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
      <section className="position-relative">
        <div className='bg-dark w-100 h-50 bottom-0 start-0 position-absolute'></div>
        <div className="container position-relative">
          <CtaBoxed link="Request Demo" action="#" color="secondary" heading="A complete solution for you and your client's needs" subheading="Join 250,000 Customers Today" />
        </div>
      </section>
    </>
  )
}
Index.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}