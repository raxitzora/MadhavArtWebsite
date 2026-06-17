import { motion } from "motion/react";
import { useState } from "react";
import {
  HiOutlineUser,
  HiOutlinePhone,
  HiOutlineMail,
} from "react-icons/hi";
import axios from "axios";
import toast from "react-hot-toast";

const E = [0.22, 1, 0.36, 1];

export default function Contact() {
const [form, setForm] = useState({
  fullName: "",
  phone: "",
  email: "",
  message: "",
});

const [loading, setLoading] =
  useState(false);

  

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.value,
    }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    await axios.post(
      "https://madhavartbackend.onrender.com/api/contact",
      form
    );

 toast.success(
  "Inquiry sent successfully"
);

    setForm({
      fullName: "",
      phone: "",
      email: "",
      message: "",
    });
  } catch (error) {
    console.error(error);

   toast.error(
  "Failed to send inquiry"
);
  } finally {
    setLoading(false);
  }
};

  return (
    <section className="w-full bg-[#111111] px-5 sm:px-8 lg:px-14 py-20 text-white overflow-hidden">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.7,
            ease: E,
          }}
          className="text-center mb-14"
        >
          <p className="text-orange-500 uppercase tracking-[0.25em] text-xs font-bold mb-3">
            Contact MadhavArt
          </p>

          <h2 className="text-4xl sm:text-5xl font-bold font-bebas tracking-wide">
            Let's Build Your
            <span className="text-orange-500">
              {" "}
              Dream Ride
            </span>
          </h2>

          <p className="max-w-2xl mx-auto mt-4 text-gray-400">
            Looking for custom graphics,
            bike restoration, radium art,
            premium paint work or complete
            vehicle transformation? Send
            us your details and we'll get
            back to you.
          </p>
        </motion.div>

        {/* Form */}

        <motion.form
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            ease: E,
          }}
          onSubmit={handleSubmit}
          className="
          max-w-3xl
          mx-auto
          rounded-3xl
          border
          border-orange-500/10
          bg-[#181818]
          p-6
          sm:p-8
          shadow-[0_0_40px_rgba(249,115,22,0.08)]
          "
        >
          <div className="grid md:grid-cols-2 gap-5">

            <InputField
              icon={
                <HiOutlineUser />
              }
              placeholder="Full Name"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
            />

            <InputField
              icon={
                <HiOutlinePhone />
              }
              placeholder="Phone Number"
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />
          </div>

          <div className="mt-5">
            <InputField
              icon={
                <HiOutlineMail />
              }
              placeholder="Email Address"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="mt-5">
            <textarea
              name="message"
              rows="6"
              value={form.message}
              onChange={handleChange}
              placeholder="Tell us about your bike, design idea or customization requirement..."
              className="
              w-full
              rounded-2xl
              bg-[#111111]
              border
              border-orange-500/10
              px-5
              py-4
              text-white
              placeholder-gray-500
              outline-none
              focus:border-orange-500
              transition-colors
              resize-none
              "
            />
          </div>

         <button
  type="submit"
  disabled={loading}
  className="
  mt-6
  w-full
  rounded-2xl
  bg-orange-500
  py-4
  font-semibold
  text-white
  transition-all
  duration-300
  hover:scale-[1.01]
  hover:bg-orange-400
  disabled:opacity-70
  "
>
  {loading
    ? "Sending..."
    : "Send Inquiry"}
</button>
        </motion.form>
      </div>
    </section>
  );
}

function InputField({
  icon,
  ...props
}) {
  return (
    <div className="relative">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500 text-lg">
        {icon}
      </span>

      <input
        {...props}
        className="
        w-full
        rounded-2xl
        bg-[#111111]
        border
        border-orange-500/10
        pl-12
        pr-4
        py-4
        text-white
        placeholder-gray-500
        outline-none
        focus:border-orange-500
        transition-colors
        "
      />
    </div>
  );
}