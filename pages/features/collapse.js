
import CtaBoxed from "@components/call-to-actions/CtaBoxed";
import CollapseDefault from "@components/collapse/CollapseDefault";
import CollapseText from "@components/collapse/CollapseText";
import PageHeaderDefault from "@components/page-headers/PageHeaderDefault";
import Layout from "@layouts/LayoutDefault";

export default function Collapse() {
    return (
        <>
            <PageHeaderDefault pageTitle="Collapse" pageSubtitle="Collapse accordions" />
            <section className="position-relative">
                <div className="container pb-9 pb-lg-11 position-relative mt-n12">
                    <div className="card py-5 px-4 border-0 shadow-lg">
                        <p>Component: <code>&lt;CollapseDefault/&gt;</code></p>
                        <CollapseDefault/>
                    </div>
                </div>
            </section>
            <section className="position-relative">
                <div className="container pb-9 pb-lg-11 position-relative">
                    <div className="card py-5 px-4 border-0 shadow-lg">
                        <p>Component: <code>&lt;CollapseText/&gt;</code></p>
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                        <CollapseText id="readmore1" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."/>
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
Collapse.getLayout = function getLayout(page) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}