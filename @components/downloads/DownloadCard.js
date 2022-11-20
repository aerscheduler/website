import Image from "next/image";
import Link from "next/link";

export default function DownloadCard({ src, logoWidth, logoHeight, appDescription, appName, appLink, appLinkLabel }) {
  return (
    <Link href={appLink}>
      <a className="card card-body p-4 border-0 shadow hover-lift">
        <div className="mb-4">
          <Image src={src} alt="" width={logoWidth} height={logoHeight} layout="responsive" />
        </div>
        <h4 className="mb-3">{appName}</h4>
        <p className="mb-4">{appDescription}</p>
        <div>
          <a className="btn btn-light btn-sm">
            <span className="material-symbols-rounded align-middle fs-5 me-2">arrow_forward</span>
            {appLinkLabel}
          </a>
        </div>
      </a>
    </Link>
  );
}
