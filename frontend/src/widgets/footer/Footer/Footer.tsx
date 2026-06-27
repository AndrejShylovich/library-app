import {
  Facebook,
  Instagram,
  Twitter,
  YouTube,
} from "@mui/icons-material";

import "./Footer.css";

const FOOTER_LINKS = [
  { label: "About the Library", href: "#" },
  { label: "Rules", href: "#" },
  { label: "Card Terms", href: "#" },
];

const SOCIAL_LINKS = [
  { icon: YouTube, label: "YouTube", href: "#" },
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
];

export const Footer = () => {
  return (
    <footer className="footer">
      <nav className="footer-links">
        {FOOTER_LINKS.map(({ label, href }) => (
          <a key={label} href={href}>
            {label}
          </a>
        ))}
      </nav>

      <div className="footer-socials">
        {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
          <a
            key={label}
            href={href}
            aria-label={label}
            className="footer-social"
          >
            <Icon />
          </a>
        ))}
      </div>
    </footer>
  );
};