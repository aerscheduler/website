import Image from "next/image";
export const brand1 = '/img/partners/fitbit-dark.svg'
export const brand2 = '/img/partners/capsule-dark.svg'
export const brand3 = '/img/partners/airbnb-dark.svg'
export const brand4 = '/img/partners/hubspot-dark.svg'
export const brand5 = '/img/partners/forbes-dark.svg'
export default function ClientsDefault() {
    return (
        <div className="d-flex flex-wrap justify-content-center align-items-center">
            <div className="width-120 h-auto my-2 mx-3 mx-xl-4">
                <Image src={brand1} layout="responsive" width="140" height="47" alt=""/>
            </div>
            <div className="width-120 h-auto my-2 mx-3 mx-xl-4">
                <Image src={brand2} layout="responsive" width="140" height="47" alt=""/>
            </div>
            <div className="width-120 h-auto my-2 mx-3 mx-xl-4">
                <Image src={brand3} layout="responsive" width="140" height="47" alt=""/>
            </div>
            <div className="width-120 h-auto my-2 mx-3 mx-xl-4">
                <Image src={brand4} layout="responsive" width="140" height="47" alt=""/>
            </div>
            <div className="width-120 h-auto my-2 mx-3 mx-xl-4">
                <Image src={brand5} layout="responsive" width="140" height="47" alt=""/>
            </div>
        </div>
    );
}