
import { Helmet } from "react-helmet-async";

import GalleryHeroComp from "../../components/GalleryPageComponents/GalleryHeroComp";
import GalleryImages from "../../components/GalleryPageComponents/GalleryImages";

const GalleryPage = () => {
  return (
    <>
      <Helmet>
        {/* =========================
            Primary SEO
        ========================= */}

        <title>
          Gallery | Bike Customization, Bike Painting & Radium Art Portfolio |
          MadhavArt
        </title>

        <meta
          name="description"
          content="Explore MadhavArt's gallery showcasing premium bike customization, bike painting, radium art, vehicle graphics, restoration, vinyl wrapping and custom sticker projects completed in Madhavpur Ghed, Gujarat."
        />

        <meta
          name="keywords"
          content="Bike Gallery, Bike Customization Gallery, Bike Painting Gallery, Radium Art Gallery, Vehicle Graphics Gallery, Motorcycle Restoration, Vinyl Wrapping, Bike Stickers, MadhavArt Gallery, Madhavpur Ghed"
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
          href="https://madhavart.vercel.app/gallery"
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
          content="Gallery | MadhavArt Bike Customization Portfolio"
        />

        <meta
          property="og:description"
          content="View our completed bike painting, restoration, radium art, vehicle graphics and premium motorcycle customization projects."
        />

        <meta
          property="og:url"
          content="https://madhavart.vercel.app/gallery"
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
          content="MadhavArt Gallery"
        />

        <meta
          name="twitter:description"
          content="Explore our premium bike customization and restoration portfolio."
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
            "@type":"ImageGallery",

            "name":"MadhavArt Gallery",

            "description":"Gallery of completed bike customization, radium art, vehicle graphics, restoration and painting projects.",

            "url":"https://madhavart.vercel.app/gallery",

            "publisher":{
              "@type":"Organization",
              "name":"MadhavArt",
              "logo":{
                "@type":"ImageObject",
                "url":"https://madhavart.vercel.app/assets/logo.png"
              }
            }
          }
          `}
        </script>
      </Helmet>

      <main className="pt-18">
        <GalleryHeroComp />
        <GalleryImages />
      </main>
    </>
  );
};

export default GalleryPage;

