import React, { useRef, useState, FormEvent } from "react";
import emailjs from "@emailjs/browser";

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function Contact() {
  const form = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<string>("");
  const [sending, setSending] = useState<boolean>(false);

  const EMAILJS_PUBKEY = "JjqzJ6l0m6HQ2srr0";
  const EMAILJS_SERVICE_ID = "emailjs-personal-site";
  const EMAILJS_TEMPLATE_ID = "template_mf56dr7";

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);

    const templateParams = {
      from_name: formData.name,
      reply_to_email: formData.email,
      message: formData.message,
    };

    emailjs
      .send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBKEY,
      )
      .then(
        () => {
          setStatus(
            "Thanks for the note! I'll get back to you in the next day or two.",
          );
          setFormData({ name: "", email: "", message: "" });
        },
        (error) => {
          setStatus(
            "Sorry, something went wrong. Please try again or reach out directly via my email.",
          );
          console.log("FAILED...", error.text);
        },
      )
      .finally(() => {
        setSending(false);
      });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="max-w-3xl md:mx-auto px-4 py-8 md:w-full">
      <form
        ref={form}
        onSubmit={handleSubmit}
        className="bg-opacity-100 border border-gray-500 shadow-2xl rounded-lg p-6"
      >
        <label className="block text-white mb-2">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 mb-4 rounded border border-gray-300"
          required
        />
        <label className="block text-white mb-2">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 mb-4 rounded border border-gray-300"
          required
        />
        <label className="block text-white mb-2">Message</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="w-full p-2 mb-4 rounded border border-gray-300"
          rows={4}
          required
        />
        <div className="flex flex-column items-center align-center justify-center">
          <button
            type="submit"
            disabled={sending}
            className="bg-light-seafoam text-black px-4 py-2 rounded hover:bg-dark-seafoam transition-colors items-center"
          >
            {sending ? "Sending..." : "Send"}
          </button>
        </div>
        <div className="flex flex-column items-center align-center justify-center">
          {status && <p className="mt-4 text-white">{status}</p>}
        </div>
      </form>
    </div>
  );
}
