import Head from 'next/head'
import 'material-symbols'
import Link from 'next/link'
import Layout from '@layouts/LayoutDefault'
import Image from 'next/image'
import FeatureIconTiny from '@components/features/feature-icons/FeatureIconTiny'
export const Demo1 = '/img/shots/demo1.png'
export const Demo2 = '/img/shots/demo2.png'
export const Demo3 = '/img/shots/demo3.png'
export default function Home() {
  return (
    <>
      <Head>
        <title>AerScheduler | Welcome</title>
      </Head>
      <section className='position-relative'>
        <div className='container pt-12 pt-lg-15 pb-9 text-center'>
          <div className='row mb-7 mb-lg-9'>
            <div className='col-md-10 col-lg-9 mx-auto text-center'>
              <h5 className='mb-4'>Light & Dark Modes</h5>
              <h2 className='text-center text-capitalize display-4 mb-0'>
                Landing page template based on NextJs and Bootstrap5
              </h2>
            </div>
          </div>
          <h5 className='text-center mb-4 text-muted'>Choose a demo</h5>
          <div className='row mb-7 mb-lg-9 align-items-center justify-content-center'>
            <div className='col-md-4 mb-5 mb-md-0'>
              <Link href="/landings">
                <a className='d-block shadow hover-lift overflow-hidden rounded-2 mb-4'>
                  <Image priority layout='responsive' src={Demo1} width="768" height="600" alt="" />
                </a>
              </Link>
              <h5 className='mb-0'>Default</h5>
            </div>
            <div className='col-md-4 mb-6 mb-md-0'>
              <Link href="/landings/index-signup">
                <a className='d-block shadow hover-lift overflow-hidden rounded-2 mb-4'>
                  <Image priority layout='responsive' src={Demo2} width="768" height="600" alt="" />
                </a>
              </Link>
              <h5 className='mb-0'>SignUp</h5>
            </div>
            <div className='col-md-4'>
              <Link href="/landings/index-decorative">
                <a className='d-block shadow hover-lift overflow-hidden rounded-2 mb-4'>
                  <Image priority layout='responsive' src={Demo3} width="768" height="600" alt="" />
                </a>
              </Link>
              <h5 className='mb-0'>Decorative</h5>
            </div>
          </div>
          <div className="d-flex pt-7 pt-lg-9 flex-wrap align-items-center justify-content-center">
            <div className="ps-3 pe-4 me-2 mb-2 py-2 bg-style-1 rounded-pill">
              <FeatureIconTiny icon={
                <span className="material-symbols-rounded align-middle fs-3">
                  check
                </span>
              } color="primary" text="35+ Flexible Components" />
            </div>
            <div className="ps-3 pe-4 me-2 mb-2 py-2 bg-style-1 rounded-pill">
              <FeatureIconTiny icon={
                <span className="material-symbols-rounded align-middle fs-3">
                  check
                </span>
              } color="primary" text="Modern & Trendy Designs" />
            </div>
            <div className="ps-3 pe-4 me-2 mb-2 py-2 bg-style-1 rounded-pill">
              <FeatureIconTiny icon={
                <span className="material-symbols-rounded align-middle fs-3">
                  check
                </span>
              } color="primary" text="Bootstrap 5.2 and Next" />
            </div>
            <div className="ps-3 pe-4 me-2 mb-2 py-2 bg-style-1 rounded-pill">
              <FeatureIconTiny icon={
                <span className="material-symbols-rounded align-middle fs-3">
                  check
                </span>
              } color="primary" text="Clean & Well Coded" />
            </div>
            <div className="ps-3 pe-4 me-2 mb-2 py-2 bg-style-1 rounded-pill">
              <FeatureIconTiny icon={
                <span className="material-symbols-rounded align-middle fs-3">
                  check
                </span>
              } color="primary" text="Free Regular Updates" />
            </div>
            <div className="ps-3 pe-4 me-2 mb-2 py-2 bg-style-1 rounded-pill">
              <FeatureIconTiny icon={
                <span className="material-symbols-rounded align-middle fs-3">
                  check
                </span>
              } color="primary" text="Free and Instant Support" />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
Home.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}