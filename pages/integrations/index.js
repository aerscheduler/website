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
export const appGoogleCalendar = "/img/integrations/google-calendar.svg";
export const appStripe = "/img/integrations/stripe.svg";
export const appCanvas = "/img/integrations/canvas.svg";

export default function Integrations() {
  return (
    <>
      <PageHeaderDefault pageTitle="Integration made easy" breadcrumbActive="Integrations" />

      <div className="container pb-9 pb-lg-11 position-relative mt-n12">
        <div className="row mb-4">
          <div className="col-md-4 col-sm-6 mb-4">
            <IntegrationCard
              appLink="https://app.aerscheduler.com/#/settings"
              logoWidth="62"
              logoHeight="62"
              src={appGoogleCalendar}
              appName="Google Calendar"
              appDescription="Keep everything in sync by connecting your google calendar to AerScheduler's scheduling system."
            />
          </div>
          <div className="col-md-4 col-sm-6 mb-4">
            <IntegrationCard
              appLink="https://app.aerscheduler.com/#/organization-settings/billing"
              logoWidth="62"
              logoHeight="62"
              src={appStripe}
              appName="Stripe"
              appDescription="Create invoices and collect payments with Stripe. Automatically send invoices to your customers."
            />
          </div>
          {/* <div className="col-md-4 col-sm-6 mb-4">
            <IntegrationCard
              appLink="https://www.instructure.com/canvas"
              logoWidth="62"
              logoHeight="62"
              src={appCanvas}
              appName="Canvas"
              appDescription="Coming Soon. Intergate with your canvas account as a student. Automatically pull in course information from canvas."
            />
          </div> */}
        </div>
      </div>

      <section className="position-relative bg-style-1">
        <div className="container py-9 py-lg-11">
          <CtaDefault link="Create an account" action={"https://app.aerscheduler.com"} heading="Get started today" subheading="Download from the App Store or the Play Store." />
        </div>
      </section>
    </>
  );
}
Integrations.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
