
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

        {/* =========================
            Primary SEO
        ========================== */}

        <title>
          Bike Customization, Painting & Radium Art in Madhavpur | MadhavArt
        </title>

        <meta
          name="description"
          content="MadhavArt is a professional bike customization studio in Madhavpur Ghed, Gujarat specializing in bike painting, restoration, radium art, vehicle graphics, vinyl wrapping, custom stickers and premium motorcycle customization."
        />

        <meta
          name="keywords"
          content="MadhavArt, Madhav Art, Madhavpur Bike Customization, Bike Painting Gujarat, Bike Restoration, Vehicle Graphics, Bike Stickers, Custom Stickers, Radium Art, Vinyl Wrapping, Motorcycle Customization, Ramesh Zora, RameshZora, Raxit Zora, Madhavpur Ghed"
        />

        <meta name="author" content="Raxit Zora" />

        <meta
          name="robots"
          content="index,follow,max-image-preview:large"
        />

        <link
          rel="canonical"
          href="https://madhavart.vercel.app/"
        />

        {/* =========================
            Open Graph
        ========================== */}

        <meta property="og:type" content="website" />

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
          content="Bike Customization, Painting & Radium Art | MadhavArt"
        />

        <meta
          property="og:description"
          content="Professional Bike Painting, Radium Art, Vehicle Graphics, Restoration and Premium Customization in Madhavpur Ghed, Gujarat."
        />

        <meta
          property="og:url"
          content="https://madhavart.vercel.app/"
        />

        <meta
          property="og:image"
          content="https://madhavart.vercel.app/assets/heroimages/after-bike.png"
        />

        {/* =========================
            Twitter
        ========================== */}

        <meta
          name="twitter:card"
          content="summary_large_image"
        />

        <meta
          name="twitter:title"
          content="MadhavArt | Bike Customization"
        />

        <meta
          name="twitter:description"
          content="Premium Bike Painting, Radium Art, Vehicle Graphics and Motorcycle Restoration."
        />

        <meta
          name="twitter:image"
          content="https://madhavart.vercel.app/assets/heroimages/after-bike.png"
        />

        <meta
          name="twitter:creator"
          content="@madhav_art_madhavpur"
        />

        {/* =========================
            Structured Data
        ========================== */}

        <script type="application/ld+json">
          {`
          {
            "@context":"https://schema.org",
            "@type":"AutomotiveBusiness",

            "name":"MadhavArt",

            "url":"https://madhavart.vercel.app",

            "logo":"https://madhavart.vercel.app/assets/logo.png",

            "image":"https://madhavart.vercel.app/assets/heroimages/after-bike.png",

            "telephone":"+918490007820",

            "priceRange":"₹₹",

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
            ],

            "hasOfferCatalog":{
              "@type":"OfferCatalog",
              "name":"Vehicle Customization Services",
              "itemListElement":[

                {
                  "@type":"Offer",
                  "itemOffered":{
                    "@type":"Service",
                    "name":"Bike Painting"
                  }
                },

                {
                  "@type":"Offer",
                  "itemOffered":{
                    "@type":"Service",
                    "name":"Bike Restoration"
                  }
                },

                {
                  "@type":"Offer",
                  "itemOffered":{
                    "@type":"Service",
                    "name":"Bike Color Customization"
                  }
                },

                {
                  "@type":"Offer",
                  "itemOffered":{
                    "@type":"Service",
                    "name":"Vehicle Graphics"
                  }
                },

                {
                  "@type":"Offer",
                  "itemOffered":{
                    "@type":"Service",
                    "name":"Radium Art"
                  }
                },

                {
                  "@type":"Offer",
                  "itemOffered":{
                    "@type":"Service",
                    "name":"Custom Bike Stickers"
                  }
                },

                {
                  "@type":"Offer",
                  "itemOffered":{
                    "@type":"Service",
                    "name":"Vinyl Wrapping"
                  }
                }
              ]
            }
          }
          `}
        </script>

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

