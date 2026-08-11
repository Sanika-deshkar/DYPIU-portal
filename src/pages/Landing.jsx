import { User, Landmark, ArrowRight } from 'lucide-react'
import './Landing.css'

const portals = [
  {
    title: 'Faculty Appraisal Portal',
    description: 'Access the Faculty Performance Based Appraisal System.',
    href: 'https://pbas.dypiu.ac.in/login',
    icon: User,
  },
  {
    title: 'School Appraisal Portal',
    description: 'Access the School Performance Based Appraisal System.',
    href: 'https://pbas.dypiu.ac.in/AAA/login',
    icon: Landmark,
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
