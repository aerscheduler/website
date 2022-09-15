
import FeatureImageCollapses from "@components/features/feature-image/FeatureImageCollapses";
import FeatureImageLeft1 from "@components/features/feature-image/FeatureImageLeft1";
import FeatureImageLeft2 from "@components/features/feature-image/FeatureImageLeft2";
import FeatureImageRight1 from "@components/features/feature-image/FeatureImageRight1";
import PageHeaderDefault from "@components/page-headers/PageHeaderDefault";
import Layout from "@layouts/LayoutDefault";

export default function FeatureImages() {
    return (
        <>
            <PageHeaderDefault pageTitle="Feature images" pageSubtitle="4 components" />
            <section className="position-relative">
                <div className="container-fluid pb-9 pb-lg-11 position-relative mt-n12">
                  <div className="bg-body rounded-4 py-5 shadow-lg">
                    <div className="container">
                    <p className="mb-4">Component: <code>&lt;FeatureImageLeft1/&gt;</code></p>
                   <FeatureImageLeft1/>
                   <p className="pt-9 pt-lg-11 mb-4">Component: <code>&lt;FeatureImageRight1/&gt;</code></p>
                   <FeatureImageRight1/>
                   <p className="pt-9 pt-lg-11 mb-4">Component: <code>&lt;FeatureImageLeft2/&gt;</code></p>
                   <FeatureImageLeft2/>
                   <p className="pt-9 pt-lg-11 mb-4">Component: <code>&lt;FeatureImageCollapses/&gt;</code></p>
                   <FeatureImageCollapses/>
                    </div>
                  </div>
                </div>
                
            </section>
        </>
    );
}
FeatureImages.getLayout = function getLayout(page) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}