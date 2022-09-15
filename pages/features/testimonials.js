import PageHeaderDefault from "@components/page-headers/PageHeaderDefault";
import TestimonialBoxed from "@components/testimonials/TestimonialBoxed";
import TestimonialRating from "@components/testimonials/TestimonialRating";
import TestimonialsDefault from "@components/testimonials/TestimonialDefault";
import TestimonialTiny from "@components/testimonials/TestimonialTiny";
import Layout from "@layouts/LayoutDefault";
import CtaBoxed from "@components/call-to-actions/CtaBoxed";
export const airbnb = '/img/partners/airbnb-white.svg';
export const airbnbAvatar = '/img/avatars/male/1.jpg';
export const brandHubspot = '/img/partners/hubspot-dark.svg';
export const hubspotAvatar = '/img/avatars/female/1.jpg';
export default function ComponentTestimonial() {
    return (
        <>
        <PageHeaderDefault pageTitle="Testimonials" pageSubtitle="4 Components"/>
        <section className="position-relative">
          <div className="container pb-9 pb-lg-11 position-relative mt-n12">
          <p className="mb-4 text-muted">Component: <code>&lt;TestimonialDefault/&gt;</code></p>
               
            <div className="row mb-9 mb-lg-11">
            <div className="col-md-6 mb-4 mb-md-0">
             <TestimonialsDefault userName="Emily Doe" profilePic="/img/avatars/female/1.jpg" userPost="Senior developer" comment="“ We were looking for an innovation partner that could be provide all the components that we needed. SaaS, with its abilities was a good match.”" brandLogo="/img/partners/forbes-dark.svg"/>
            </div>
            <div className="col-md-6">
              <TestimonialsDefault userName="Mark Otto" profilePic="/img/avatars/male/1.jpg" userPost="React developer" comment="“ We were looking for an innovation partner that could be provide all the components that we needed. SaaS, with its abilities was a good match.”" brandLogo="/img/partners/hubspot-dark.svg"/>
            </div>
            </div>
            <p className="mb-4 text-muted">Component: <code>&lt;TestimonialRating/&gt;</code></p>
             
            <div className="row mb-9 mb-lg-11">
              <div className="col-lg-4 mb-4 mb-lg-0">
               <TestimonialRating stars={4.5} profileName="Jason Ings" profilePost="React Developer" profilePic="/img/avatars/male/1.jpg" classes="card text-center py-5 px-4 py-lg-6 hover-lift shadow-lg border-0 rounded-4" comment="“ We were looking for an innovation partner that could be provide all the components that we needed. SaaS, with its abilities was a good match.”"/>
            </div>
            <div className="col-lg-4 mb-4 mb-lg-0">
              <TestimonialRating stars={4} profileName="Nikita Milner" profilePost="Marketing Manager" profilePic="/img/avatars/female/1.jpg" classes="card text-center py-5 px-4 py-lg-6 hover-lift shadow-lg border-0 rounded-4" comment="“ We were looking for an innovation partner that could be provide all the components that we needed. SaaS, with its abilities was a good match.”"/>
            </div>
            <div className="col-lg-4">
              <TestimonialRating stars={5} profileName="Mark Otto" profilePost="Full Stack Developer" profilePic="/img/avatars/male/2.jpg" classes="card text-center py-5 px-4 py-lg-6 hover-lift shadow-lg border-0 rounded-4" comment="“ We were looking for an innovation partner that could be provide all the components that we needed. SaaS, with its abilities was a good match.”"/>
            </div>
            </div>
            <div className="row mb-9 mb-lg-11">
            <p className="mb-4 text-muted">Component: <code>&lt;TestimonialBoxed/&gt;</code></p>
            <TestimonialBoxed classes="bg-primary rounded-4 shadow-lg text-white py-7 px-4" userpost="Marketing manager" username="John Doe" comment="“ We were looking for an innovation partner that could be provide all the components that we needed. SaaS, with its abilities was a good match.”" brandLogo="/img/partners/layar-white.svg" profilePic="/img/avatars/male/1.jpg"/>
            </div>
            <div className="col-md-4">
            <p className="mb-4 text-muted">Component: <code>&lt;TestimonialTiny/&gt;</code></p>
              <TestimonialTiny name="Nikita" text="Amazing react theme!! Well coded components and beautiful designs" avatar="/img/avatars/female/1.jpg" className="width-260 rounded-4 py-2 px-3 bg-body shadow-lg d-flex"/></div>
          </div>
        </section>
        
        <section className="position-relative">
            <div className="position-absolute start-0 bottom-0 h-50 w-100 bg-dark"></div>
                <div className="position-absolute start-50 top-0 translate-middle-x h-50 w-75 bg-primary bg-opacity-10 rounded-5"></div>
                <div className="container pt-3 position-relative">
                <CtaBoxed link="Request Demo" action="#" color="secondary" heading="A complete solution for you and your client's needs" subheading="Join 250,000 Customers Today" />
                </div>
            </section>
        </>
    );
}
ComponentTestimonial.getLayout = function getLayout(page) {
    return (
      <Layout>
        {page}
      </Layout>
    )
  }