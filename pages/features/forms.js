
import CtaBoxed from "@components/call-to-actions/CtaBoxed";
import FormDemoRequest from "@components/forms/DemoRequest";
import FormForgotPassword from "@components/forms/ForgotPassword";
import FormSignIn from "@components/forms/SignIn";
import FormSignUp from "@components/forms/SignUp";
import PageHeaderDefault from "@components/page-headers/PageHeaderDefault";
import Layout from "@layouts/LayoutDefault";

export default function Forms() {
    return (
        <>
            <PageHeaderDefault pageTitle="Forms" pageSubtitle="Form layouts" />
            <section className="position-relative">
                <div className="container pb-9 pb-lg-11 position-relative mt-n12">
                    <div className="row">
                        <div className="col-xl-7 col-lg-8 col-md-10 mx-auto">
                        <p>Component: <code>&lt;FormDemoRequest/&gt;</code></p>
                    <div className="card mb-5 py-5 px-4 border-0 shadow-lg rounded-4">
                        <FormDemoRequest/>
                    </div>
                    <p>Component: <code>&lt;FormSignIn/&gt;</code></p>
                    <div className="card mb-5 py-5 px-4 border-0 shadow-lg rounded-4">
                        <FormSignIn/>
                    </div>
                    <p>Component: <code>&lt;FormSignUp/&gt;</code></p>
                    <div className="card mb-5 py-5 px-4 border-0 shadow-lg rounded-4">
                        <FormSignUp/>
                    </div>
                    <p>Component: <code>&lt;FormForgotPassword/&gt;</code></p>
                    <div className="card mb-5 py-5 px-4 border-0 shadow-lg rounded-4">
                        <FormForgotPassword/>
                    </div>
                    <p>Other Form Components</p>
                    <div className="card py-5 px-4 border-0 shadow-lg rounded-4">
                       <div className="form-check mb-2">
                        <input type="checkbox" className="form-check-input" id="check1"/>
                        <label htmlFor="check1" className="form-check-label">Checkbox</label>
                       </div>
                       <div className="form-check mb-4">
                        <input type="checkbox" className="form-check-input" id="checkDisabled1" disabled/>
                        <label htmlFor="checkDisabled1" className="form-check-label">Checkbox Disabled</label>
                       </div>
                       <div className="form-check mb-2">
                        <input type="radio" className="form-check-input" id="radio1"/>
                        <label htmlFor="radio1" className="form-check-label">Radio</label>
                       </div>
                       <div className="form-check mb-4">
                        <input type="radio" className="form-check-input" id="radioDisabled1" disabled/>
                        <label htmlFor="radioDisabled1" className="form-check-label">Radio Disabled</label>
                       </div>
                       <div className="form-check form-switch mb-2">
                        <input type="checkbox" className="form-check-input" id="switch1"/>
                        <label htmlFor="switch1" className="form-check-label">Switch</label>
                       </div>
                       <div className="form-check form-switch">
                        <input type="checkbox" className="form-check-input" disabled id="switchDisabled1"/>
                        <label htmlFor="switchDisabled1" className="form-check-label">Switch Disabled</label>
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
Forms.getLayout = function getLayout(page) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}