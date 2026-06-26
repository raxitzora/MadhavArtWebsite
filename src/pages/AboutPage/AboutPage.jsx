
import { Helmet } from "react-helmet-async";

import Introduction from "../../components/AboutPageComponents/Introduction";
import Footer from "../../components/common/Footer";

const AboutPage = () => {
  return (
    <>
      <Helmet>
        {/* =========================
            Primary SEO
        ========================= */}

        <title>
          About MadhavArt | Founded by Ramesh Zora | Bike Customization in
          Madhavpur Ghed
        </title>

        <meta
          name="description"
          content="Learn about MadhavArt, founded by Ramesh Zora in Madhavpur Ghed, Gujarat. We specialize in premium bike customization, bike painting, restoration, radium art, custom stickers, vinyl wrapping and vehicle graphics."
        />

        <meta
          name="keywords"
          content="About MadhavArt, Ramesh Zora, MadhavArt Founder, Bike Customization Gujarat, Bike Painting Madhavpur, Vehicle Graphics, Radium Art, Motorcycle Restoration, Madhavpur Ghed"
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
          href="https://madhavart.vercel.app/about"
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
          content="About MadhavArt | Bike Customization Experts"
        />

        <meta
          property="og:description"
          content="Meet the team behind MadhavArt and discover our journey in professional bike customization, restoration and vehicle graphics."
        />

        <meta
          property="og:url"
          content="https://madhavart.vercel.app/about"
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
          content="About MadhavArt"
        />

        <meta
          name="twitter:description"
          content="Learn about MadhavArt, founded by Ramesh Zora in Madhavpur Ghed, Gujarat."
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

            "@type":"AboutPage",

            "name":"About MadhavArt",

            "url":"https://madhavart.vercel.app/about",

            "description":"Learn about MadhavArt, a professional motorcycle customization studio in Madhavpur Ghed, Gujarat.",

            "mainEntity":{

              "@type":"AutomotiveBusiness",

              "name":"MadhavArt",

              "url":"https://madhavart.vercel.app",

              "logo":"https://madhavart.vercel.app/assets/logo.png",

              "image":"https://madhavart.vercel.app/assets/heroimages/after-bike.png",

              "telephone":"+918490007820",

              "founder":{
                "@type":"Person",
                "name":"Ramesh Zora"
              },

              "address":{
                "@type":"PostalAddress",
                "streetAddress":"Infront of Bapa Sitaram Mandir",
                "addressLocality":"Madhavpur Ghed",
                "addressRegion":"Gujarat",
                "postalCode":"362230",
                "addressCountry":"IN"
              },

              "sameAs":[
                "https://www.instagram.com/madhav_art_madhavpur/"
              ]
            }
          }
          `}
        </script>
      </Helmet>

      <main>
        <Introduction />
        <Footer />
      </main>
    </>
  );
};

export default AboutPage;
