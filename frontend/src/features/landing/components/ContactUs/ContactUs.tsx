import './ContactUs.css';

const ContactItem: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="contact-item">
    <h4>{title}</h4>
    {children}
    <div className="contact-us-divider"></div>
  </div>
);

export const ContactUs: React.FC = () => {
  return (
    <section className="contact-us">
      <h3>Contact Us</h3>

      <ContactItem title="Address:">
        <address>
          <p>Street N, 32</p>
          <p>Street M, 56-3</p>
        </address>
      </ContactItem>

      <ContactItem title="Phone Number:">
        <p>+2415648915491</p>
      </ContactItem>

      <ContactItem title="Email:">
        <p>
          <a href="mailto:libemail@gmail.com">libemail@gmail.com</a>
        </p>
      </ContactItem>
    </section>
  );
};
