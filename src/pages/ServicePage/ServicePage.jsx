import { Helmet } from "react-helmet-async";

import Footer from "../../components/common/Footer";
import OurServices from "../../components/ServicePageComponents/OurServices";

const ServicePage = () => {
  return (
    <>
      <Helmet>
        <title>
          Bike Customization Services | MadhavArt
        </title>

        <meta
          name="description"
          content="Professional bike customization, radium art, custom stickers, vehicle graphics, bike painting, restoration and modification services by MadhavArt in Madhavpur, Gujarat."
        />

        <link
          rel="canonical"
          href="https://madhavart.vercel.app/services"
        />
      </Helmet>

      <div>
        <OurServices />
        <Footer />
      </div>
    </>
  );
};

export default ServicePage;