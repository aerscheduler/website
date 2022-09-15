import { useRouter } from 'next/router'
import { useEffect } from 'react'
import NProgress from 'nprogress'
import Aos from 'aos'
import 'aos/dist/aos.css'
import '../styles/globals.scss'
export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    //dark mode
    var checkbox = document.getElementById("ChangeTheme");
    if (checkbox) {

      if (sessionStorage.getItem("mode") == "dark") {
        darkmode();
      } else {
        nodark();
      }
      checkbox.addEventListener("change", function () {
        if (checkbox.checked) {
          darkmode();
        } else {
          nodark();
        }
      });
      function darkmode() {
        document.body.classList.add("dark-mode");
        checkbox.checked = true;
        sessionStorage.setItem("mode", "dark");
      }
      function nodark() {
        document.body.classList.remove("dark-mode");
        checkbox.checked = false;
        sessionStorage.setItem("mode", "light");
      }
    }
    window.bootstrap = require('bootstrap/dist/js/bootstrap.bundle.js')
    const bsOffcanvas = new bootstrap.Offcanvas('#offcanvasNavbarDefault')
    Aos.init({
      once: true, duration: 700,offset:60,easing:"ease-in-out-cubic"
    })

    const handleStart = (url) => {
      NProgress.start()
      bsOffcanvas.hide()
    }
    const handleStop = () => {
      NProgress.done();
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleStop)
    router.events.on('routeChangeError', handleStop)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleStop)
      router.events.off('routeChangeError', handleStop)
    }
  }, [router])
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)
  return (
    getLayout(<Component {...pageProps} />)
  )
}