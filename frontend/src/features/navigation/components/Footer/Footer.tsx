import { Facebook, Instagram, Twitter, YouTube } from "@mui/icons-material";
import "./Footer.css";

const FOOTER_LINKS = [
  { label: "About the Library", href: "#" },
  { label: "Rules", href: "#" },
  { label: "Card Terms", href: "#" },
];

const SOCIAL_ICONS = [
  { icon: YouTube, label: "YouTube" },
  { icon: Twitter, label: "Twitter" },
  { icon: Facebook, label: "Facebook" },
  { icon: Instagram, label: "Instagram" },
];

export const Footer: React.FC = () => {
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
        {SOCIAL_ICONS.map(({ icon: Icon, label }) => (
          <Icon key={label} className="footer-social" aria-label={label} />
        ))}
      </div>
    </footer>
  );
};
