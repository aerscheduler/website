import DownloadCard from "@components/downloads/DownloadCard";
import PageHeaderDefault from "@components/page-headers/PageHeaderDefault";
import Layout from "@layouts/LayoutDefault";
export const appStoreBadge = "/img/app_store_badges/app-store-badge.svg";
export const playStoreBadge = "/img/app_store_badges/google-play-badge.png";

export default function Download() {
  return (
    <>
      <PageHeaderDefault pageTitle="Download AerScheduler for Free" breadcrumbActive="Download" />

      <div className="container pb-9 pb-lg-11 position-relative mt-n12">
        <div className="row mb-4">
          <div className="col-md-4 col-sm-6 mb-4">
            <DownloadCard
              appLink="https://app.aerscheduler.com"
              logoWidth="40"
              logoHeight="20"
              appName="Desktop Browser Support"
              appLinkLabel="Try now"
              appDescription="Use AerScheduler on your computer"
            />
          </div>
          <div className="col-md-4 col-sm-6 mb-4">
            <DownloadCard
              appLink="https://apps.apple.com/us/app/aerscheduler/id6444074155"
              logoWidth="40"
              logoHeight="20"
              // src={appStoreBadge}
              appName="iOS Support"
              appLinkLabel="Download"
              appDescription="Download for your iPhone or iPad"
            />
          </div>
          <div className="col-md-4 col-sm-6 mb-4">
            <DownloadCard
              appLink="https://play.google.com/store/apps/details?id=com.aerscheduler.app&hl=en_US&gl=US"
              logoWidth="40"
              logoHeight="20"
              // src={playStoreBadge}
              appName="Android Support"
              appLinkLabel="Download"
              appDescription="Download for your android phone or tablet"
            />
          </div>
        </div>
      </div>
    </>
  );
}
Download.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
