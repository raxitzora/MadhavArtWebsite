import HeroComp from "../../components/HomePageComponents/HeroComp"
import WhatWeDoComp from "../../components/HomePageComponents/WhatWeDoComp"
import WhyMadhavArtComp from "../../components/HomePageComponents/WhyMadhavArtComp"
import OurWorkComp from "../../components/HomePageComponents/OurWorkComp"
import Footer from "../../components/common/Footer"
const HomePage = () => {
  return (
    <main>
      <HeroComp />
      <WhyMadhavArtComp />
      <WhatWeDoComp />
      <OurWorkComp />
      <Footer />


    </main>
  )
}

export default HomePage