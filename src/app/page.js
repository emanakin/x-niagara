"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLaptopCode,
  faChartLine,
  faCogs,
  faLightbulb,
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
  faBars,
  faGlobe,
  faUser,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import {
  faLinkedin,
  faInstagram,
  faTwitter,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

// Define the Home Page component
export default function HomePage() {
  // Get current year for footer
  const currentYear = new Date().getFullYear();

  // State for mobile menu and scroll position
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Use Intersection Observer for animations instead of manual calculations
  const revealRefs = useRef([]);
  revealRefs.current = [];

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Close mobile menu when clicking outside or on a link
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Handle link click in mobile menu
  const handleNavLinkClick = (e, targetId) => {
    if (targetId) {
      e.preventDefault();
      closeMobileMenu();
      const target = document.getElementById(targetId);
      if (target) {
        // Add delay to ensure menu closes first
        setTimeout(() => {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 300);
      }
    } else {
      closeMobileMenu();
    }
  };

  // Add to refs for scroll reveal
  const addToRefs = (el, index) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  // Add useEffect for outside click detection to close menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuOpen &&
        !event.target.closest(`.${styles.nav}`) &&
        !event.target.closest(`.${styles.navToggle}`)
      ) {
        closeMobileMenu();
      }
    };

    // Add when the menu is open
    if (mobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    // Header scroll effect
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    // Set up IntersectionObserver for better performance
    const observerOptions = {
      root: null, // Use viewport
      rootMargin: "0px",
      threshold: 0.15, // Element is 15% visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Add visible class
          entry.target.classList.add(styles.visible);
          // Stop observing this element
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all current elements
    revealRefs.current.forEach((ref) => {
      observer.observe(ref);
    });

    // Add scroll event listener for header
    window.addEventListener("scroll", handleScroll);

    // Initial check for header
    handleScroll();

    return () => {
      // Clean up
      window.removeEventListener("scroll", handleScroll);

      // Disconnect observer
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  // Add staggered delay to items
  const getDelayClass = (index) => {
    const delayIndex = (index % 5) + 1;
    return styles[`delay${delayIndex}`];
  };

  return (
    <>
      {/* Header with scroll effect */}
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
        <div className={styles.container}>
          <Link href="/" className={styles.logo}>
            X Niagara
            <span>by Favour & Emmanuel</span>
          </Link>

          {/* Navigation with responsive toggle */}
          <button
            className={styles.navToggle}
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation menu"
          >
            <FontAwesomeIcon icon={mobileMenuOpen ? faTimes : faBars} />
          </button>

          <nav
            className={`${styles.nav} ${mobileMenuOpen ? styles.active : ""}`}
          >
            <a
              href="#services"
              onClick={(e) => handleNavLinkClick(e, "services")}
            >
              Services
            </a>
            <a
              href="#founders"
              onClick={(e) => handleNavLinkClick(e, "founders")}
            >
              About Us
            </a>
            <a
              href="#testimonials"
              onClick={(e) => handleNavLinkClick(e, "testimonials")}
            >
              Testimonials
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavLinkClick(e, "contact")}
            >
              Contact
            </a>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section
          id="hero"
          className={`${styles.hero} ${styles.section} ${styles.first}`}
        >
          <div className={styles.container}>
            <h1
              className={`${styles.scrollReveal} ${styles.delay1}`}
              ref={(el) => addToRefs(el, 0)}
            >
              Empowering Businesses with Tech & Marketing Excellence
            </h1>
            <p
              className={`${styles.subtext} ${styles.scrollReveal} ${styles.delay2}`}
              ref={(el) => addToRefs(el, 1)}
            >
              Bringing your vision to life with bespoke digital solutions.
              Full-fledged digital transformation, bringing your personal brand
              or business online, empowered through AI.
            </p>
            <div
              className={`${styles.ctaButtons} ${styles.scrollReveal} ${styles.delay3}`}
              ref={(el) => addToRefs(el, 2)}
            >
              <a
                href="https://calendly.com/boobeargaminginc/30min"
                className={`${styles.btn} ${styles.btnPrimary}`}
              >
                Book a Consultation
              </a>
              <a
                href="#services"
                className={`${styles.btn} ${styles.btnSecondary}`}
              >
                Our Services
              </a>
            </div>
          </div>
        </section>

        {/* Brief Introduction Section */}
        <section id="intro" className={`${styles.intro} ${styles.section}`}>
          <div className={styles.container}>
            <div
              className={`${styles.introText} ${styles.scrollReveal} ${styles.delay1}`}
              ref={(el) => addToRefs(el, 3)}
            >
              <h2>Meet The Founders</h2>
              <p>
                X Niagara brings together the technical expertise of Emmanuel
                and the marketing prowess of Favour to deliver comprehensive
                digital solutions for businesses in the Niagara region.
              </p>
              <p>
                Our combined skillset allows us to approach your digital
                challenges holistically, ensuring both technical excellence and
                strategic marketing alignment.
              </p>
              <a
                href="#founders"
                className={`${styles.btn} ${styles.btnPrimary}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("founders").scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }}
              >
                Learn More About Us
              </a>
            </div>
            <div
              className={`${styles.introImages} ${styles.scrollReveal} ${styles.delay2}`}
              ref={(el) => addToRefs(el, 4)}
            >
              <Image
                src="/images/team-member-1.jpg"
                alt="Favour - Marketing Strategist"
                title="Favour - Marketing Strategist"
                width={250}
                height={350}
                className={styles.introImage}
              />
              <Image
                src="/images/team-member-2.jpg"
                alt="Emmanuel - Software Development Lead"
                title="Emmanuel - Software Development Lead"
                width={250}
                height={350}
                className={styles.introImage}
              />
            </div>
          </div>
        </section>

        {/* Services Overview Section */}
        <section id="services" className={styles.services}>
          <div className={styles.container}>
            <h2
              className={`${styles.sectionTitle} ${styles.scrollReveal} ${styles.delay1}`}
              ref={(el) => addToRefs(el, 5)}
            >
              Our Core Services
            </h2>
            <div className={styles.servicesGrid}>
              {/* Service Cards with staggered animations */}
              <Link
                href="/services/web-development"
                className={`${styles.serviceCard} ${styles.scrollReveal} ${styles.delay1}`}
                ref={(el) => addToRefs(el, 6)}
              >
                <div className={styles.icon}>
                  <FontAwesomeIcon icon={faLaptopCode} />
                </div>
                <h3>Web Development</h3>
                <p>
                  Modern, responsive websites designed to convert visitors into
                  customers.
                </p>
              </Link>

              {/* Other service cards with scroll reveal */}
              <Link
                href="/services/digital-marketing"
                className={`${styles.serviceCard} ${styles.scrollReveal} ${styles.delay2}`}
                ref={(el) => addToRefs(el, 7)}
              >
                <div className={styles.icon}>
                  <FontAwesomeIcon icon={faChartLine} />
                </div>
                <h3>SEO & Digital Marketing</h3>
                <p>
                  Increase your online visibility and reach your target audience
                  effectively.
                </p>
              </Link>

              <Link
                href="/services/software-development"
                className={`${styles.serviceCard} ${styles.scrollReveal} ${styles.delay3}`}
                ref={(el) => addToRefs(el, 8)}
              >
                <div className={styles.icon}>
                  <FontAwesomeIcon icon={faCogs} />
                </div>
                <h3>Software Development</h3>
                <p>
                  Custom software solutions tailored to streamline your business
                  processes.
                </p>
              </Link>

              <Link
                href="/services/brand-strategy"
                className={`${styles.serviceCard} ${styles.scrollReveal} ${styles.delay4}`}
                ref={(el) => addToRefs(el, 9)}
              >
                <div className={styles.icon}>
                  <FontAwesomeIcon icon={faLightbulb} />
                </div>
                <h3>Brand Strategy & Consulting</h3>
                <p>
                  Expert guidance to define your brand and create impactful
                  digital strategies.
                </p>
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Case Studies Section */}
        <section id="case-studies" className={styles.caseStudies}>
          <div className={styles.container}>
            <h2
              className={`${styles.scrollReveal} ${styles.delay1}`}
              ref={(el) => addToRefs(el, 10)}
            >
              Trusted By Businesses Like Yours
            </h2>
            <p
              className={`${styles.centeredText} ${styles.scrollReveal} ${styles.delay2}`}
              ref={(el) => addToRefs(el, 11)}
            >
              We&apos;re proud to partner with innovative companies in St.
              Catharines, Niagara Falls, and beyond, helping them achieve
              digital success.
            </p>
            <div
              className={`${styles.clientLogos} ${styles.scrollReveal} ${styles.delay3}`}
              ref={(el) => addToRefs(el, 12)}
            >
              <Image
                src="/images/clinet-1.png"
                alt="Client Logo 1"
                width={150}
                height={50}
              />
              <Image
                src="/images/clinet-2.png"
                alt="Client Logo 2"
                width={150}
                height={50}
              />
              <Image
                src="/images/clinet-3.png"
                alt="Client Logo 3"
                width={150}
                height={50}
              />
              <Image
                src="/images/clinet-4.png"
                alt="Client Logo 4"
                width={150}
                height={50}
              />
              <Image
                src="/images/clinet-5.jpg"
                alt="Client Logo 5"
                width={150}
                height={50}
              />
            </div>
            <div
              className={`${styles.centeredButton} ${styles.scrollReveal} ${styles.delay4}`}
              ref={(el) => addToRefs(el, 13)}
            >
              <Link
                href="/portfolio"
                className={`${styles.btn} ${styles.btnPrimary}`}
              >
                Explore Our Portfolio
              </Link>
            </div>
          </div>
        </section>

        {/* Add Meet the Founders Section - NEW */}
        <section id="founders" className={styles.founders}>
          <div className={styles.container}>
            <h2
              className={`${styles.scrollReveal} ${styles.delay1}`}
              ref={(el) => addToRefs(el, 20)}
            >
              Meet the Founders
            </h2>
            <p
              className={`${styles.centeredText} ${styles.scrollReveal} ${styles.delay2}`}
              ref={(el) => addToRefs(el, 21)}
            >
              The passionate duo bringing tech and marketing expertise to the
              Niagara Region.
            </p>

            <div
              className={`${styles.foundersGrid} ${styles.scrollReveal} ${styles.delay3}`}
              ref={(el) => addToRefs(el, 22)}
            >
              {/* Founder 1 */}
              <div className={styles.founderCard}>
                <div className={styles.founderImage}>
                  <Image
                    src="/images/team-member-1.jpg"
                    alt="Favour"
                    width={250}
                    height={300}
                    objectFit="cover"
                  />
                </div>
                <h3>Favour</h3>
                <p className={styles.founderTitle}>Marketing Strategist</p>
                <p className={styles.founderBio}>
                  Digital marketing expert with a passion for helping local
                  businesses thrive in the online marketplace.
                </p>
                <div className={styles.founderLinks}>
                  <a
                    href="https://www.linkedin.com/in/favouriranola/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Favour's LinkedIn"
                  >
                    <FontAwesomeIcon icon={faLinkedin} />
                  </a>
                  <a href="tel:+13658802271" aria-label="Call Favour">
                    <FontAwesomeIcon icon={faPhone} />
                  </a>
                  <a
                    href="https://favouriranolaportfolio.my.canva.site/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Favour's Website"
                  >
                    <FontAwesomeIcon icon={faGlobe} />
                  </a>
                </div>
              </div>

              {/* Founder 2 */}
              <div className={styles.founderCard}>
                <div className={styles.founderImage}>
                  <Image
                    src="/images/team-member-2.jpg"
                    alt="Emmanuel"
                    width={250}
                    height={300}
                    objectFit="cover"
                  />
                </div>
                <h3>Emmanuel</h3>
                <p className={styles.founderTitle}>Software Development Lead</p>
                <p className={styles.founderBio}>
                  Full-stack developer with expertise in creating seamless,
                  user-focused web applications and software solutions.
                </p>
                <div className={styles.founderLinks}>
                  <a
                    href="https://www.linkedin.com/in/emanakin/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Emmanuel's LinkedIn"
                  >
                    <FontAwesomeIcon icon={faLinkedin} />
                  </a>
                  <a href="tel:+19053246652" aria-label="Call Emmanuel">
                    <FontAwesomeIcon icon={faPhone} />
                  </a>
                  <a
                    href="https://www.emmanuelakinlosotu.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Emmanuel's Website"
                  >
                    <FontAwesomeIcon icon={faGlobe} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className={styles.testimonials}>
          <div className={`${styles.container} ${styles.testimonialContainer}`}>
            <h2
              className={`${styles.scrollReveal} ${styles.delay1}`}
              ref={(el) => addToRefs(el, 14)}
            >
              What Our Clients Say
            </h2>

            {/* Testimonial 1 */}
            <div
              className={`${styles.testimonial} ${styles.scrollReveal} ${styles.delay2}`}
              ref={(el) => addToRefs(el, 15)}
            >
              <blockquote>
                &quot;Working with Favour and Emmanuel was a game-changer for
                our online presence. Their strategic approach and technical
                skill delivered results beyond our expectations.&quot;
              </blockquote>
              <cite>– Satisfied Client A, Niagara Falls</cite>
            </div>

            {/* Testimonial 2 */}
            <div
              className={`${styles.testimonial} ${styles.scrollReveal} ${styles.delay3}`}
              ref={(el) => addToRefs(el, 16)}
            >
              <blockquote>
                &quot;The custom software they developed streamlined our
                operations significantly. Highly professional and innovative
                team based right here in St. Catharines!&quot;
              </blockquote>
              <cite>– Business Owner B, St. Catharines</cite>
            </div>
          </div>
        </section>

        {/* Contact Section (Add this instead of just having footer) */}
        <section id="contact" className={styles.contact}>
          <div className={styles.container}>
            <h2
              className={`${styles.scrollReveal} ${styles.delay1}`}
              ref={(el) => addToRefs(el, 23)}
            >
              Get In Touch
            </h2>
            <p
              className={`${styles.centeredText} ${styles.scrollReveal} ${styles.delay2}`}
              ref={(el) => addToRefs(el, 24)}
            >
              Ready to elevate your digital presence? Reach out to discuss how
              we can help your business grow.
            </p>

            <div
              className={`${styles.contactGrid} ${styles.scrollReveal} ${styles.delay3}`}
              ref={(el) => addToRefs(el, 25)}
            >
              <div className={styles.contactInfo}>
                <h3>Contact Information</h3>
                <div className={styles.contactItem}>
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className={styles.contactIcon}
                  />
                  <div>
                    <h4>Email Us</h4>
                    <a href="mailto:iranolafavour17@gmail.com">
                      iranolafavour17@gmail.com
                    </a>
                    <br />
                    <a href="mailto:emmanuelakinlosotu12@gmail.com">
                      emmanuelakinlosotu12@gmail.com
                    </a>
                  </div>
                </div>

                <div className={styles.contactItem}>
                  <FontAwesomeIcon
                    icon={faPhone}
                    className={styles.contactIcon}
                  />
                  <div>
                    <h4>Call Us</h4>
                    <a href="tel:+13658802271">+1 (365) 880-2271</a> (Favour)
                    <br />
                    <a href="tel:+19053246652">+1 (905) 324-6652</a> (Emmanuel)
                  </div>
                </div>

                <div className={styles.contactItem}>
                  <FontAwesomeIcon
                    icon={faMapMarkerAlt}
                    className={styles.contactIcon}
                  />
                  <div>
                    <h4>Location</h4>
                    <p>Serving the Niagara Region, Ontario</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Updated Footer */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerGrid}>
            <div
              className={`${styles.footerCol} ${styles.scrollReveal} ${styles.delay1}`}
              ref={(el) => addToRefs(el, 26)}
            >
              <h3>X Niagara</h3>
              <p>
                Digital excellence for the Niagara Region. We blend technology
                and marketing expertise to help local businesses thrive in the
                digital landscape.
              </p>
            </div>

            <div
              className={`${styles.footerCol} ${styles.scrollReveal} ${styles.delay2}`}
              ref={(el) => addToRefs(el, 27)}
            >
              <h3>Connect with Favour</h3>
              <ul className={styles.footerLinks}>
                <li>
                  <FontAwesomeIcon
                    icon={faLinkedin}
                    className={styles.footerIcon}
                  />
                  <a
                    href="https://www.linkedin.com/in/favouriranola/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <FontAwesomeIcon
                    icon={faPhone}
                    className={styles.footerIcon}
                  />
                  <a href="tel:+13658802271">+1 (365) 880-2271</a>
                </li>
                <li>
                  <FontAwesomeIcon
                    icon={faGlobe}
                    className={styles.footerIcon}
                  />
                  <a
                    href="https://favouriranolaportfolio.my.canva.site/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Personal Website
                  </a>
                </li>
              </ul>
            </div>

            <div
              className={`${styles.footerCol} ${styles.scrollReveal} ${styles.delay3}`}
              ref={(el) => addToRefs(el, 28)}
            >
              <h3>Connect with Emmanuel</h3>
              <ul className={styles.footerLinks}>
                <li>
                  <FontAwesomeIcon
                    icon={faLinkedin}
                    className={styles.footerIcon}
                  />
                  <a
                    href="https://www.linkedin.com/in/emanakin/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <FontAwesomeIcon
                    icon={faPhone}
                    className={styles.footerIcon}
                  />
                  <a href="tel:+19053246652">+1 (905) 324-6652</a>
                </li>
                <li>
                  <FontAwesomeIcon
                    icon={faGlobe}
                    className={styles.footerIcon}
                  />
                  <a
                    href="https://www.emmanuelakinlosotu.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Personal Website
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div
            className={`${styles.copyright} ${styles.scrollReveal} ${styles.delay4}`}
            ref={(el) => addToRefs(el, 29)}
          >
            &copy; {currentYear} X Niagara by Favour & Emmanuel. All Rights
            Reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
