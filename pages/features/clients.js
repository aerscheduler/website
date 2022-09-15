
import CtaBoxed from "@components/call-to-actions/CtaBoxed";
import ClientsCarousel from "@components/clients/ClientsCarousel";
import ClientsDefault from "@components/clients/ClientsDefault";
import PageHeaderDefault from "@components/page-headers/PageHeaderDefault";
import Layout from "@layouts/LayoutDefault";

export default function Clients() {
    return (
        <>
            <PageHeaderDefault pageTitle="Clients" pageSubtitle="Partners component" />
            <section className="position-relative">
                
                <div className="container pb-9 pb-lg-11 position-relative mt-n12">
                <p>Component: <code>&lt;ClientsDefault/&gt;</code></p>
                    <div className="card py-5 px-4 rounded-4 border-0 shadow-lg">
                        <ClientsDefault/>
                    </div>
                </div>
                <div className="container pb-9 pb-lg-11 position-relative">
                <p>Component: <code>&lt;ClientsCarousel/&gt;</code></p>
                    <div className="card py-5 px-4 rounded-4 border-0 shadow-lg overflow-hidden">
                        <ClientsCarousel/>
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
Clients.getLayout = function getLayout(page) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}