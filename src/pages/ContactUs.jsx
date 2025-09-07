import React, { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Phone, User, Send, Mail } from "lucide-react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Create WhatsApp message URL with proper formatting
    const whatsappMessage = `Hello! My name is ${formData.name}. ${formData.message}`;
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://api.whatsapp.com/send/?phone=+94762315932&text=${encodedMessage}&type=phone_number&app_absent=0`;

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, "_blank");

    // Reset form after a short delay
    setTimeout(() => {
      setFormData({ name: "", mobile: "", message: "" });
      setIsSubmitting(false);
    }, 2000);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      boxShadow: "0px 5px 15px rgba(154, 63, 63, 0.4)",
    },
    tap: { scale: 0.95 },
  };

  return (
    <section
      id="contact"
      className="min-h-screen py-20 px-4"
      style={{ backgroundColor: "#FBF9D1" }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: "#9A3F3F" }}
          >
            Get In Touch
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "#C1856D" }}>
            Have a project in mind or want to collaborate? I'd love to hear from
            you!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
          style={{ border: "2px solid #E6CFA9" }}
        >
          <div className="md:flex">
            <div
              className="md:w-2/5 p-8 md:p-12 flex flex-col justify-center"
              style={{ backgroundColor: "#9A3F3F" }}
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-white"
              >
                <h3 className="text-2xl font-bold mb-4">Let's Connect</h3>
                <p className="mb-6 opacity-90">
                  I'm always open to discussing new projects and opportunities.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <div
                      className="p-2 rounded-full mr-3"
                      style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
                    >
                      <Phone size={18} />
                    </div>
                    <span>+94 76 231 5932</span>
                  </div>

                  <div className="flex items-center">
                    <div
                      className="p-2 rounded-full mr-3"
                      style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
                    >
                      <Mail size={18} />
                    </div>
                    <span>vtrolleymkt@gmail.com</span>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  viewport={{ once: true }}
                  className="mt-8 pt-6 border-t border-white border-opacity-20"
                >
                  <p className="text-sm opacity-80">
                    Prefer to message directly?
                  </p>
                  <p className="text-sm opacity-80">
                    Fill out the form and I'll get back to you soon.
                  </p>
                </motion.div>
              </motion.div>
            </div>

            <div className="md:w-3/5 p-8 md:p-10">
              <motion.form
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <motion.div variants={itemVariants}>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2 flex items-center"
                    style={{ color: "#9A3F3F" }}
                  >
                    <User className="w-4 h-4 mr-2" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200"
                    style={{
                      borderColor: "#E6CFA9",
                      backgroundColor: "#FBF9D1",
                    }}
                    placeholder="Enter your full name"
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label
                    htmlFor="mobile"
                    className="block text-sm font-medium mb-2 flex items-center"
                    style={{ color: "#9A3F3F" }}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200"
                    style={{
                      borderColor: "#E6CFA9",
                      backgroundColor: "#FBF9D1",
                    }}
                    placeholder="Enter your mobile number"
                    pattern="[0-9]{10,15}"
                    title="Please enter a valid mobile number"
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2 flex items-center"
                    style={{ color: "#9A3F3F" }}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200 resize-none"
                    style={{
                      borderColor: "#E6CFA9",
                      backgroundColor: "#FBF9D1",
                    }}
                    placeholder="Tell me about your project or inquiry..."
                  />
                </motion.div>

                <motion.div variants={itemVariants} className="pt-4">
                  <motion.button
                    type="submit"
                    variants={buttonVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-lg font-semibold text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    style={{ backgroundColor: "#9A3F3F" }}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Get In Touch
                      </>
                    )}
                  </motion.button>
                </motion.div>
              </motion.form>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-12 rounded-lg p-6"
          style={{ backgroundColor: "#E6CFA9" }}
        >
          <p className="text-lg font-medium" style={{ color: "#9A3F3F" }}>
            Prefer email? Reach me directly at{" "}
            <a
              href="mailto:vtrolleymkt@gmail.com"
              className="underline font-bold"
            >
              vtrolleymkt@gmail.com
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactUs;
