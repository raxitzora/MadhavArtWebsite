import { Helmet } from "react-helmet-async";

import HeroComp from "../../components/HomePageComponents/HeroComp";
import WhatWeDoComp from "../../components/HomePageComponents/WhatWeDoComp";
import WhyMadhavArtComp from "../../components/HomePageComponents/WhyMadhavArtComp";
import OurWorkComp from "../../components/HomePageComponents/OurWorkComp";
import Footer from "../../components/common/Footer";

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>
          MadhavArt | Bike Color Customization, Radium Art & Vehicle Graphics
        </title>

        <meta
          name="description"
          content="MadhavArt provides bike customization, radium art, bike stickers, vehicle graphics, bike painting and restoration services in Madhavpur, Gujarat."
        />

        <link
          rel="canonical"
          href="https://madhavart.vercel.app/"
        />
      </Helmet>

      <main>
        <HeroComp />
        <WhyMadhavArtComp />
        <WhatWeDoComp />
        <OurWorkComp />
        <Footer />
      </main>
    </>
  );
};

export default HomePage;