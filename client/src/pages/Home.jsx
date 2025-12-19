import Navbar from '../components/Navbar/Navbar'
import Hero from '../components/Hero'
import JobListing from '../components/JobListing'
import AppDownload from '../components/AppDownload'
import FAQ from '../components/FAQ'
import Footer from '../components/Footer/Footer'

function Home() {
    return (
       <div>
        <Navbar/>
        <Hero/>
        <JobListing/>
        <AppDownload/>
        <FAQ/>
        <Footer/>
       </div> 
    )
}

export default Home