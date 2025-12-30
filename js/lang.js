/**
 * Internationalization (i18n) Manager
 * Handles language switching and text updates.
 */

const translations = {
    en: {
        "nav.home": "Home",
        "nav.about": "About",
        "nav.resume": "Resume",
        "nav.services": "Services",
        "nav.portfolio": "Portfolio",
        "nav.contact": "Contact",
        "hero.title": "Juan Chocce",
        "hero.subtitle": "I'm a Data Analyst, Systems Engineer, Business Intelligence Analyst",
        "about.title": "About",
        "about.role": "Business Intelligence & Data Analyst",
        "about.desc1": "Business Intelligence Analyst and Systems Engineer with a strong track record in the Pharmaceutical & Retail sectors.",
        "about.desc2": "Specialist in Data Storytelling: transforming complex data ecosystems into clear commercial strategies, bridging the gap between technology and business.",
        "about.desc3": "Expert in process automation (Python) and visualization (Tableau/Power BI), achieving 60% operational efficiencies.",
        "about.desc4": "Focused on scaling towards Data Science by applying Machine Learning and Web Scraping to empower competitive decision-making.",
        "facts.title": "Facts",
        "facts.desc": "Throughout my life I have known many tourist places in my country, met several professionals, carried out personal projects and finished my professional career.",
        "facts.followers": "Followers",
        "facts.projects": "Projects",
        "facts.experience": "Years of Experience",
        "skills.title": "Skills",
        "skills.desc": "These are the skills that I have been able to study and develop throughout my career so far.",
        "resume.title": "Resume",
        "resume.summary": "Summary",
        "resume.education": "Education",
        "resume.SI": "Systems Engineer",
        "resume.professional_experience": "Professional Experience",
        "resume.desc1": "Data Engineering: ETL pipelines with Python & SQL.",
        "resume.desc2": "Process Optimization: Improved query times by 40%.",
        "resume.desc3": "Reporting: Tableau dashboards for Sales.",
        "resume.desc4": "Innovation: Web Scraping for medical schedules.",
        "portfolio.title": "Portfolio",
        "contact.title": "Contact",
        "contact.location": "Location:",
        "contact.email": "Email:",
        "contact.call": "Call:",
        "contact.btn": "Send Message"
    },
    es: {
        "nav.home": "Inicio",
        "nav.about": "Sobre Mí",
        "nav.resume": "Resumen",
        "nav.services": "Servicios",
        "nav.portfolio": "Portafolio",
        "nav.contact": "Contacto",
        "hero.title": "Juan Chocce",
        "hero.subtitle": "Soy Analista de Datos, Ingeniero de Sistemas, Analista de Inteligencia de Negocios",
        "about.title": "Sobre Mí",
        "about.role": "Inteligencia de Negocios y Analista de Datos",
        "about.desc1": "Analista de Business Intelligence e Ingeniero de Sistemas con sólida trayectoria en sectores Farmacéutico y Retail.",
        "about.desc2": "Especialista en Data Storytelling: transformando ecosistemas de datos complejos en estrategias comerciales claras.",
        "about.desc3": "Experto en automatización de procesos (Python) y visualización (Tableau/Power BI), logrando eficiencias operativas del 60%.",
        "about.desc4": "Enfocado en escalar hacia Data Science aplicando Machine Learning y Web Scraping para potenciar la toma de decisiones.",
        "facts.title": "Datos",
        "facts.desc": "A lo largo de mi vida he conocido muchos lugares turísticos de mi país, conocido a varios profesionales, realizado proyectos personales y finalizado mi carrera profesional.",
        "facts.followers": "Seguidores",
        "facts.projects": "Proyectos",
        "facts.experience": "Años de Experiencia",
        "skills.title": "Habilidades",
        "skills.desc": "Estas son las habilidades que he podido estudiar y desarrollar a lo largo de mi carrera.",
        "resume.title": "Resumen",
        "resume.summary": "Resumen Profesional",
        "resume.education": "Educación",
        "resume.SI": "Ingeniero de Sistemas",
        "resume.professional_experience": "Experiencia Profesional",
        "resume.desc1": "Ingenieria de Datos: ETL pipelines con Python & SQL.",
        "resume.desc2": "Optimización de Procesos: Mejoramiento de tiempos de consulta en 40%.",
        "resume.desc3": "Reportes: Tableau dashboards para Ventas.",
        "resume.desc4": "Innovación: Web Scraping para horarios médicos.",
        "portfolio.title": "Portafolio",
        "contact.title": "Contacto",
        "contact.location": "Ubicación:",
        "contact.email": "Correo:",
        "contact.call": "Llamar:",
        "contact.btn": "Enviar Mensaje"
    }
};

export function initLang() {
    const langBtns = document.querySelectorAll('.lang-btn');

    // Set initial state based on localStorage or Browser
    const savedLang = localStorage.getItem('lang') || (navigator.language.startsWith('es') ? 'es' : 'en');
    setLanguage(savedLang);

    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            setLanguage(lang);
        });
    });
}

function setLanguage(lang) {
    // Update active state of buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Persist
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;

    // Update Text
    const data = translations[lang];
    const elements = document.querySelectorAll('[data-i18n]');

    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (data[key]) {
            el.textContent = data[key];
        }
    });
}
