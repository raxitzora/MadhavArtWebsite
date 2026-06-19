import { Helmet } from "react-helmet-async";

import Contact from "../../components/ContactPageComponents/Contact";

const ContactPage = () => {
  return (
    <>
      <Helmet>
        <title>
          Contact MadhavArt | Bike Customization & Radium Art in Madhavpur
        </title>

        <meta
          name="description"
          content="Contact MadhavArt for bike customization, radium art, vehicle graphics, custom stickers, bike painting and restoration services in Madhavpur, Gujarat."
        />

        <link
          rel="canonical"
          href="https://madhavart.vercel.app/contact"
        />
      </Helmet>

      <Contact />
    </>
  );
};

export default ContactPage;