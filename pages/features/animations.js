
import CtaBoxed from "@components/call-to-actions/CtaBoxed";
import PageHeaderDefault from "@components/page-headers/PageHeaderDefault";
import Layout from "@layouts/LayoutDefault";

export default function Animations() {
    return (
        <>
            <PageHeaderDefault pageTitle="Animations" pageSubtitle="Aos scroll animations" />
            <section className="position-relative">
                <div className="container pb-9 pb-lg-11 position-relative mt-n12">
                    <div className="card py-5 px-4 border-0 shadow-lg overflow-hidden rounded-4">
                        <div className="mb-4 height-200 d-flex align-items-center justify-content-center w-75 mx-auto rounded-4 bg-secondary text-white fs-4 shadow" data-aos="fade-up" data-aos-duration="900" data-aos-once="false">
                            Fade Up
                        </div>
                        <div className="mb-4 height-200 d-flex align-items-center justify-content-center w-75 mx-auto rounded-4 bg-secondary text-white fs-4 shadow" data-aos="fade-down" data-aos-duration="900" data-aos-once="false">
                            Fade Down
                        </div>
                        <div className="mb-4 height-200 d-flex align-items-center justify-content-center w-75 mx-auto rounded-4 bg-secondary text-white fs-4 shadow" data-aos="fade-left" data-aos-duration="900" data-aos-once="false">
                            Fade Left
                        </div>
                        <div className="mb-4 height-200 d-flex align-items-center justify-content-center w-75 mx-auto rounded-4 bg-secondary text-white fs-4 shadow" data-aos="fade-right" data-aos-duration="900" data-aos-once="false">
                            Fade Right
                        </div>
                        <div className="mb-4 height-200 d-flex align-items-center justify-content-center w-75 mx-auto rounded-4 bg-secondary text-white fs-4 shadow" data-aos="flip-left" data-aos-duration="900" data-aos-once="false">
                            Flip Left
                        </div>
                        <div className="mb-4 height-200 d-flex align-items-center justify-content-center w-75 mx-auto rounded-4 bg-secondary text-white fs-4 shadow" data-aos="flip-right" data-aos-duration="900" data-aos-once="false">
                            Flip Right
                        </div>
                        <div className="text-center">
                            <a href="https://michalsnik.github.io/aos/" target="_blank" rel="noreferrer" className="fw-bold text-decoration-underline">Find More about Aos here</a>
                        </div>
                    </div>
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
Animations.getLayout = function getLayout(page) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}