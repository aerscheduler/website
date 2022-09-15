import BreadcrumbLight from "@components/breadcrumb/BreadcrumbLight";
import CtaDefault from "@components/call-to-actions/CtaDefault";
import IntegrationCard from "@components/integrations/IntegrationCard";
import PageHeaderDefault from "@components/page-headers/PageHeaderDefault";
import Layout from "@layouts/LayoutDefault";
export const appSlack = "/img/integrations/slack.svg";
export const appMailchimp = "/img/integrations/mailchimp.svg";
export const appTrello = "/img/integrations/trello.svg";
export const appZoom = "/img/integrations/zoom.svg";
export const appDropbox = "/img/integrations/dropbox.svg";
export const appGmail = "/img/integrations/gmail.svg";
export default function Integrations() {
  return (
    <>
      <PageHeaderDefault pageTitle="Integration made easy" breadcrumbActive="Integrations" />

      <div className="container pb-9 pb-lg-11 position-relative mt-n12">
        <div className="row mb-4">
          <div className="col-md-4 col-sm-6 mb-4">
            <IntegrationCard
              appLink="#"
              logoWidth="62"
              logoHeight="62"
              src={appTrello}
              appName="Google Calendar"
              appDescription="Keep everything in sync by connecting your google calendar to AerScheduler's scheduling system."
            />
          </div>
          <div className="col-md-4 col-sm-6 mb-4">
            <IntegrationCard
              appLink="#"
              logoWidth="62"
              logoHeight="62"
              src={appSlack}
              appName="Stripe"
              appDescription="Coming Soon. Connect your card or bank account for automatic billing and reporting."
            />
          </div>
          <div className="col-md-4 col-sm-6 mb-4">
            <IntegrationCard
              appLink="#"
              logoWidth="62"
              logoHeight="62"
              src={appZoom}
              appName="Canvas"
              appDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec efficitur turpis, vitae dictum dolor tristique in."
            />
          </div>
        </div>
        {/* <div className="text-center">
          <button type="button" className="btn btn-primary hover-lift">
            Lead More Apps
            <span className="material-symbols-rounded align-middle fs-5 ms-2">more_horiz</span>
          </button>
        </div> */}
      </div>

      <section className="position-relative bg-style-1">
        <div className="container py-9 py-lg-11">
          <CtaDefault link="Get started today" heading="Get started today" subheading="Join over 25000+ customers worldwide" />
        </div>
      </section>
    </>
  );
}
Integrations.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
