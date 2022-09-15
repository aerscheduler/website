
import PageHeaderDefault from "@components/page-headers/PageHeaderDefault";
import PricingComparison from "@components/pricing-tables/PricingComparison";
import PricingDefault from "@components/pricing-tables/PricingDefault";
import Layout from "@layouts/LayoutDefault";

export default function PricingTables() {
    return (
        <>
            <PageHeaderDefault pageTitle="Pricing Tables" pageSubtitle="2 components" />
            <section className="position-relative">
                <div className="container-fluid pb-9 pb-lg-11 position-relative mt-n12">
                    <div className="bg-body shadow-lg rounded-4 py-5">
                    <div className="container mb-9 mb-lg-11">
                    <p className="mb-4">Component: <code>&lt;PricingDefault/&gt;</code></p>
                    <PricingDefault/>
                    </div>
                    <div className="container">
                    <p className="mb-4">Component: <code>&lt;PricingComparison/&gt;</code></p>
                    <PricingComparison/>
                    </div>
                    </div>
                </div>
            </section>
        </>
    );
}
PricingTables.getLayout = function getLayout(page) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}