import Image from "next/image";

export default function TestimonialTiny({text,avatar,name,className}) {
    return (
        <div className={className || "d-flex align-items-stretch"}>
            <div className="flex-shrink-0 size-40 me-2 rounded-circle">
               <Image src={avatar || "/img/avatars/male/1.jpg"} width="128" height="128" layout="responsive" className="rounded-circle" alt={avatar}/>
            </div>
            <div className="flex-grow-1 overflow-hidden">
                <h6 className="mb-1 text-reset">{name || "Adam Milne"}</h6>
            <p className="mb-0 small lh-sm">{text || "Testimonials Comment"}</p>
            </div>
        </div>
    );
}