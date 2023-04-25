import CtaDefault from "@components/call-to-actions/CtaDefault";
import DividerBottom from "@components/dividers/DividerBottom";
import FeatureIconWithTitle from "@components/features/feature-icons/FeatureIconWithTitle";
import FeatureImageLeft1 from "@components/features/feature-image/FeatureScheduling";
import FeatureImageLeft2 from "@components/features/feature-image/FeatureMaintenance";
import FeatureImageRight1 from "@components/features/feature-image/FeaturePayments";
import PageHeaderDefault from "@components/page-headers/PageHeaderDefault";
import Layout from "@layouts/LayoutDefault";
export default function Features() {
    return (
        <>
        <PageHeaderDefault pageTitle="Features" pageSubtitle="Learn about core features of AerScheduler."/>
        <section className="position-relative">
          <div className="container pb-9 pb-lg-11 position-relative mt-n12">
            <FeatureImageLeft1/>
          </div>
        </section>
        <section className="position-relative">
          <div className="container pb-9 pb-lg-11">
            <FeatureImageRight1/>
          </div>
        </section>
        <section className="position-relative bg-style-1">
          <div className="container py-9 py-lg-11 position-relative">
            <FeatureImageLeft2/>
          </div>
        </section>
        <section className='position-relative'>
        <div className='container py-9 py-lg-11 position-relative'>
          <h2 className='display-6 text-center mb-6 mb-lg-9'>More features</h2>
          <div className='row justify-content-around'>
            <div className='col-sm-6 col-md-4 col-xl-3 mb-6' data-aos="fade-up">
              <FeatureIconWithTitle icon={
                <span className="material-symbols-rounded align-middle fs-3">
                  insights
                </span>
              } color="primary" title="Analytics" description="Lorem ipsum dolor sit amet adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " />
            </div>
            <div className='col-sm-6 col-md-4 col-xl-3 mb-6' data-aos="fade-up">
              <FeatureIconWithTitle icon={
                <span className="material-symbols-rounded align-middle fs-3">
                  workspaces
                </span>
              } color="success" title="Collaboration" description="Lorem ipsum dolor sit amet adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " />
            </div>
            <div className='col-sm-6 col-md-4 col-xl-3 mb-6' data-aos="fade-up">
              <FeatureIconWithTitle icon={
                <span className="material-symbols-rounded align-middle fs-3">
                  smart_toy
                </span>
              } color="warning" title="Automation" description="Lorem ipsum dolor sit amet adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " />
            </div>
            <div className='col-12 d-none d-md-block'></div>
            <div className='col-sm-6 col-md-4 col-xl-3 mb-6 mb-md-0' data-aos="fade-up">
              <FeatureIconWithTitle icon={
                <span className="material-symbols-rounded align-middle fs-3">
                  verified_user
                </span>
              } color="danger" title="Secure & Reliable" description="Lorem ipsum dolor sit amet adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " />
            </div>
            <div className='col-sm-6 col-md-4 col-xl-3 mb-6 mb-sm-0' data-aos="fade-up">
              <FeatureIconWithTitle icon={
                <span className="material-symbols-rounded align-middle fs-3">
                  credit_score
                </span>
              } color="secondary" title="Affordable" description="Lorem ipsum dolor sit amet adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " />
            </div>
            <div className='col-sm-6 col-md-4 col-xl-3' data-aos="fade-up">
              <FeatureIconWithTitle icon={
                <span className="material-symbols-rounded align-middle fs-3">
                  contact_support
                </span>
              } color="info" title="24/7 Suupport" description="Lorem ipsum dolor sit amet adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " />
            </div>
          </div>
        </div>
      </section>
      <section className="position-relative bg-style-1">
        <div className="container py-9 py-lg-11">
        <CtaDefault link="Get started today" heading="Get started today"  subheading="Join over 25000+ customers worldwide"/>
        </div>
      </section>
        </>
    );
}
Features.getLayout = function getLayout(page) {
    return (
      <Layout>
        {page}
      </Layout>
    )
  }