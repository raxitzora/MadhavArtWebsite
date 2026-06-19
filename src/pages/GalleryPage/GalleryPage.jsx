import { Helmet } from "react-helmet-async";

import GalleryHeroComp from "../../components/GalleryPageComponents/GalleryHeroComp";
import GalleryImages from "../../components/GalleryPageComponents/GalleryImages";

const GalleryPage = () => {
  return (
    <>
      <Helmet>
        <title>
          Gallery | Bike Customization, Radium Art & Vehicle Graphics | MadhavArt
        </title>

        <meta
          name="description"
          content="Explore MadhavArt's gallery of bike customization, radium art, vehicle graphics, bike painting, restoration and custom sticker projects in Madhavpur, Gujarat."
        />

        <link
          rel="canonical"
          href="https://madhavart.vercel.app/gallery"
        />
      </Helmet>

      <main className="pt-18">
        <GalleryHeroComp />
        <GalleryImages />
      </main>
    </>
  );
};

export default GalleryPage;