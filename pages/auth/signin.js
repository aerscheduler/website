import FormSignIn from "@components/forms/SignIn";
import Layout from "@layouts/LayoutDefault";
import Head from "next/head";
import Link from "next/link";

export default function AuthSignIn() {
    return (
        <>
         <Head>
        <title>AerScheduler | SignIn</title>
      </Head>
        <div className="container pt-12 pt-lg-15 pb-9 pb-lg-11">
        <div className="row justify-content-center">
            <div className="col-md-6 col-lg-5 col-xl-4">
                <h2 className="display-6">Welcome Back!</h2>
                <p className="text-muted mb-4">Fill the details to continue...</p>
                <FormSignIn/>
                <p className="text-muted small mb-0">
                    <small>Don&apos;t have an account yet? </small><span className="vr mx-2 align-middle"></span>
                    <Link href="/auth/signup">
                        <a className="text-decoration-underline">Create One</a>
                    </Link>
                </p>
            </div>
        </div>
    </div>
    </>
    );
}
AuthSignIn.getLayout = function getLayout(page) {
    return (
      <Layout>
        {page}
      </Layout>
    )
  }