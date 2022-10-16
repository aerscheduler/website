import CtaVertical from "@components/call-to-actions/CtaVertical";
import ClientsCarousel from "@components/clients/ClientsCarousel";
import FeatureIconWithTitle from "@components/features/feature-icons/FeatureIconWithTitle";
import FeatureTabHorizontal from "@components/features/feature-tabs/FeatureTabHorizontal";
import HeroDecorative from "@components/hero-sliders/HeroDecorative";
import HeroDefault from "@components/hero-sliders/HeroDefault";
import Numbers1 from "@components/numbers/Numbers1";
import ProcessDefault from "@components/process/ProcessDefault";
import TestimonialRating from "@components/testimonials/TestimonialRating";
import LayoutCombine from "@layouts/LayoutCombine";
import Head from "next/head";

export default function IndexDecorative() {
  return (
    <>
      <Head>
        <title>AerScheduler | Aviation Program Scheduling Software</title>
      </Head>
      {/* <HeroDecorative /> */}
      <HeroDefault />
      {/* <section className="position-relative overflow-hidden">
        <div className="container position-relative z-index-1">
          <div className="px-4 py-6 bg-primary bg-opacity-10 rounded-4">
            <h6 className="text-center pt-4 text-muted mb-7">Loved by schools all around</h6>
            <ClientsCarousel />
          </div>
        </div>
      </section>
      <section className="position-relative overflow-hidden">
        <div className="container py-9 py-lg-11">
          <Numbers1 color="primary" />
        </div>
      </section> */}
      <section className="position-relative bg-style-1">
        <div className="container py-9 py-lg-11 position-relative z-index-1">
          <div className="mb-6 mb-lg-9 mx-auto text-center w-lg-50">
            <h6 className="bg-primary bg-opacity-25 text-primary d-table mx-auto rounded-pill px-3 py-2 mb-4">Core features</h6>
            <h2 className="display-5" data-aos="fade-up">
              See what AerScheduler can do for your flight program
            </h2>
          </div>
          <FeatureTabHorizontal />
        </div>
      </section>
      <section className="position-relative">
        <div className="container py-9 py-lg-11">
          <h6 className="bg-warning bg-opacity-25 text-warning d-table mx-auto rounded-pill px-3 py-2 mb-4">More benefits</h6>
          <h2 className="display-5 text-center mb-6 mb-lg-9">AerScheduler at your fingertips</h2>
          <div className="row justify-content-around">
            <div className="col-sm-6 col-xl-3 mb-6" data-aos="fade-up">
              <FeatureIconWithTitle
                icon={<span className="material-symbols-rounded align-middle fs-3">insights</span>}
                color="primary"
                title="Mobile Friendly"
                description={`"If you can do it on desktop, you should be able to do it on your phone." That's what we tried to do and we did it.`}
              />
            </div>
            <div className="col-sm-6 col-xl-3 mb-6" data-aos="fade-up">
              <FeatureIconWithTitle
                icon={<span className="material-symbols-rounded align-middle fs-3">workspaces</span>}
                color="success"
                title="Easy To Use"
                description="We all know aviation software can be a little dated. Here's to making steps towards more intuitive software."
              />
            </div>
            <div className="col-sm-6 col-xl-3 mb-6" data-aos="fade-up">
              <FeatureIconWithTitle
                icon={<span className="material-symbols-rounded align-middle fs-3">smart_toy</span>}
                color="warning"
                title="Fast"
                description="No more scrambling to a computer. Pull out your phone, iPad, or tablet, and make immediate changes."
              />
            </div>
            <div className="col-12 d-none d-xl-block"></div>
            <div className="col-sm-6 col-xl-3 mb-6 mb-md-0" data-aos="fade-up">
              <FeatureIconWithTitle
                icon={<span className="material-symbols-rounded align-middle fs-3">verified_user</span>}
                color="danger"
                title="Secure & Reliable"
                description="We have systems in place to backup your data daily and make sure we are up and running over 99.9% of the time."
              />
            </div>
            <div className="col-sm-6 col-xl-3 mb-6 mb-sm-0" data-aos="fade-up">
              <FeatureIconWithTitle
                icon={<span className="material-symbols-rounded align-middle fs-3">credit_score</span>}
                color="secondary"
                title="Affordable"
                description="Our scheduling feature is completely free to use and we don't plan on changing that. More features will be available with our premium package."
              />
            </div>
            <div className="col-sm-6 col-xl-3" data-aos="fade-up">
              <FeatureIconWithTitle
                icon={<span className="material-symbols-rounded align-middle fs-3">contact_support</span>}
                color="info"
                title="Actively Improving"
                description="We are always open to feedback and are actively adding new features and doing maintenance."
              />
            </div>
          </div>
        </div>
      </section>
      <section className="overflow-hidden bg-style-1 position-relative">
        <div className="container py-9 py-lg-11">
          <h6 className="bg-primary bg-opacity-25 text-primary d-table mx-auto rounded-pill px-3 py-2 mb-4">Our Process</h6>
          <h2 className="display-5 w-lg-50 mx-auto text-center mb-6 mb-lg-7">How does it work?</h2>
          <ProcessDefault />
        </div>
      </section>
      {/* <section className="overflow-hidden position-relative">
        <div className="container py-9 py-lg-11">
          <h6 className="bg-warning bg-opacity-25 text-warning d-table mx-auto rounded-pill px-3 py-2 mb-4">Testimonials</h6>
          <h2 className="display-5 w-lg-50 mx-auto text-center mb-6 mb-lg-7">What do customers say about AerScheduler?</h2>
          <div className="row">
            <div className="col-lg-4 mb-4 mb-lg-0">
              <TestimonialRating
                stars={4.5}
                profileName="Jason Ings"
                profilePost="React Developer"
                profilePic="/img/avatars/male/1.jpg"
                classes="card text-center py-5 px-4 py-lg-6 hover-lift shadow-lg border-0 rounded-4"
                comment="“ We were looking for an innovation partner that could be provide all the elements that we needed. AerScheduler, with its abilities was a good match.”"
              />
            </div>
            <div className="col-lg-4 mb-4 mb-lg-0">
              <TestimonialRating
                stars={4}
                profileName="Nikita Milner"
                profilePost="Marketing Manager"
                profilePic="/img/avatars/female/1.jpg"
                classes="card text-center py-5 px-4 py-lg-6 hover-lift shadow-lg border-0 rounded-4"
                comment="“ We were looking for an innovation partner that could be provide all the elements that we needed. AerScheduler, with its abilities was a good match.”"
              />
            </div>
            <div className="col-lg-4">
              <TestimonialRating
                stars={5}
                profileName="Mark Otto"
                profilePost="Full Stack Developer"
                profilePic="/img/avatars/male/2.jpg"
                classes="card text-center py-5 px-4 py-lg-6 hover-lift shadow-lg border-0 rounded-4"
                comment="“ We were looking for an innovation partner that could be provide all the elements that we needed. AerScheduler, with its abilities was a good match.”"
              />
            </div>
          </div>
        </div>
      </section> */}
      <section className="bg-style-1">
        <div className="container py-9 py-lg-11">
          <CtaVertical
            link="Start for free today"
            action="/download"
            heading="Integrate your aviation program with free scheduling."
            subheading="Did we mention free?"
            text="AerScheduler is the new way to manage your fleet, personnel, and scheduling all from your mobile device."
          />
        </div>
      </section>
    </>
  );
}
IndexDecorative.getLayout = function getLayout(page) {
  return <LayoutCombine>{page}</LayoutCombine>;
};
