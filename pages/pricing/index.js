import CtaDefault from "@components/call-to-actions/CtaDefault";
import FaqsDefault from "@components/faqs/FaqsDefault";
import PageHeaderDefault from "@components/page-headers/PageHeaderDefault";
import PricingDefault from "@components/pricing-tables/PricingDefault";
import Layout from "@layouts/LayoutDefault";
import Head from "next/head";
import Link from "next/link";
import useSWR from "swr";
export default function PagePricing() {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR("/api/faqs", fetcher);

  if (error) return <div>Some went wrong with faqs data!</div>;
  if (!data) return <div className="vh-50 d-flex align-items-center justify-content-center">loading...</div>;

  return (
    <>
      <Head>
        <title>AerScheduler | Pricing</title>
      </Head>
      <PageHeaderDefault pageTitle="Free scheduling for your aviation program" breadcrumbActive="pricing" />
      <section className="position-relative border-bottom">
        <div className="container pb-9 pb-lg-11 position-relative mt-n12">
          <PricingDefault />
        </div>
      </section>
      <section className="position-relative">
        <div className="container py-9 py-lg-11 position-relative">
          <div className="row mb-6 mb-lg-9">
            <div className="col-lg-8 mx-auto text-center col-md-10">
              <h2 className="display-5 fw-bolder" data-aos="fade-up">
                Frequently asked questions
              </h2>
            </div>
          </div>

          <div className="row">
            {data.map((faq) => (
              <FaqsDefault faq={faq} key={faq.id} />
            ))}
          </div>
          <div className="text-center pt-5" data-aos="fade-up" data-aos-delay="100">
            <p className="mb-0">
              Didn&apos;t get your answer? Feel free to contact support at <a href="mailto:support@aerscheduler.com">support@aerscheduler.com</a>
            </p>
          </div>
        </div>
      </section>

      <section className="position-relative bg-style-1">
        <div className="container py-9 py-lg-11">
          <CtaDefault link="Contact support" action="mailto:support@aerscheduler.com" heading="Have other questions?" subheading="Feel free to reach our support team." />
        </div>
      </section>
    </>
  );
}
PagePricing.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
