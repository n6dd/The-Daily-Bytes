import "./Contact.css";

const Contact = () => {
  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <p className="contact-subtext">
        Have questions, feedback, or just want to say hello? Fill out the form below or reach us directly.
      </p>

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

      <div className="contact-info">
        <p><strong>Email:</strong> contact@yourwebsite.com</p>
        <p><strong>Phone:</strong> (123) 456-7890</p>
        <p><strong>Follow us:</strong> <a href="https://twitter.com">Twitter</a> | <a href="https://facebook.com">Facebook</a></p>
      </div>
    </div>
  );
};

export default Contact;
