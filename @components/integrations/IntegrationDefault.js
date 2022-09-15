export const Slack = '/img/integrations/slack.svg';
export const Trello = '/img/integrations/trello.svg';
export const Mailchimp = '/img/integrations/mailchimp.svg';
export const Zoom = '/img/integrations/zoom.svg';
export const Evernote = '/img/integrations/evernote.svg';
export const Dropbox = '/img/integrations/dropbox.svg';
export const Gmail = '/img/integrations/gmail.svg';
import Image from 'next/image';
import Link from 'next/link';
export default function IntegrationDefault() {
    return (
        <div className="col-lg-12 mx-auto text-center">
            <h5 className='mb-4'>Integrations</h5>
        <h1 className="w-lg-75 mx-auto display-5 mb-5">
        Manage work on one platform
        </h1>
        <div className="row mb-5 justify-content-center">
            <div className='col-4 col-sm-auto mb-4'>
            <a href='#' className='d-block py-4 px-4 bg-style-1 hover-lift rounded-4 card border-0'>
                <div className='width-40 mx-auto h-auto'>
                    <Image layout='responsive' src={Slack} width="61" height="62" alt=""/>
                </div>
            </a>
            </div>
            <div className='col-4 col-sm-auto mb-4'>
            <a href='#' className='d-block py-4 px-4 bg-style-1 hover-lift rounded-4 card border-0'>
                <div className='width-40 mx-auto h-auto'>
                    <Image layout='responsive' src={Trello} width="61" height="61" alt=""/>
                </div>
            </a>
            </div>
            <div className='col-4 col-sm-auto mb-4'>
            <a href='#' className='d-block py-4 px-4 bg-style-1 hover-lift rounded-4 card border-0'>
                <div className='width-40 mx-auto h-auto'>
                    <Image layout='responsive' src={Mailchimp} width="61" height="61" alt=""/>
                </div>
            </a>
            </div>
            <div className='col-4 col-sm-auto mb-4'>
            <a href='#' className='d-block py-4 px-4 bg-style-1 hover-lift rounded-4 card border-0'>
                <div className='width-40 mx-auto h-auto'>
                    <Image layout='responsive' src={Dropbox} width="61" height="61" alt=""/>
                </div>
            </a>
            </div>
            <div className='col-4 col-sm-auto mb-4'>
            <a href='#' className='d-block py-4 px-4 bg-style-1 hover-lift rounded-4 card border-0'>
                <div className='width-40 mx-auto h-auto'>
                    <Image layout='responsive' src={Zoom} width="61" height="61" alt=""/>
                </div>
            </a>
            </div>
            <div className='col-4 col-sm-auto mb-4'>
            <a href='#' className='d-block py-4 px-4 bg-style-1 hover-lift rounded-4 card border-0'>
                <div className='width-40 mx-auto h-auto'>
                    <Image layout='responsive' src={Evernote} width="61" height="61" alt=""/>
                </div>
            </a>
            </div>
            <div className='col-4 col-sm-auto mb-4'>
            <a href='#' className='d-block py-4 px-4 bg-style-1 hover-lift rounded-4 card border-0'>
                <div className='width-40 mx-auto h-auto'>
                    <Image layout='responsive' src={Gmail} width="61" height="61" alt=""/>
                </div>
            </a>
            </div>
        </div>
        <div className='text-center'>
            <Link href="/integrations">
                <a>View all 50+ Integrations</a>
            </Link>
        </div>
        </div>
    );
}