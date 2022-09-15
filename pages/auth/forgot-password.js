import FormForgotPassword from "@components/forms/ForgotPassword";
import Layout from "@layouts/LayoutDefault";
import Head from "next/head";


export default function AuthForgotPass() {
    return (
        <>
         <Head>
        <title>AerScheduler | Forgot Password</title>
      </Head>
        <div className="container pt-12 pt-lg-15 pb-9 pb-lg-11">
        <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6 col-xl-5">
                <h2 className="display-6">Recover password!</h2>
                <p className="text-muted mb-4">Enter registered email address</p>
                <FormForgotPassword/>
            </div>
        </div>
    </div>
        </>
    );
}
AuthForgotPass.getLayout = function getLayout(page) {
    return (
      <Layout>
        {page}
      </Layout>
    )
  }