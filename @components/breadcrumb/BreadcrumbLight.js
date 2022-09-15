import Link from "next/link";
export default function BreadcrumbLight({ breadcrumbActive }) {
    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-4">
                    <li className="breadcrumb-item"><Link href="/landings"><a className="page-link">Home</a></Link></li>
                    <li className="breadcrumb-item active" aria-current="page">{breadcrumbActive}</li>
                </ol>
            </nav>
        </>
    );
}