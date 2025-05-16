import "./Contact.css";

// ==============================
// TODO: Contact Component
// ==============================

const Contact = () => {
  return (
    <div className="contact-container">
      {/* TODO: Page Title */}
      <h1>Contact Us</h1>

      {/* TODO: Subheading Description */}
      <p className="contact-subtext">
        Have questions, feedback, or just want to say hello? Fill out the form below or reach us directly.
      </p>

      {/* TODO: Contact Form Fields */}
      <form className="contact-form">
        <label>
          Name
          <input type="text" name="name" placeholder="Your name" required />
        </label>

        <label>
          Email
          <input type="email" name="email" placeholder="you@example.com" required />
        </label>

        <label>
          Message
          <textarea name="message" placeholder="Your message..." rows={4} required></textarea>
        </label>

        <button type="submit">Send Message</button>
      </form>

      {/* TODO: Contact Info Block */}
      <div className="contact-info">
        <p><strong>Email:</strong> contact@yourwebsite.com</p>
        <p><strong>Phone:</strong> (123) 456-7890</p>
        <p>
          <strong>Follow us:</strong>{" "}
          <a href="https://twitter.com">Twitter</a> |{" "}
          <a href="https://facebook.com">Facebook</a>
        </p>
      </div>
    </div>
  );
};

export default Contact;
// NOTE Standalone contact page with static contact info and styled form
