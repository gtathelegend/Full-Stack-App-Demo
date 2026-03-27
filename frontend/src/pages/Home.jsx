import { useNavigate } from 'react-router-dom'
import styles from './Home.module.css'

// Icons as inline SVGs
const ShieldIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <path d="M9 12l2 2 4-4"/>
  </svg>
)

const LayoutIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2"/>
    <path d="M3 9h18"/>
    <path d="M9 21V9"/>
  </svg>
)

const ZapIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
)

const ServerIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="8" rx="2"/>
    <rect x="2" y="14" width="20" height="8" rx="2"/>
    <line x1="6" y1="6" x2="6.01" y2="6"/>
    <line x1="6" y1="18" x2="6.01" y2="18"/>
  </svg>
)

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
)

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

const features = [
  {
    icon: <ShieldIcon />,
    title: 'Secure Authentication',
    description: 'Industry-standard JWT-based login with bcrypt password hashing. Your data stays protected with encryption at rest and in transit.',
  },
  {
    icon: <LayoutIcon />,
    title: 'Intuitive Dashboard',
    description: 'Manage tasks, leads, and users from a unified workspace. Clean data visualization with real-time updates.',
  },
  {
    icon: <ZapIcon />,
    title: 'Fast & Responsive',
    description: 'Built with React and Vite for lightning-fast performance. Every interaction feels instant and smooth.',
  },
  {
    icon: <ServerIcon />,
    title: 'Scalable Architecture',
    description: 'Node.js backend with MongoDB handles thousands of requests. Start small, grow without limits.',
  },
]

const steps = [
  { number: '01', title: 'Create your account', description: 'Sign up in seconds with just your name, email, and a secure password.' },
  { number: '02', title: 'Log in securely', description: 'Access your personalized dashboard with JWT-protected authentication.' },
  { number: '03', title: 'Manage your workspace', description: 'Create tasks, track leads, and collaborate with your team effortlessly.' },
]

export const Home = () => {
  const navigate = useNavigate()

  return (
    <div className={styles.page}>
      {/* Navigation */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logo}>
            <div className={styles.logoMark}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" rx="1"/>
                <rect x="14" y="3" width="7" height="7" rx="1"/>
                <rect x="14" y="14" width="7" height="7" rx="1"/>
                <rect x="3" y="14" width="7" height="7" rx="1"/>
              </svg>
            </div>
            <span className={styles.logoText}>SecureFlow</span>
          </div>
          <nav className={styles.nav}>
            <button className={styles.navLoginBtn} onClick={() => navigate('/login')}>
              Log in
            </button>
            <button className={styles.navSignupBtn} onClick={() => navigate('/signup')}>
              Get started
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <span className={styles.heroBadgeDot} />
            Authentication made simple
          </div>
          <h1 className={styles.heroTitle}>
            Smart Authentication
            <br />
            <span className={styles.heroTitleAccent}>Dashboard</span>
          </h1>
          <p className={styles.heroDescription}>
            A modern workspace for managing tasks, leads, and users — all behind secure,
            JWT-powered authentication. Built for teams who value clarity and speed.
          </p>
          <div className={styles.heroCta}>
            <button className={styles.heroPrimaryBtn} onClick={() => navigate('/signup')}>
              Get started free
              <ArrowIcon />
            </button>
            <button className={styles.heroSecondaryBtn} onClick={() => navigate('/login')}>
              Sign in to dashboard
            </button>
          </div>
          <p className={styles.heroNote}>No credit card required · Free forever plan available</p>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.heroCard}>
            <div className={styles.heroCardHeader}>
              <div className={styles.heroCardDots}>
                <span></span><span></span><span></span>
              </div>
            </div>
            <div className={styles.heroCardContent}>
              <div className={styles.mockStat}>
                <span className={styles.mockLabel}>Total Leads</span>
                <span className={styles.mockValue}>2,847</span>
              </div>
              <div className={styles.mockStat}>
                <span className={styles.mockLabel}>Tasks Done</span>
                <span className={styles.mockValue}>1,392</span>
              </div>
              <div className={styles.mockStat}>
                <span className={styles.mockLabel}>Active Users</span>
                <span className={styles.mockValue}>48</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Everything you need</h2>
          <p className={styles.sectionSubtitle}>
            Powerful features wrapped in a clean, intuitive interface
          </p>
        </div>
        <div className={styles.featureGrid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.featureCard}>
              <div className={styles.featureIcon}>{feature.icon}</div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className={styles.howItWorks}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Get started in minutes</h2>
          <p className={styles.sectionSubtitle}>
            Three simple steps to your productive workspace
          </p>
        </div>
        <div className={styles.stepsGrid}>
          {steps.map((step, index) => (
            <div key={index} className={styles.step}>
              <span className={styles.stepNumber}>{step.number}</span>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDescription}>{step.description}</p>
              {index < steps.length - 1 && <div className={styles.stepConnector} />}
            </div>
          ))}
        </div>
      </section>

      {/* Trust Section */}
      <section className={styles.trust}>
        <div className={styles.trustContent}>
          <h2 className={styles.trustTitle}>Built on modern technology</h2>
          <p className={styles.trustDescription}>
            Reliable, scalable, and maintainable — the stack professionals trust
          </p>
          <div className={styles.techBadges}>
            {['React', 'Vite', 'Node.js', 'MongoDB', 'JWT'].map((tech) => (
              <span key={tech} className={styles.techBadge}>
                <CheckIcon /> {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>Ready to streamline your workflow?</h2>
          <p className={styles.ctaDescription}>
            Join thousands of teams who switched to SecureFlow for better organization and security.
          </p>
          <button className={styles.ctaButton} onClick={() => navigate('/signup')}>
            Start for free
            <ArrowIcon />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerBrand}>
            <div className={styles.logoMark}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" rx="1"/>
                <rect x="14" y="3" width="7" height="7" rx="1"/>
                <rect x="14" y="14" width="7" height="7" rx="1"/>
                <rect x="3" y="14" width="7" height="7" rx="1"/>
              </svg>
            </div>
            <span className={styles.footerLogoText}>SecureFlow</span>
          </div>
          <p className={styles.footerTagline}>
            Modern authentication dashboard for productive teams
          </p>
          <div className={styles.footerTech}>
            <span>Built with</span>
            <span className={styles.footerTechItem}>React</span>
            <span className={styles.footerDot} />
            <span className={styles.footerTechItem}>Node.js</span>
            <span className={styles.footerDot} />
            <span className={styles.footerTechItem}>MongoDB</span>
          </div>
          <p className={styles.footerCopyright}>
            © 2026 SecureFlow. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
