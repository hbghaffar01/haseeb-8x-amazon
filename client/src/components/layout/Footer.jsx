import { footerSections } from "../../constants/index.js";
import { BRAND } from "../../constants/config.js";
import "./Footer.css";

/**
 * Amazon-style footer: a "Back to top" bar, four link columns driven by the
 * `footerSections` constant, and a brand strip. All content is data-driven.
 */
export function Footer() {
  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="ftr">
      <button className="ftr-top" onClick={scrollToTop} aria-label="Back to top">
        Back to top
      </button>

      <div className="ftr-cols">
        <div className="ftr-cols-inner">
          {footerSections.map((section) => (
            <nav key={section.id} aria-label={section.title}>
              <h3 className="ftr-col-title">{section.title}</h3>
              <ul className="ftr-col-list">
                {section.links.map((link) => (
                  <li key={link}>
                    <a href="#top" onClick={(e) => e.preventDefault()}>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="ftr-brand">
        <span className="ftr-logo">
          {BRAND.name}
          <span>.{BRAND.tagline}</span>
        </span>
      </div>

      <div className="ftr-legal">
        <p>
          Conditions of Use · Privacy Notice · Consumer Health Data Privacy
          Disclosure
        </p>
        <p>© 1996–{new Date().getFullYear()}, amazon.rebuild — a demo clone for the 8x assignment.</p>
      </div>
    </footer>
  );
}
