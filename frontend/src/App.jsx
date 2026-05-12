import { useState, useEffect } from "react";

// ── Data ────────────────────────────────────────────────────────────────────

const NAV_LINKS = ["home", "about", "skills", "projects", "experience", "contact"];

const SKILLS = {
  "Front-end": "HTML, CSS, JavaScript, jQuery, Bootstrap",
  "Back-end": "C, C++, Python, Java",
  Frameworks: "Django, REST API",
  Database: "MySQL, SQLite",
  Testing: "Manual, Automation (Selenium), JMeter",
  "Version Control": "Git, GitHub",
  Methodologies: "Agile, Scrum, Jira",
  Deployment: "Render, AWS (Solution Architect)",
  "Design Tools": "Figma, Adobe XD, Photoshop, Illustrator, InDesign, CorelDRAW",
};

const PROJECTS = [
  {
    title: "Student Progress Tracker Web App",
    img: "https://www.jotform.com/blog/wp-content/uploads/2021/09/How-to-track-student-progress-1-700x424.png",
    desc: "A Django-based platform for tracking academic performance. Includes secure role-based login, student progress modules, and deployment on Render.",
    stack: "Django, HTML, CSS, JS, SQLite",
  },
  {
    title: "Story2Soul — Creative Digital Agency Website",
    img: "https://qit.software/wp-content/uploads/2023/05/1111-1.jpg.webp",
    desc: "Story2Soul is a creative digital agency website that offers complete digital solutions including Website Development, UI/UX Design, Digital Marketing, and Photography services. The platform is designed to help businesses build their online presence and showcase their brand effectively.",
    stack: "Django, HTML, CSS, JavaScript, jQuery, Bootstrap, SQLite",
    link: "https://project-frontend-story2soul.onrender.com/"
  },
];

const EXPERIENCES = [
  {
    role: "Full Stack Web Developer – Python",
    company: "IRG INFOTEC",
    period: "Feb 2025 – Present",
    points: [
      "Developing and maintaining full-stack web applications using the Django framework.",
      "Designing and building RESTful APIs to support frontend and third-party integrations.",
      "Collaborating with cross-functional teams to deliver scalable backend solutions.",
      "Implementing database models, authentication systems, and deployment workflows.",
      "Ensuring code quality through version control best practices using Git/GitHub.",
    ],
  },
  {
    role: "Technical Trainer",
    company: "G-TEC Education",
    period: "Feb 2023 – Present",
    points: [
      "Delivered 200+ hours of practical training in Full Stack, UI/UX, and Software Testing.",
      "Developed and deployed web apps using Django, HTML/CSS/JS, and SQLite.",
      "Guided Agile-based internships using Jira for sprint planning and GitHub for collaboration.",
      "Mentored students on API integration, real-time deployment, and career readiness.",
      "Created structured training materials and tech workshops aligned with industry needs.",
    ],
  },
];

