import { User, Landmark, GraduationCap, ArrowRight } from 'lucide-react'
import './Landing.css'

const portals = [
  {
    title: 'Faculty Appraisal Portal',
    description: 'Access the Faculty Performance Based Appraisal System.',
    href: import.meta.env.VITE_FACULTY_PORTAL_URL || 'https://pbas.dypiu.ac.in/login',
    icon: User,
  },
  {
    title: 'Academic and Administrative Audit Portal',
    description: 'Access the Academic and administrative Audit System.',
    href: import.meta.env.VITE_SCHOOL_PORTAL_URL || 'https://pbas.dypiu.ac.in/AAA/login',
    icon: Landmark,
  },
  {
    title: 'OBE Portal',
    description: 'Access the Outcome Based Education System.',
    href: import.meta.env.VITE_OBE_PORTAL_URL || 'https://pbas.dypiu.ac.in/nba/login',
    icon: GraduationCap,
  },
]

function Landing() {
  return (
    <div className="landing">
      <div className="landing-bg" />
      <div className="landing-overlay" />

      <header className="topbar">
        <img src="/image.png" alt="D Y Patil International University" className="brand-logo" />
        <img src="/IQAS.png" alt="IQAC" className="iqac-logo" />
      </header>

      <main className="content">
        <h1>Welcome to D. Y. Patil International University, Pune</h1>
        <p className="subtitle">Choose a portal to access the performance appraisal system.</p>

        <div className="cards">
          {portals.map(({ title, description, href, icon: Icon }) => (
            <div className="card" key={title}>
              <div className="card-icon">
                <Icon size={28} strokeWidth={1.75} />
              </div>
              <h2>{title}</h2>
              <p>{description}</p>
              <a className="card-btn" href={href} target="_blank" rel="noopener noreferrer">
                Go to Portal <ArrowRight size={18} />
              </a>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default Landing
