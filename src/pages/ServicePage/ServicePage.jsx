
import { Helmet } from "react-helmet-async";

import Footer from "../../components/common/Footer";
import OurServices from "../../components/ServicePageComponents/OurServices";

const ServicePage = () => {
  return (
    <>
      <Helmet>
        {/* =========================
            Primary SEO
        ========================= */}

        <title>
          Bike Customization Services | Bike Painting, Radium Art & Vehicle
          Graphics | MadhavArt
        </title>

        <meta
          name="description"
          content="Discover professional bike customization services at MadhavArt in Madhavpur Ghed, Gujarat. We specialize in bike painting, restoration, radium art, custom stickers, vehicle graphics, vinyl wrapping and premium motorcycle modifications."
        />

        <meta
          name="keywords"
          content="Bike Customization, Bike Painting, Bike Restoration, Vehicle Graphics, Motorcycle Customization, Radium Art, Bike Stickers, Vinyl Wrapping, Bike Modification, MadhavArt Services, Madhavpur Ghed"
        />

        <meta
          name="robots"
          content="index,follow,max-image-preview:large"
        />

        <meta
          name="author"
          content="Raxit Zora"
        />

        <link
          rel="canonical"
          href="https://madhavart.vercel.app/services"
        />

        {/* =========================
            Open Graph
        ========================= */}

        <meta
          property="og:type"
          content="website"
        />

        <meta
          property="og:site_name"
          content="MadhavArt"
        />

        <meta
          property="og:locale"
          content="en_IN"
        />

        <meta
          property="og:title"
          content="Bike Customization Services | MadhavArt"
        />

        <meta
          property="og:description"
          content="Premium bike painting, restoration, radium art, custom stickers, vehicle graphics and motorcycle customization services."
        />

        <meta
          property="og:url"
          content="https://madhavart.vercel.app/services"
        />

        <meta
          property="og:image"
          content="https://madhavart.vercel.app/assets/heroimages/after-bike.png"
        />

        {/* =========================
            Twitter
        ========================= */}

        <meta
          name="twitter:card"
          content="summary_large_image"
        />

        <meta
          name="twitter:title"
          content="MadhavArt Services"
        />

        <meta
          name="twitter:description"
          content="Professional bike customization and restoration services in Gujarat."
        />

        <meta
          name="twitter:image"
          content="https://madhavart.vercel.app/assets/heroimages/after-bike.png"
        />

        {/* =========================
            Structured Data
        ========================= */}

        <script type="application/ld+json">
          {`
          {
            "@context":"https://schema.org",
            "@type":"Service",

            "name":"Bike Customization Services",

            "provider":{
              "@type":"AutomotiveBusiness",
              "name":"MadhavArt",
              "url":"https://madhavart.vercel.app"
            },

            "areaServed":{
              "@type":"State",
              "name":"Gujarat"
            },

            "serviceType":[
              "Bike Customization",
              "Bike Painting",
              "Bike Restoration",
              "Radium Art",
              "Vehicle Graphics",
              "Vinyl Wrapping",
              "Custom Stickers",
              "Motorcycle Modification"
            ],

            "description":"Professional bike customization, painting, restoration, radium art, custom stickers and vehicle graphics services in Madhavpur Ghed, Gujarat."
          }
          `}
        </script>
      </Helmet>

      <main>
        <OurServices />
        <Footer />
      </main>
    </>
  );
};

export default ServicePage;
