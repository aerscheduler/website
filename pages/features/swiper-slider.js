
import ClientsCarousel from "@components/clients/ClientsCarousel";
import PageHeaderDefault from "@components/page-headers/PageHeaderDefault";
import TestimonialsSlider from "@components/testimonials/TestimonialsSlider";
import Layout from "@layouts/LayoutDefault";

export default function SwiperSlider() {
    return (
        <>
            <PageHeaderDefault pageTitle="Swiper slider" pageSubtitle="2 Components" />
            <section className="position-relative">
                <div className="position-relative overflow-hidden mt-n12">
                <div className="container pb-9 pb-lg-11 position-relative">
                    <p>Component: <code>&lt;TestimonialsSlider/&gt;</code> </p>
                    <TestimonialsSlider/>
                </div>
                <div className="container pb-9 pb-lg-11 position-relative">
                    <p className="mb-5">Component: <code>&lt;ClientsCarousel/&gt;</code> </p>
                    <ClientsCarousel/>
                </div>
                </div>
            </section>
        </>
    );
}
SwiperSlider.getLayout = function getLayout(page) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}