export const processImage1 = "/img/illustrations/3.svg";
export const processImage2 = "/img/illustrations/2.svg";
export const processImage3 = "/img/illustrations/1.svg";
import Image from "next/image";
export default function ProcessDefault() {
  return (
    <div className="row justify-content-around">
      <div className="col-md-4 col-xl-3 mb-6 mb-md-0">
        <div className="d-flex align-items-center justify-content-center flex-column">
          <div className="position-relative size-160 d-flex align-items-center justify-content-center">
            <div className="position-relative w-100 h-auto">
              <Image src={processImage1} width="228" height="183" alt="" layout="responsive" />
            </div>
          </div>
          <div className="pe-md-3 d-flex align-items-center justify-content-center flex-column">
            <h5 className="mb-3">
              Go to our <a href="/download">app</a>
            </h5>
            <p className="mb-0 text-muted text-center">
              If you are using iOS or Android, download AerScheduler from the app store. If you're using your web browser, go to the <a href="https://app.aerscheduler.com">web app</a>.
            </p>
          </div>
        </div>
      </div>
      <div className="col-md-4 col-xl-3 mb-6 mb-md-0">
        <div className="d-flex align-items-center justify-content-center flex-column">
          <div className="position-relative size-160 d-flex align-items-center justify-content-center">
            <div className="position-relative w-100 h-auto">
              <Image src={processImage2} width="239" height="181" alt="" layout="responsive" />
            </div>
          </div>
          <div className="pe-md-3 d-flex align-items-center justify-content-center flex-column">
            <h5 className="mb-3 text-center">Create an account and an organization</h5>
            <p className="mb-0 text-muted text-center">Create or join an organization. Invite people to join, add resources, and configure your organization's settings.</p>
          </div>
        </div>
      </div>
      <div className="col-md-4 col-xl-3">
        <div className="d-flex align-items-center justify-content-center flex-column">
          <div className="position-relative size-160 d-flex align-items-center justify-content-center">
            <div className="position-relative w-100 h-auto">
              <Image src={processImage3} width="262" height="180" alt="" layout="responsive" />
            </div>
          </div>
          <div className="pe-md-3 d-flex align-items-center justify-content-center flex-column">
            <h5 className="mb-3">Start runnning your organization</h5>
            <p className="mb-0 text-muted text-center">Create reservations, accept payments, set up maintenance, upload documents, .etc. </p>
          </div>
        </div>
      </div>
    </div>
  );
}
