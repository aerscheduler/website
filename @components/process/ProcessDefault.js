export const processImage1 = "/img/illustrations/3.svg";
export const processImage2 = "/img/illustrations/2.svg";
export const processImage3 = "/img/illustrations/1.svg";
import Image from "next/image";
export default function ProcessDefault() {
  return (
    <div className="row justify-content-around">
      <div className="col-md-4 col-xl-3 mb-6 mb-md-0">
        <div>
          <div className="position-relative size-160 d-flex align-items-center justify-content-center">
            <div className="position-relative w-100 h-auto">
              <Image src={processImage1} width="228" height="183" alt="" layout="responsive" />
            </div>
          </div>
          <div className="pe-md-3">
            <h5 className="mb-3">Download our mobile app</h5>
            <p className="mb-0 text-muted">Our web app is coming soon. For now, you can download our app for Android or iOS</p>
          </div>
        </div>
      </div>
      <div className="col-md-4 col-xl-3 mb-6 mb-md-0">
        <div className="position-relative size-160 d-flex align-items-center justify-content-center">
          <div className="position-relative w-100 h-auto">
            <Image src={processImage2} width="239" height="181" alt="" layout="responsive" />
          </div>
        </div>
        <div className="pe-md-3">
          <h5 className="mb-3">Create an account</h5>
          <p className="mb-0 text-muted">Once you're logged in, you can create or join an organization. You can be a member of multiple.</p>
        </div>
      </div>
      <div className="col-md-4 col-xl-3">
        <div className="position-relative size-160 d-flex align-items-center justify-content-center">
          <div className="position-relative w-100 h-auto">
            <Image src={processImage3} width="262" height="180" alt="" layout="responsive" />
          </div>
        </div>
        <div className="pe-md-3">
          <h5 className="mb-3">Start scheduling</h5>
          <p className="mb-0 text-muted">Invite personnel, add resources, set up your organization's settings, and start scheduling.</p>
        </div>
      </div>
    </div>
  );
}
