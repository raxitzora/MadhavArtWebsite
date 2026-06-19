import { Helmet } from "react-helmet-async";

import Introduction from "../../components/AboutPageComponents/Introduction";
import Footer from "../../components/common/Footer";

const AboutPage = () => {
  return (
    <>
      <Helmet>
        <title>
          About MadhavArt | Ramesh Zora | Bike Customization & Radium Art
        </title>

        <meta
          name="description"
          content="Learn about MadhavArt, founded by Ramesh Zora in Madhavpur, Gujarat. We specialize in bike customization, radium art, vehicle graphics, custom stickers, bike painting and restoration."
        />

        <link
          rel="canonical"
          href="https://madhavart.vercel.app/about"
        />
      </Helmet>

      <main>
        <Introduction />
        <Footer />
      </main>
    </>
  );
};

export default AboutPage;