// ── Styles (CSS-in-JS object) ────────────────────────────────────────────────

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

  :root {
    --navy: #0a0f1e;
    --navy2: #111827;
    --accent: #38bdf8;
    --accent2: #818cf8;
    --text: #e2e8f0;
    --muted: #94a3b8;
    --card-bg: #161e2e;
    --border: rgba(56,189,248,0.15);
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  html { scroll-behavior: smooth; }

  body {
    background: var(--navy);
    color: var(--text);
    font-family: 'DM Sans', sans-serif;
  }

  h1,h2,h3,h4,h5,h6 { font-family: 'Syne', sans-serif; }

  /* ── Navbar ── */
  .am-nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 999;
    background: rgba(10,15,30,0.85);
    backdrop-filter: blur(14px);
    border-bottom: 1px solid var(--border);
    padding: 0.75rem 0;
  }
  .am-brand {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: 1.3rem;
    color: var(--accent) !important;
    letter-spacing: -0.5px;
    text-decoration: none;
  }
  .am-nav .nav-link {
    color: var(--muted) !important;
    font-size: 0.88rem;
    font-weight: 500;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    padding: 0.4rem 0.75rem !important;
    border-radius: 6px;
    transition: color 0.2s, background 0.2s;
  }
  .am-nav .nav-link:hover {
    color: var(--accent) !important;
    background: rgba(56,189,248,0.07);
  }

  /* ── Hero ── */
 #home {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 60px;
    padding-bottom: 2rem;
    background: radial-gradient(ellipse 70% 60% at 60% 40%, rgba(56,189,248,0.08) 0%, transparent 70%),
                radial-gradient(ellipse 50% 40% at 10% 80%, rgba(129,140,248,0.07) 0%, transparent 60%),
                var(--navy);
    text-align: center;
  }
  .hero-img {
    width: 130px; height: 130px;
    border-radius: 50%;
    border: 3px solid var(--accent);
    object-fit: cover;
    box-shadow: 0 0 40px rgba(56,189,248,0.25);
    margin-bottom: 1rem;
  }
  @media (max-width: 767px) {
    .hero-img { width: 100px; height: 100px; }
    .hero-badge { margin-bottom: 0.8rem; font-size: 0.72rem; }
  }
  .hero-title {
    font-size: clamp(1.5rem, 7vw, 3.5rem);
    font-weight: 800;
    line-height: 1.2;
    margin-bottom: 0.75rem;
    white-space: nowrap;
  }
  .hero-title span { color: var(--accent); }
  .hero-subtitle {
    color: var(--muted);
    font-size: clamp(0.65rem, 3vw, 1.15rem);
    margin-bottom: 2rem;
    white-space: nowrap;
    padding: 0 0.5rem;
  }
  .hero-badge {
    display: inline-block;
    background: rgba(56,189,248,0.1);
    border: 1px solid var(--border);
    color: var(--accent);
    border-radius: 999px;
    padding: 0.3rem 1rem;
    font-size: 0.8rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    margin-bottom: 0.8rem;
  }

  /* ── Section common ── */
  section { padding: 5rem 0; }
  .section-title {
    font-size: clamp(1.7rem, 3vw, 2.3rem);
    font-weight: 800;
    margin-bottom: 0.5rem;
  }
  .section-title span { color: var(--accent); }
  .section-divider {
    width: 48px; height: 3px;
    background: var(--accent);
    border-radius: 2px;
    margin: 0 auto 2.5rem;
  }

  /* ── About ── */
  #about { background: var(--navy2); }
  .about-text {
    color: var(--muted);
    font-size: 1.05rem;
    line-height: 1.9;
    max-width: 750px;
    margin: 0 auto;
  }
  .about-text strong { color: var(--text); }

  /* ── Skills ── */
  #skills { background: var(--navy); }
  .skill-card {
    background: var(--card-bg);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 1.1rem 1.4rem;
    margin-bottom: 0.9rem;
    transition: border-color 0.2s, transform 0.2s;
  }
  .skill-card:hover { border-color: var(--accent); transform: translateY(-2px); }
  .skill-label { color: var(--accent); font-weight: 600; font-size: 0.82rem; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.25rem; }
  .skill-value { color: var(--text); font-size: 0.93rem; }

  /* ── Projects ── */
  #projects { background: var(--navy2); }
  .proj-card {
    background: var(--card-bg);
    border: 1px solid var(--border);
    border-radius: 14px;
    overflow: hidden;
    height: 100%;
    transition: border-color 0.25s, transform 0.25s, box-shadow 0.25s;
  }
  .proj-card:hover {
    border-color: var(--accent);
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(56,189,248,0.12);
  }
  .proj-card img { width: 100%; height: 200px; object-fit: cover; }
  .proj-body { padding: 1.4rem; }
  .proj-title { font-size: 1rem; font-weight: 700; margin-bottom: 0.6rem; color: var(--text); }
  .proj-desc { color: var(--muted); font-size: 0.88rem; line-height: 1.7; margin-bottom: 1rem; }
  .proj-stack {
    display: inline-block;
    background: rgba(56,189,248,0.1);
    border: 1px solid var(--border);
    color: var(--accent);
    border-radius: 6px;
    padding: 0.25rem 0.75rem;
    font-size: 0.75rem;
    letter-spacing: 0.03em;
  }

  /* ── Experience ── */
  #experience { background: var(--navy); }
  .exp-card {
    background: var(--card-bg);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 1.75rem 2rem;
    margin-bottom: 1.25rem;
    position: relative;
    overflow: hidden;
    transition: border-color 0.2s;
  }
  .exp-card::before {
    content: '';
    position: absolute; left: 0; top: 0; bottom: 0;
    width: 3px;
    background: linear-gradient(to bottom, var(--accent), var(--accent2));
    border-radius: 2px;
  }
  .exp-card:hover { border-color: var(--accent); }
  .exp-role { font-size: 1.1rem; font-weight: 700; color: var(--text); margin-bottom: 0.15rem; }
  .exp-company { color: var(--accent); font-weight: 600; font-size: 0.95rem; }
  .exp-period { color: var(--muted); font-size: 0.82rem; margin-bottom: 1rem; }
  .exp-card ul { padding-left: 1.25rem; }
  .exp-card li { color: var(--muted); font-size: 0.9rem; line-height: 1.75; margin-bottom: 0.3rem; }

  /* ── Contact ── */
  #contact { background: var(--navy2); }
  .contact-link {
    color: var(--text);
    text-decoration: none;
    transition: color 0.2s;
  }
  .contact-link:hover { color: var(--accent); }
  .contact-info {
    color: var(--muted);
    font-size: 1rem;
    margin-bottom: 0.6rem;
  }
  .contact-info strong { color: var(--text); }

  /* ── Buttons ── */
  .btn-am-primary {
    background: var(--accent);
    color: var(--navy);
    border: none;
    border-radius: 8px;
    padding: 0.55rem 1.4rem;
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 0.85rem;
    letter-spacing: 0.03em;
    text-decoration: none;
    transition: opacity 0.2s, transform 0.2s;
    display: inline-block;
  }
  .btn-am-primary:hover { opacity: 0.85; transform: translateY(-1px); color: var(--navy); }
  .btn-am-outline {
    background: transparent;
    color: var(--accent);
    border: 1px solid var(--accent);
    border-radius: 8px;
    padding: 0.55rem 1.4rem;
    font-family: 'Syne', sans-serif;
    font-weight: 600;
    font-size: 0.85rem;
    letter-spacing: 0.03em;
    text-decoration: none;
    transition: background 0.2s, color 0.2s, transform 0.2s;
    display: inline-block;
  }
  .btn-am-outline:hover {
    background: rgba(56,189,248,0.1);
    transform: translateY(-1px);
    color: var(--accent);
  }

  /* ── Footer ── */
  footer {
    background: var(--navy);
    border-top: 1px solid var(--border);
    padding: 1.25rem 0;
    text-align: center;
    color: var(--muted);
    font-size: 0.85rem;
  }

  /* ── Contact Form Inputs ── */
  .am-input {
    width: 100%;
    background: rgba(255,255,255,0.04);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 0.65rem 0.9rem;
    color: var(--text);
    font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem;
    transition: border-color 0.2s, box-shadow 0.2s;
    outline: none;
    resize: vertical;
  }
  .am-input::placeholder { color: var(--muted); }
  .am-input:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px rgba(56,189,248,0.12);
  }

  /* ── Alert boxes ── */
  .alert-success {
    background: rgba(56,189,248,0.1);
    border: 1px solid var(--accent);
    border-radius: 10px;
    padding: 1rem 1.25rem;
    margin-bottom: 1.25rem;
    color: var(--accent);
    font-size: 0.92rem;
  }
  .alert-error {
    background: rgba(248,113,113,0.08);
    border: 1px solid rgba(248,113,113,0.4);
    border-radius: 10px;
    padding: 1rem 1.25rem;
    margin-bottom: 1.25rem;
    color: #f87171;
    font-size: 0.92rem;
  }

  /* ── Mobile tweaks ── */
  @media (max-width: 767px) {
    section { padding: 3.5rem 0; }
    .exp-card { padding: 1.25rem 1.25rem 1.25rem 1.5rem; }
  }
