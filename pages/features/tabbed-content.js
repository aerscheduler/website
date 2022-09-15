
import CtaBoxed from "@components/call-to-actions/CtaBoxed";
import FeatureTabDefault from "@components/features/feature-tabs/FeatureTabDefault";
import FeatureTabHorizontal from "@components/features/feature-tabs/FeatureTabHorizontal";
import PageHeaderDefault from "@components/page-headers/PageHeaderDefault";
import Layout from "@layouts/LayoutDefault";

export default function TabbedContent() {
    return (
        <>
            <PageHeaderDefault pageTitle="Tabbed Content" pageSubtitle="2 components" />
            <section className="position-relative">
                <div className="container-fluid pb-9 pb-lg-11 position-relative mt-n12">
                    <div className="py-5 bg-body rounded-5 border-0 shadow-lg">
                       <div className="container pb-9 pb-lg-11">
                    <p className="mb-4">Component: <code>&lt;FeatureTabDefault/&gt;</code> </p>
                       <FeatureTabDefault/>
                       </div>
                       <div className="container">
                    <p className="mb-4">Component: <code>&lt;FeatureTabHorizontal/&gt;</code> </p>
                       <FeatureTabHorizontal/>
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
TabbedContent.getLayout = function getLayout(page) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}