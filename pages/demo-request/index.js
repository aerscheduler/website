import DividerBottom2 from "@components/dividers/DividerBottom2";
import FormDemoRequest from "@components/forms/DemoRequest";
import Layout from "@layouts/LayoutDefault";

export default function DemoRequest() {
    return (
        <section className="position-relative pt-12 pt-lg-15 pb-9">
            <svg className="position-absolute start-0 bottom-0 text-dark h-auto d-none d-md-block" fill="currentColor" width="100%" height="276" viewBox="0 0 1200 276" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M0 132L50 102C100 72 200 12 300 18C400 24 500 96 600 90C700 84 800 0 900 0C1000 0 1100 84 1150 126L1200 168V276H1150C1100 276 1000 276 900 276C800 276 700 276 600 276C500 276 400 276 300 276C200 276 100 276 50 276H0V132Z" />
            </svg>

            <div className="container position-relative">
                <div className="row">
                    <div className="col-lg-6 col-md-8 mx-auto">
                        <h2 className="display-5 text-center">See AerScheduler in Action</h2>
                        <p className="text-center mb-5">Schedule a 30-minute product demo with expert Q&A.</p>
                        <div className="card border-0 rounded-4 shadow-lg py-5 px-4">
                            <FormDemoRequest />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

DemoRequest.getLayout = function getLayout(page) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}