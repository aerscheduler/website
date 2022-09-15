import 'material-symbols'
export default function FaqsDefault({faq}) {
    return (
        <div className="col-md-4 mb-6" data-aos="fade-up">
                <div className='d-flex mb-3 align-items-start'>
                    <span className="material-symbols-rounded me-2 align-middle text-primary">
                        contact_support
                    </span>
                    <span className='h5 flex-grow-1 mb-0'>{faq.question}</span>
                </div>
                <p className="mb-0 pe-lg-4">
                   {faq.answer}
                </p>
            </div>
    );
}