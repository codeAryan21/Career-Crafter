import Navbar from '../components/Navbar/Navbar'
import Hero from '../components/Hero'
import JobListing from '../components/JobListing'
import AppDownload from '../components/AppDownload'
import Footer from '../components/Footer/Footer'

function Home() {
    return (
       <div>
        <Navbar/>
        <Hero/>
        <JobListing/>
        <AppDownload/>
        <Footer/>
       </div> 
    )
}

export default Home