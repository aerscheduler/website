import Image from "next/image";
import Link from "next/link";

export default function IntegrationCard({src,logoWidth,logoHeight,appDescription, appName,appLink}) {
    return (
        <div className="card card-body p-4 border-0 shadow hover-lift">
            <div className="size-60 mb-4">
            <Image src={src} alt="" width={logoWidth} height={logoHeight} layout="responsive"/>
            </div>
            <h4 className="mb-3">{appName}</h4>
            <p className="mb-4">{appDescription}</p>
            <div>
            <Link href={appLink}><a className="btn btn-light btn-sm">
                <span className="material-symbols-rounded align-middle fs-5 me-2">arrow_forward</span>
               Integrate with {appName} </a></Link>
            </div>
        </div>
    );
}