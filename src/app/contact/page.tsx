import { getWhatsAppLink } from "@/src/config/constants";

export default function ContactPage() {
  return (
    <section className="section text-center">
      <h2 className="section-title">Contact Us</h2>
      <p className="text-accent mb-6">
        Reach us anytime for custom pooja items or bulk orders.
      </p>

      <a
        href={getWhatsAppLink("Hello Grazie.lk!")}
        target="_blank"
        className="btn btn-primary"
      >
        WhatsApp Us
      </a>
    </section>
  )
}