`;

// ── Components ───────────────────────────────────────────────────────────────

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="am-nav">
      <div className="container d-flex justify-content-between align-items-center">
        <a href="#home" className="am-brand">Aswin M</a>

        {/* Mobile toggle */}
        <button
          className="navbar-toggler d-lg-none"
          style={{ background: "none", border: "1px solid var(--border)", borderRadius: 8, padding: "6px 10px", color: "var(--accent)" }}
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
        >
          <span style={{ display: "block", width: 20, height: 2, background: "currentColor", margin: "4px 0" }} />
          <span style={{ display: "block", width: 20, height: 2, background: "currentColor", margin: "4px 0" }} />
          <span style={{ display: "block", width: 20, height: 2, background: "currentColor", margin: "4px 0" }} />
        </button>

        {/* Desktop nav */}
        <ul className="navbar-nav flex-row gap-1 d-none d-lg-flex">
          {NAV_LINKS.map(l => (
            <li key={l} className="nav-item">
              <a href={`#${l}`} className="nav-link" style={{ textTransform: "capitalize" }}>{l}</a>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="container d-lg-none">
          <ul className="navbar-nav py-2">
            {NAV_LINKS.map(l => (
              <li key={l} className="nav-item">
                <a
                  href={`#${l}`}
                  className="nav-link"
                  style={{ textTransform: "capitalize", padding: "0.6rem 0.5rem" }}
                  onClick={() => setOpen(false)}
                >
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  return (
    <section id="home">
      <div className="container">
        <div className="hero-badge">Available for opportunities</div>
        <img src="https://media.licdn.com/dms/image/v2/D5603AQFNnyXGzNMbEQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1698817705104?e=1779926400&v=beta&t=YX6PvnAT_pybe2INUOksqARB7q01e6WdWTfQZ_H_GcI" alt="Aswin M" className="hero-img" />
        <h1 className="hero-title">Hi, I'm <span>Aswin M</span></h1>
        <p className="hero-subtitle">Trainer &nbsp;·&nbsp; Full Stack Dev &nbsp;·&nbsp; UI/UX Designer</p>
        <div className="d-flex flex-wrap gap-2 justify-content-center">
          <a href="https://www.linkedin.com/in/aswinm2305/" target="_blank" rel="noreferrer" className="btn-am-primary">LinkedIn</a>
          <a href="https://github.com/aswin2305" target="_blank" rel="noreferrer" className="btn-am-outline">GitHub</a>
          <a href="https://www.behance.net/gallery/227556641/Design-Portfolio-Branding-UIUX-Graphics-Aswin-M" target="_blank" rel="noreferrer" className="btn-am-outline">Behance</a>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about">
      <div className="container text-center">
        <h2 className="section-title">About <span>Me</span></h2>
        <div className="section-divider" />
        <p className="about-text">
          I'm a <strong>Technical Trainer</strong> with 2+ years of experience in web development and training.
          Skilled in <strong>HTML, CSS, JavaScript, Python (Django), Java,</strong> and <strong>UI/UX Design</strong>.
          I specialize in hands-on, project-based learning, mentoring students through real-world development under{" "}
          <strong>Agile Scrum</strong> methodology using tools like <strong>Git/GitHub, Jira, and AWS</strong>.
          Passionate about simplifying tech concepts and helping learners become industry-ready professionals.
        </p>
      </div>
    </section>
  );
}

function Skills() {
  const half = Math.ceil(Object.entries(SKILLS).length / 2);
  const left = Object.entries(SKILLS).slice(0, half);
  const right = Object.entries(SKILLS).slice(half);

  return (
    <section id="skills">
      <div className="container">
        <div className="text-center">
          <h2 className="section-title">My <span>Skills</span></h2>
          <div className="section-divider" />
        </div>
        <div className="row">
          <div className="col-md-6">
            {left.map(([k, v]) => (
              <div key={k} className="skill-card">
                <div className="skill-label">{k}</div>
                <div className="skill-value">{v}</div>
              </div>
            ))}
          </div>
          <div className="col-md-6">
            {right.map(([k, v]) => (
              <div key={k} className="skill-card">
                <div className="skill-label">{k}</div>
                <div className="skill-value">{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const openProject = (link) => {
    window.open(link, "_blank");
  };

  return (
    <section id="projects">
      <div className="container">
        <div className="text-center">
          <h2 className="section-title">
            Featured <span>Projects</span>
          </h2>
          <div className="section-divider" />
        </div>

        <div className="row g-4">
          {PROJECTS.map((p) => (
            <div key={p.title} className="col-md-6">
              <div
                className="proj-card"
                onClick={() => openProject(p.link)}
                style={{ cursor: "pointer" }}
              >
                <img src={p.img} alt={p.title} />
                <div className="proj-body">
                  <h5 className="proj-title">{p.title}</h5>
                  <p className="proj-desc">{p.desc}</p>
                  <span className="proj-stack">⚙ {p.stack}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience">
      <div className="container">
        <div className="text-center">
          <h2 className="section-title">Work <span>Experience</span></h2>
          <div className="section-divider" />
        </div>
        {EXPERIENCES.map((e) => (
          <div key={e.company} className="exp-card">
            <div className="exp-role">{e.role}</div>
            <div className="exp-company">{e.company}</div>
            <div className="exp-period">{e.period}</div>
            <ul>
              {e.points.map((pt, i) => <li key={i}>{pt}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/contact`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
        setErrorMsg(data.error || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Could not connect to server. Please try again later.");
    }
  };

  return (
    <section id="contact">
      <div className="container">

        {/* ── Section Header ── */}
        <div className="text-center">
          <h2 className="section-title">Get In <span>Touch</span></h2>
          <div className="section-divider" />
          <p style={{ color: "var(--muted)", marginBottom: "2.5rem", fontSize: "1.05rem" }}>
            Let's connect for training, collaboration, or development opportunities.
          </p>
        </div>

        <div className="row g-4 align-items-start">

          {/* ── Left: Contact Info ── */}
          <div className="col-md-4">
            <div className="exp-card" style={{ marginBottom: 0 }}>
              <h5 style={{ color: "var(--accent)", fontFamily: "Syne,sans-serif", marginBottom: "1.25rem" }}>
                Contact Info
              </h5>

              <div style={{ marginBottom: "1.1rem" }}>
                <div className="skill-label">📧 Email</div>
                <a href="mailto:aswinmohandas2305@gmail.com" className="contact-link" style={{ fontSize: "0.88rem", wordBreak: "break-all" }}>
                  aswinmohandas2305@gmail.com
                </a>
              </div>

              <div style={{ marginBottom: "1.1rem" }}>
                <div className="skill-label">📞 Phone</div>
                <span style={{ color: "var(--text)", fontSize: "0.9rem" }}>93635 10462</span>
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <div className="skill-label">📍 Location</div>
                <span style={{ color: "var(--text)", fontSize: "0.9rem" }}>Chennai, Tamil Nadu, India</span>
              </div>

              <div className="d-flex flex-wrap gap-2">
                <a href="https://www.linkedin.com/in/aswinm2305/" target="_blank" rel="noreferrer"
                  className="btn-am-primary" style={{ fontSize: "0.8rem", padding: "0.45rem 1rem" }}>LinkedIn</a>
                <a href="https://github.com/aswin2305" target="_blank" rel="noreferrer"
                  className="btn-am-outline" style={{ fontSize: "0.8rem", padding: "0.45rem 1rem" }}>GitHub</a>
                <a href="https://www.behance.net/gallery/227556641/Design-Portfolio-Branding-UIUX-Graphics-Aswin-M" target="_blank" rel="noreferrer"
                  className="btn-am-outline" style={{ fontSize: "0.8rem", padding: "0.45rem 1rem" }}>Behance</a>
              </div>
            </div>
          </div>

          {/* ── Right: Contact Form ── */}
          <div className="col-md-8">
            <div className="exp-card" style={{ marginBottom: 0 }}>
              <h5 style={{ color: "var(--accent)", fontFamily: "Syne,sans-serif", marginBottom: "1.5rem" }}>
                Send a Message
              </h5>

              {status === "success" && (
                <div className="alert-success">✅ Message sent! I'll get back to you soon.</div>
              )}
              {status === "error" && (
                <div className="alert-error">❌ {errorMsg}</div>
              )}

              <div className="row g-3">
                <div className="col-sm-6">
                  <label className="skill-label" style={{ display: "block", marginBottom: 6 }}>Your Name</label>
                  <input
                    type="text" name="name" value={form.name}
                    onChange={handleChange} placeholder="Aswin M"
                    className="am-input" required
                  />
                </div>
                <div className="col-sm-6">
                  <label className="skill-label" style={{ display: "block", marginBottom: 6 }}>Email Address</label>
                  <input
                    type="email" name="email" value={form.email}
                    onChange={handleChange} placeholder="you@email.com"
                    className="am-input" required
                  />
                </div>
                <div className="col-12">
                  <label className="skill-label" style={{ display: "block", marginBottom: 6 }}>Subject</label>
                  <input
                    type="text" name="subject" value={form.subject}
                    onChange={handleChange} placeholder="Collaboration / Training / Opportunity"
                    className="am-input" required
                  />
                </div>
                <div className="col-12">
                  <label className="skill-label" style={{ display: "block", marginBottom: 6 }}>Message</label>
                  <textarea
                    name="message" value={form.message}
                    onChange={handleChange} placeholder="Hi Aswin, I'd like to..."
                    className="am-input" rows={5} required
                  />
                </div>
                <div className="col-12">
                  <button
                    onClick={handleSubmit}
                    disabled={status === "loading"}
                    className="btn-am-primary"
                    style={{
                      width: "100%", textAlign: "center", padding: "0.7rem",
                      cursor: status === "loading" ? "not-allowed" : "pointer",
                      opacity: status === "loading" ? 0.7 : 1,
                      border: "none"
                    }}
                  >
                    {status === "loading" ? "Sending..." : "Send Message →"}
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
      <footer>
        <p>© 2025 Aswin M · All Rights Reserved</p>
      </footer>
    </>
  );
}
