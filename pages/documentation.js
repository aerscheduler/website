import Head from 'next/head'
import 'material-symbols'
import Link from 'next/link'
import Layout from '@layouts/LayoutDefault'
export default function Home() {
    return (
        <>
            <Head>
                <title>AerScheduler | Docs</title>
            </Head>
            <section className='position-relative bg-gradient-light'>
                <div className='container pt-11 pt-lg-15 pb-9 pb-lg-11'>
                    <div className='row'>
                        <div className='col-md-10 col-lg-9 mx-auto'>
                            <h2 className='text-center display-5 mb-4 text-center'>
                                AerScheduler Docs
                            </h2>

                            <ul className='list-group'>
                                <li className='list-group-item p-4'>
                                    <h5>Introduction:</h5>
                                    <p className='mb-0'>
                                        Welcome to AerScheduler landing page. This is a NextJs based minimal landing page specially built for saas web apps landing purpose.
                                    </p>
                                </li>
                                <li className='list-group-item p-4'>
                                    <h5>Prerequisites:</h5>
                                    <p className='mb-0'>
                                        Make sure you are familiar with the following technologies before purchasing AerScheduler React / Next.js (Bootstrap 5) Template:
                                    </p>
                                    <ol className='list-unstyled mb-4'>
                                        <li className="mb-1">React (required)</li>
                                        <li className="mb-1">Next.js (required)</li>
                                        <li className="mb-1">Bootstrap 5 (required)</li>
                                        <li className="mb-1">Sass / Scss (highly recommended). It&apos;s much easier to customize a template using Scss variables then find and replace codde in vanilla CSS.</li>
                                        <li>Npm (optional)*. Npm is a package manager for Node. With Npm can manage (install, update, delete) your project dependencies much easier.</li>
                                    </ol>
                                    <p className='mb-0'>* All the configuration files like <code>package.json</code>, <code>next.config.js</code> and <code>jsconfig.json</code> are included in the download package.</p>

                                </li>
                                <li className='list-group-item p-4'>
                                    <h5>Project setup:</h5>
                                    <ol><li className="mb-1">Install Node.js and Npm (Node Package Manager)
                                        <a href="https://nodejs.org/en/" target="_blank" rel="noreferrer">https://nodejs.org/en/</a></li>
                                        <li>Run <kbd>npm install</kbd> in your terminal to install all project dependencies</li>
                                        <li>After you have installed Node.js and Npm, run the development server: <kbd>npm run dev</kbd>.<br />To create production build run <kbd>npm run build</kbd></li>
                                        <li>Open <code>http://localhost:3000</code> with your browser to see the result.</li>
                                        <li>You can start editing the page by modifying <code>pages/index.js</code> or any other file inside <code>pages</code> directory. The page auto-updates as you edit the file.</li>
                                    </ol>
                                </li>
                                <li className='list-group-item p-4'>
                                    <h5>Structure:</h5>
                                    <ul>
                                        <li>📁 <strong>AerScheduler_react_nextjs_landing_page_v1.2/</strong>
                                            <ul>
                                                <li className='mb-2'>Folder contains all template source files.</li>
                                                <li className='mb-2'>📂 <span className='fw-semibold'>@components</span>
                                                    <ul className='list-unstyled ps-4 pt-1'>
                                                        <li>Folder contains all components like clients, call to actions, testimonials, feature image, feature icon card, pricing tables etc..</li>
                                                    </ul>
                                                </li>
                                                <li className='mb-2'>📂 <span className='fw-semibold'>@layouts</span>
                                                    <ul className='list-unstyled ps-4 pt-1'>
                                                        <li>Folder contains layout partials for headers and footers</li>
                                                    </ul>
                                                </li>
                                                <li className='mb-2'>📂 <span className='fw-semibold'>@lib</span>
                                                    <ul className='list-unstyled ps-4 pt-1'>
                                                        <li>Folder contains customer stories, faqs API, blog post api call js file, select box colors js files and markdown, get image for post js file</li>
                                                    </ul>
                                                </li>
                                                <li className='mb-2'>📂 <span className='fw-semibold'>pages</span>
                                                    <ul className='list-unstyled ps-4 pt-1'>
                                                        <li>Folder contains all the pages and documentation</li>
                                                    </ul>
                                                </li>
                                                <li className='mb-2'>📂 <span className='fw-semibold'>public</span>
                                                    <ul className='list-unstyled ps-4 pt-1'>
                                                        <li>Folder contains static files like images, favicon etc...</li>
                                                    </ul>
                                                </li>
                                                <li className='mb-2'>📂 <span className='fw-semibold'>styles</span>
                                                    <ul className='list-unstyled ps-4 pt-1'>
                                                        <li>Folder contains saas(.scss) files</li>
                                                    </ul>
                                                </li>
                                                <li className='mb-2'>📂 <span className='fw-semibold'>_posts</span>
                                                    <ul className='list-unstyled ps-4 pt-1'>
                                                        <li>Folder contains Blog post markdown files</li>
                                                    </ul>
                                                </li>
                                                <li className='mb-2'>📰 <span className='fw-semibold'>Changelog.md</span>
                                                    <ul className='list-unstyled ps-4 pt-1'>
                                                        <li>
                                                        File contains updates history
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li className='mb-2'>📰 <span className='fw-semibold'>README.md</span>
                                                    <ul className='list-unstyled ps-4 pt-1'>
                                                        <li>
                                                        File contains basic how it works details
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li className='mb-2'>📰 <span className='fw-semibold'>jsconfig.json</span>
                                                    <ul className='list-unstyled ps-4 pt-1'>
                                                        <li>
                                                        File contains compilerOptions and base url paths
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li className='mb-2'>📰 <span className='fw-semibold'>package.json</span>
                                                    <ul className='list-unstyled ps-4 pt-1'>
                                                        <li>
                                                        File contains meta data about your app. Most importantly, it includes the list of dependencies to install from <code>npm</code> when running <kbd>npm install</kbd>; scripts to rund the project in dev mode <kbd>npm run dev</kbd> or production build <kbd>npm run build</kbd>.
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li className='mb-2'>📰 <span className='fw-semibold'>next.config.js</span>
                                                    <ul className='list-unstyled ps-4 pt-1'>
                                                        <li>
                                                        For custom advanced configuration of Next.js, you can use a <code>next.config.js</code> file. <a href="https://nextjs.org/docs/api-reference/next.config.js/introduction" className="fw-bold fs-sm" target="_blank" rel="noreferrer">Read more here.</a>
                                                        </li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </li>

                                    </ul>
                                </li>
                                <li className='list-group-item p-4'>
                                    Feel free to send me an email for any help - <a href="mailto:mylifedesign143@gmail.com">mylifedesign143@gmail.com</a>
                                </li>
                            </ul>
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