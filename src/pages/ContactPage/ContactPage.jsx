
import { Helmet } from "react-helmet-async";

import Contact from "../../components/ContactPageComponents/Contact";

const ContactPage = () => {
  return (
    <>
      <Helmet>
        {/* =========================
            Primary SEO
        ========================= */}

        <title>
          Contact MadhavArt | Bike Customization & Vehicle Graphics in
          Madhavpur Ghed
        </title>

        <meta
          name="description"
          content="Contact MadhavArt in Madhavpur Ghed, Gujarat for professional bike customization, bike painting, restoration, radium art, custom stickers, vinyl wrapping and vehicle graphics."
        />

        <meta
          name="keywords"
          content="Contact MadhavArt, Bike Customization Contact, Madhavpur Bike Painting, Bike Restoration Gujarat, Vehicle Graphics, Radium Art, Motorcycle Customization, Madhavpur Ghed"
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
          href="https://madhavart.vercel.app/contact"
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
          content="Contact MadhavArt"
        />

        <meta
          property="og:description"
          content="Get in touch with MadhavArt for premium bike customization, restoration and vehicle graphics services."
        />

        <meta
          property="og:url"
          content="https://madhavart.vercel.app/contact"
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
          content="Contact MadhavArt"
        />

        <meta
          name="twitter:description"
          content="Contact MadhavArt for bike customization, painting, restoration and radium art."
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

            "areaServed":[
              {
                "@type":"City",
                "name":"Madhavpur Ghed"
              },
              {
                "@type":"City",
                "name":"Porbandar"
              },
              {
                "@type":"State",
                "name":"Gujarat"
              }
            ],

            "sameAs":[
              "https://www.instagram.com/madhav_art_madhavpur/"
            ],

            "contactPoint":{
              "@type":"ContactPoint",
              "telephone":"+918490007820",
              "contactType":"customer service",
              "availableLanguage":[
                "Gujarati",
                "Hindi",
                "English"
              ]
            }
          }
          `}
        </script>
      </Helmet>

      <main>
        <Contact />
      </main>
    </>
  );
};

export default ContactPage;
