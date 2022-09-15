
import CtaBoxed from "@components/call-to-actions/CtaBoxed";
import PageHeaderDefault from "@components/page-headers/PageHeaderDefault";
import Layout from "@layouts/LayoutDefault";

export default function Buttons() {
    return (
        <>
            <PageHeaderDefault pageTitle="Buttons" pageSubtitle="Multi style buttons" />
            <section className="position-relative">
                <div className="container pb-9 pb-lg-11 position-relative mt-n12">
                    <div className="card card-body py-5 px-4 rounded-4 border-0 shadow-lg">
                        <p>Fill Buttons</p>
                        <div className="d-flex flex-wrap mb-5">
                            <button type="button" className="btn btn-primary m-1">Primary</button>
                            <button type="button" className="btn btn-success m-1">Success</button>
                            <button type="button" className="btn btn-warning m-1">Warning</button>
                            <button type="button" className="btn btn-danger m-1">Danger</button>
                            <button type="button" className="btn btn-info m-1">info</button>
                            <button type="button" className="btn btn-secondary m-1">secondary</button>
                            <button type="button" className="btn btn-light m-1">light</button>
                            <button type="button" className="btn btn-dark m-1">dark</button>
                        </div>
                        <p>Outline Buttons</p>
                        <div className="d-flex flex-wrap mb-5">
                            <button type="button" className="btn btn-outline-primary m-1">Primary</button>
                            <button type="button" className="btn btn-outline-success m-1">Success</button>
                            <button type="button" className="btn btn-outline-warning m-1">Warning</button>
                            <button type="button" className="btn btn-outline-danger m-1">Danger</button>
                            <button type="button" className="btn btn-outline-info m-1">info</button>
                            <button type="button" className="btn btn-outline-secondary m-1">secondary</button>
                            <button type="button" className="btn btn-outline-light m-1">light</button>
                            <button type="button" className="btn btn-outline-dark m-1">dark</button>
                        </div>
                        <p>Gradient Buttons</p>
                        <div className="d-flex flex-wrap mb-5">
                            <button type="button" className="btn btn-gradient-primary m-1">Primary</button>
                            <button type="button" className="btn btn-gradient-secondary m-1">Secondary</button>
                            <button type="button" className="btn btn-gradient-light text-primary m-1">Light</button>
                             </div>
                             <p>Icon Buttons</p>
                        <div className="mb-2 d-flex flex-wrap">
                            <button type="button" className="btn btn-primary m-1">
                                <span className="material-symbols-rounded fs-5 align-middle me-2">code</span>
                                Icon Left</button>
                                <button type="button" className="btn btn-primary m-1">
                                Icon Right <span className="material-symbols-rounded fs-5 align-middle ms-2">code</span>
                                </button><br></br>
                                
                             </div>
                             <div className="mb-5 align-items-center d-flex flex-wrap">
                             <button type="button" className="btn btn-primary m-1 p-0 rounded-pill size-40 d-flex align-items-center justify-content-center">
                                <span className="material-symbols-rounded fs-5 align-middle">code</span>
                                </button>
                                <button type="button" className="btn btn-warning m-1 p-0 rounded-pill size-60 d-flex align-items-center justify-content-center">
                                <span className="material-symbols-rounded fs-4 align-middle">delete</span>
                                </button>
                             </div>
                             <p>Sizing</p>
                        <div className="mb-5">
                            <button type="button" className="btn btn-primary btn-sm m-1">Small</button>
                            <button type="button" className="btn btn-primary m-1">Default</button>
                            <button type="button" className="btn btn-primary btn-lg m-1">Large Button</button>
                            <button type="button" className="btn btn-primary btn-lg d-block w-100">Block Button</button>
                             </div>
                             <p>Button Group</p>
                        <div className="mb-0">
                            <div className="btn-group" role="group">
                              <button type="button" className="btn btn-outline-primary">
                              <span className="material-symbols-rounded fs-5 me-1 align-middle">favorite</span>
                                Likes</button>
                              <button type="button" className="btn btn-outline-primary">
                              <span className="material-symbols-rounded fs-5 me-1 align-middle">forum</span>
                                Comments</button>
                              <button type="button" className="btn btn-outline-primary">
                              <span className="material-symbols-rounded fs-5 me-1 align-middle">ios_share</span>
                                Share</button>
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
Buttons.getLayout = function getLayout(page) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}