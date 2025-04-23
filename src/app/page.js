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
} from "@fortawesome/free-solid-svg-icons";
import {
  faLinkedin,
  faInstagram,
  faTwitter,
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

  // Add to refs for scroll reveal
  const addToRefs = (el, index) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

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
          <nav
            className={`${styles.nav} ${mobileMenuOpen ? styles.active : ""}`}
          >
            <ul>
              <li>
                <a href="#hero">Home</a>
              </li>
              <li>
                <a href="#intro">About</a>
              </li>
              <li>
                <a href="#services">Services</a>
              </li>
              <li>
                <a href="#case-studies">Portfolio</a>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
              <li>
                <Link href="/blog">Blog</Link>
              </li>
            </ul>
          </nav>

          {/* Mobile menu toggle with state */}
          <button
            className={styles.menuToggle}
            aria-label="Toggle navigation"
            onClick={toggleMobileMenu}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section id="hero" className={styles.hero}>
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
              <Link
                href="/contact"
                className={`${styles.btn} ${styles.btnPrimary}`}
              >
                Book a Consultation
              </Link>
              <Link
                href="#case-studies"
                className={`${styles.btn} ${styles.btnSecondary}`}
              >
                View Our Work
              </Link>
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
              <Link
                href="/about"
                className={`${styles.btn} ${styles.btnPrimary}`}
              >
                Learn More About Us
              </Link>
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
              className={`${styles.scrollReveal} ${styles.delay1}`}
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
              We're proud to partner with innovative companies in St.
              Catharines, Niagara Falls, and beyond, helping them achieve
              digital success.
            </p>
            <div
              className={`${styles.clientLogos} ${styles.scrollReveal} ${styles.delay3}`}
              ref={(el) => addToRefs(el, 12)}
            >
              <Image
                src="/images/client-1.png"
                alt="Client Logo 1"
                width={150}
                height={50}
              />
              <Image
                src="/images/client-2.png"
                alt="Client Logo 2"
                width={150}
                height={50}
              />
              <Image
                src="/images/client-3.png"
                alt="Client Logo 3"
                width={150}
                height={50}
              />
              <Image
                src="/images/client-4.png"
                alt="Client Logo 4"
                width={150}
                height={50}
              />
              <Image
                src="/images/client-5.png"
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

        {/* Client Testimonials Section (Dark Background) */}
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
      </main>

      {/* Footer with improved visibility */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div
            className={`${styles.socialLinks} ${styles.scrollReveal} ${styles.delay1}`}
            ref={(el) => addToRefs(el, 17)}
          >
            <Link href="https://linkedin.com" aria-label="LinkedIn Profile">
              <FontAwesomeIcon icon={faLinkedin} />
            </Link>
            <Link href="https://instagram.com" aria-label="Instagram Profile">
              <FontAwesomeIcon icon={faInstagram} />
            </Link>
            <Link href="https://twitter.com" aria-label="Twitter Profile">
              <FontAwesomeIcon icon={faTwitter} />
            </Link>
          </div>
          <div
            className={`${styles.footerContact} ${styles.scrollReveal} ${styles.delay2}`}
            ref={(el) => addToRefs(el, 18)}
          >
            <p>
              <FontAwesomeIcon icon={faEnvelope} />{" "}
              <a href="mailto:info@xniagara.ca">info@xniagara.ca</a>
            </p>
            <p>
              <FontAwesomeIcon icon={faPhone} />{" "}
              <a href="tel:+19055551234">+1 (905) 555-1234</a>
            </p>
            <p>
              <FontAwesomeIcon icon={faMapMarkerAlt} /> Serving the Niagara
              Region, Ontario
            </p>
          </div>
          <div
            className={`${styles.copyright} ${styles.scrollReveal} ${styles.delay3}`}
            ref={(el) => addToRefs(el, 19)}
          >
            &copy; {currentYear} X Niagara by Favour & Emmanuel. All Rights
            Reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
