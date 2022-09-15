import CtaBoxed from "@components/call-to-actions/CtaBoxed";
import CtaDefault from "@components/call-to-actions/CtaDefault";
import CtaVertical from "@components/call-to-actions/CtaVertical";
import PageHeaderDefault from "@components/page-headers/PageHeaderDefault";
import Layout from "@layouts/LayoutDefault";

export default function CallToActions() {
    return (
        <>
            <PageHeaderDefault pageTitle="Call to actions" pageSubtitle="3 Components" />
            <section className="position-relative">
                <div className="container pb-9 pb-lg-11 position-relative mt-n12">
                    <p className="mb-4 text-muted">Component: <code>&lt;CtaBoxed/&gt;</code></p>
                    <CtaBoxed link="Request Demo" action="#" color="secondary" heading="A complete solution for you and your client's needs" subheading="Join 250,000 Customers Today" />
                </div>
                <div className="container pb-4">
                    <p className="mb-0 text-muted">Component: <code>&lt;CtaDefault/&gt;</code></p>
                </div>
            </section>

            <section className="position-relative border-top">
                <div className="container py-9 py-lg-11">
                    <CtaDefault action="#" link="Get started today" heading="Get started today"  subheading="Join over 25000+ customers worldwide"/>
                </div>
            </section>
            <div className="container pb-4">
                    <p className="mb-0 text-muted">Component: <code>&lt;CtaVertical/&gt;</code></p>
                </div>
            <section className="position-relative bg-style-1">
                <div className="container py-9 py-lg-11">
                <CtaVertical action="#" link="See Pricing" heading="Kickstart your landing project with ready-made components" subheading="Join over 25000+ customers worldwide" text="AerScheduler is a modern website template perfect for marketing your SaaS products. It helps to launch your products fast and grow exponentially."/>
                </div>
            </section>
        </>
    );
}
CallToActions.getLayout = function getLayout(page) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}