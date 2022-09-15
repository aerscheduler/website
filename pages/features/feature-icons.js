import CtaBoxed from "@components/call-to-actions/CtaBoxed";
import FeatureIconDefault from "@components/features/feature-icons/FeatureIconDefault";
import FeatureIconLeft from "@components/features/feature-icons/FeatureIconLeft";
import FeatureIconTiny from "@components/features/feature-icons/FeatureIconTiny";
import FeatureIconVertical from "@components/features/feature-icons/FeatureIconVertical";
import FeatureIconWithTitle from "@components/features/feature-icons/FeatureIconWithTitle";
import PageHeaderDefault from "@components/page-headers/PageHeaderDefault";
import Layout from "@layouts/LayoutDefault";
export default function FeatureIcons() {
    return (
        <>
            <PageHeaderDefault pageTitle="Feature icon cards" pageSubtitle="5 Components" />
            <section className="position-relative">
                <div className="container pb-9 pb-lg-11 position-relative mt-n12">
                    <div className="row flex-column align-items-center">
                        <div className="col-md-10 col-lg-8 col-xl-7">
                            <p className="mb-4 text-muted">Component: <code>&lt;FeatureIconDefault/&gt;</code></p>
                            {/*<!--Demo Card-->*/}
                            <div className="card px-4 py-5 border-0 shadow-lg mb-6 mb-lg-9">
                                <div className="card-body p-0">
                                    {/*<!--Demo-->*/}
                                    <div className='p-sm-4' data-aos="fade-up">
                                        <FeatureIconDefault icon={
                                            <span className="material-symbols-rounded align-middle fs-1">
                                                smart_toy
                                            </span>
                                        } color="success" title="Automation" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor labore et dolore magna aliqua." />
                                    </div>
                                </div>
                            </div>
                            {/*<!--Demo Card-->*/}
                            <p className="mb-4 text-muted">Component: <code>&lt;FeatureIconLeft/&gt;</code></p>
                            <div className="card px-4 py-5 border-0 shadow-lg mb-6 mb-lg-9">
                                <div className="card-body p-0">
                                    {/*<!--Demo-->*/}
                                    <div className='p-sm-4' data-aos="fade-up">
                                        <FeatureIconLeft icon={
                                            <span className="material-symbols-rounded align-middle fs-1">
                                                contact_support
                                            </span>
                                        } color="primary" title="24/7 Suupport" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " />
                                    </div>
                                </div>
                            </div>
                            {/*<!--Demo Card-->*/}
                            <p className="mb-4 text-muted">Component: <code>&lt;FeatureIconVertical/&gt;</code></p>
                            <div className="card px-4 py-5 border-0 shadow-lg mb-6 mb-lg-9">
                                <div className="card-body p-0">
                                    {/*<!--Demo-->*/}
                                    <div className='p-sm-4' data-aos="fade-up">
                                        <FeatureIconVertical icon={<span className="material-symbols-rounded fs-2 align-middle">commit </span>}
                                            color="success" title="Unparalleled track record" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." />
                                    </div>
                                </div>
                            </div>
                            {/*<!--Demo Card-->*/}
                            <p className="mb-4 text-muted">Component: <code>&lt;FeatureIconWithTitle/&gt;</code></p>
                            <div className="card px-4 py-5 border-0 shadow-lg rounded-4 mb-6 mb-lg-9">
                                <div className="card-body p-0">
                                    {/*<!--Demo-->*/}
                                    <div className='p-sm-4' data-aos="fade-up">
                                        <FeatureIconWithTitle icon={
                                            <span className="material-symbols-rounded align-middle fs-4">
                                                insights
                                            </span>
                                        } color="primary" title="Analytics" description="Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " />
                                    </div>
                                </div>
                            </div>
                            {/*<!--Demo Card-->*/}
                            <p className="mb-4 text-muted">Component: <code>&lt;FeatureIconTiny/&gt;</code> <span className="badge bg-primary rounded-pill ms-3">New</span></p>
                            <div className="card px-4 py-5 border-0 shadow-lg rounded-4 mb-0">
                                <div className="card-body p-0">
                                    {/*<!--Demo-->*/}
                                    <div className='p-sm-4' data-aos="fade-up">
                                        <FeatureIconTiny icon={
                                            <span className="material-symbols-rounded align-middle fs-3">
                                                workspaces
                                            </span>
                                        } color="warning" text="Easy scheduling" />
                                        <br></br>
                                        <div className="width-260 rounded-pill px-3 py-2 shadow">
                                        <FeatureIconTiny icon={
                                            <span className="material-symbols-rounded align-middle fs-4">
                                                task
                                            </span>
                                        } color="success" text="Task management" />
                                        </div>
                                    </div>
                                </div>
                            </div>
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
FeatureIcons.getLayout = function getLayout(page) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}