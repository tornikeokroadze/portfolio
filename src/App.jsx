import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import {
  About,
  Contact,
  Experience,
  Feedbacks,
  Hero,
  Navbar,
  Tech,
  Works,
  StarsCanvas,
} from "./components";
import i18n from "./lang/i18n";
import { useTranslation } from "react-i18next";

const App = () => {
  const [currentLang, setCurrentLang] = useState("");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    const path = window.location.pathname;
    const languageURL = path.split("/")[1];

    const language = languageURL || savedLanguage || "en";
    setCurrentLang(language);
  }, []);

  useEffect(() => {
    if (currentLang) {
      localStorage.setItem("language", currentLang);
      i18n.changeLanguage(currentLang);
    }
  }, [currentLang]);

  const { t } = useTranslation();

  return (
    <HelmetProvider>
      <Helmet>
        <html lang={i18n.language} />
        <title>{t('Tornike Okroadze - Portfolio')}</title>

        <meta
          name="description"
          content={t(
            "Welcome to my portfolio. I am a Full Stack Web & Mobile Developer, showcasing my skills, projects, and experience."
          )}
        />
        <meta
          name="keywords"
          content={t(
            "Portfolio, Tornike, okroadze, Tornike Okroadze, Full Stack Web & Mobile Developer, Projects, Skills"
          )}
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content={t("Tornike Okroadze")} />

        <meta property="og:title" content={t("Tornike Okroadze - Portfolio")} />
        <meta
          property="og:description"
          content={t("Explore my projects, skills, and experience.")}
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://okroadze.netlify.app" />
        <meta
          property="og:image"
          content="https://okroadze.netlify.app/logo.png"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={t("Tornike Okroadze - Portfolio")}
        />
        <meta
          name="twitter:description"
          content={t("Explore my projects, skills, and experience.")}
        />
        <meta name="twitter:domain" content="https://okroadze.netlify.app" />
        <meta
          name="twitter:image"
          content="https://okroadze.netlify.app/logo.png"
        />

        <link rel="canonical" href={window.location.href} />

        <link rel="alternate" hreflang="en" href="https://okroadze.netlify.app/en/" />
        <link rel="alternate" hreflang="ka" href="https://okroadze.netlify.app/ka/" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Tornike Okroadze",
            url: "https://okroadze.netlify.app",
            sameAs: ["https://www.linkedin.com/in/tornike-okroadze-b0ba26277"],
            jobTitle: "Full Stack Web & Mobile Developer",
            image: "https://okroadze.netlify.app/logo.png",
          })}
        </script>
      </Helmet>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route
            path="/"
            element={<Navigate to={`/${currentLang}`} replace />}
          />
          <Route path="/:lang" element={<MainContent />} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
};

const MainContent = () => {
  return (
    <div className="relative z-0 bg-primary">
      <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
        <Navbar />
        <Hero />
      </div>
      <About />
      <Experience />
      <Tech />
      <Works />
      <Feedbacks />
      <div className="relative z-0">
        <Contact />
        <StarsCanvas />
      </div>
    </div>
  );
};

export default App;
