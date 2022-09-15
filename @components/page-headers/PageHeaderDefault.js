export default function PageHeaderDefault({ pageTitle, pageSubtitle }) {
    return (
        <section className="position-relative bg-blur overflow-hidden">
            {/**Page header shape background */}
            <svg className="position-absolute start-0 bottom-0 w-100 fill-body-bg" height="96" preserveAspectRatio="none" viewBox="0 0 1200 145" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M0 0L50 16.9167C100 33.8333 200 67.6667 300 77.3333C400 87 500 72.5 600 62.8333C700 53.1667 800 48.3333 900 55.5833C1000 62.8333 1100 82.1667 1150 91.8333L1200 101.5V145H1150C1100 145 1000 145 900 145C800 145 700 145 600 145C500 145 400 145 300 145C200 145 100 145 50 145H0V0Z" fill="currentColor" />
            </svg>
            <div className="container pt-11 pt-lg-15 pb-9">
                <div className="row pb-8 pb-lg-11">
                    <div className="col-lg-10 col-xl-8 mx-auto text-center">
                        <h1 className="display-4 mb-3">{pageTitle}</h1>
                        <p className="lead mb-4">{pageSubtitle}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}