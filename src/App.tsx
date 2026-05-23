import React, { useState, useEffect } from "react";
import ProfileSection from "./components/ProfileSection";
import SkillsSection from "./components/SkillsSection";
import ProjectsSection from "./components/ProjectsSection";
import CVSection from "./components/CVSection";
import { ProfileInfo, Project, SkillCategory } from "./types";
import { DEFAULT_PROFILE, INITIAL_PROJECTS, SKILL_CATEGORIES } from "./data";
import { Terminal, Languages, TrendingUp, MonitorCheck, RotateCcw, ArrowUp, Briefcase, GraduationCap, Phone, Mail, MessageSquare, Copy, Check, ExternalLink, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [profile, setProfile] = useState<ProfileInfo>(DEFAULT_PROFILE);
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [skills, setSkills] = useState<SkillCategory[]>(SKILL_CATEGORIES);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    try {
      navigator.clipboard.writeText(text);
      setCopiedField(label);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (e) {
      console.error("Could not copy:", e);
    }
  };

  const formatWhatsAppLink = (numberStr: string) => {
    if (!numberStr) return "#";
    const cleaned = numberStr.replace(/\D/g, "");
    // If the Cameroon number begins without prefix, e.g., "6xxxxxxx" (9 digits) prepend 237
    const formatted = cleaned.length === 9 ? "237" + cleaned : cleaned;
    return `https://wa.me/${formatted}`;
  };

  // Load persistent portfolio state from localStorage on init
  useEffect(() => {
    try {
      const savedProjects = localStorage.getItem("port_projects");
      if (savedProjects) {
        let parsed: Project[] = JSON.parse(savedProjects);
        
        // Migrate old static image paths (e.g. /src/assets/...) to compiled assets
        parsed = parsed.map(p => {
          const matched = INITIAL_PROJECTS.find(o => o.id === p.id);
          if (matched && p.image.startsWith("/src/assets/")) {
            return { ...p, image: matched.image };
          }
          return p;
        });

        const missing = INITIAL_PROJECTS.filter(initProj => !parsed.some(p => p.id === initProj.id));
        if (missing.length > 0) {
          const updated = [...parsed, ...missing];
          setProjects(updated);
          localStorage.setItem("port_projects", JSON.stringify(updated));
        } else {
          setProjects(parsed);
          localStorage.setItem("port_projects", JSON.stringify(parsed));
        }
      }
    } catch (e) {
      console.error("Erreur d'initialisation des projets :", e);
    }

    try {
      const savedSkills = localStorage.getItem("port_skills");
      if (savedSkills) {
        setSkills(JSON.parse(savedSkills));
      }
    } catch (e) {
      console.error("Erreur d'initialisation des compétences :", e);
    }

    // Scroll offset handler
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Update State handlers & persist to localStorage
  const handleUpdateProfile = (newProfile: ProfileInfo) => {
    setProfile(newProfile);
    try {
      localStorage.setItem("port_profile", JSON.stringify(newProfile));
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddProject = (newProj: Project) => {
    const updated = [newProj, ...projects];
    setProjects(updated);
    try {
      localStorage.setItem("port_projects", JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteProject = (id: string) => {
    const updated = projects.filter((p) => p.id !== id);
    setProjects(updated);
    try {
      localStorage.setItem("port_projects", JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateSkills = (newSkills: SkillCategory[]) => {
    setSkills(newSkills);
    try {
      localStorage.setItem("port_skills", JSON.stringify(newSkills));
    } catch (e) {
      console.error(e);
    }
  };

  // Revert whole portfolio to developer defaults
  const handleResetPortfolio = () => {
    if (confirm("Voulez-vous restaurer les paramètres et valeurs d'origine du portfolio ? Vos modifications locales seront effacées.")) {
      localStorage.removeItem("port_profile");
      localStorage.removeItem("port_projects");
      localStorage.removeItem("port_skills");
      localStorage.removeItem("aura_custom_cv_data");
      localStorage.removeItem("aura_custom_cv_name");
      setProfile(DEFAULT_PROFILE);
      setProjects(INITIAL_PROJECTS);
      setSkills(SKILL_CATEGORIES);
      window.location.reload();
    }
  };

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-stone-950 font-sans text-stone-100 selection:bg-stone-100 selection:text-stone-950 transition-colors duration-300">
      
      {/* Top sticky styled Header */}
      <header className="sticky top-0 z-40 bg-stone-900/80 backdrop-blur-md border-b border-stone-800 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo brand */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center cursor-pointer group"
          >
            <div>
              <span className="font-sans text-base font-extrabold tracking-tight uppercase block leading-none text-stone-50 animate-pulse">
                {profile.fullName.split(" ")[0] || "PORTFOLIO"}
              </span>
              <span className="text-[8px] uppercase font-mono tracking-widest text-emerald-400 block leading-tight font-black mt-0.5">
                Front-End & Analyst
              </span>
            </div>
          </div>

          {/* Desktop Navigation links */}
          <nav className="hidden md:flex items-center gap-1">
            {[
              { label: "Profil & Bio", id: "profile" },
              { label: "Compétences", id: "skills" },
              { label: "Projets réalisés", id: "projects" },
              { label: "Curriculum / CV", id: "cv" }
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer ${
                  activeTab === link.id
                    ? "bg-white text-stone-950 shadow-sm font-black"
                    : "text-stone-400 hover:text-stone-100 hover:bg-stone-800/80"
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Settings Actions: contact */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsContactOpen(true)}
              className="px-4 py-2 bg-emerald-550 hover:bg-emerald-600 bg-emerald-600 text-stone-50 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer font-mono text-center shadow-lg animate-pulse hover:animate-none"
            >
              Contact direct
            </button>
          </div>

        </div>
      </header>

      {/* Intro visual decoration ribbon */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-stone-950 text-white py-3 overflow-hidden whitespace-nowrap select-none font-mono text-[10px] tracking-widest uppercase font-extrabold flex print:hidden shadow-inner border-y border-stone-800">
        <div className="flex shrink-0 animate-marquee gap-10 items-center min-w-full justify-around pr-10">
          <span className="flex items-center gap-2">
            React JS / Next JS Frontend Developer
          </span>
          <span className="text-stone-600">•</span>
          <span className="flex items-center gap-2">
            Economist & Statistical Data Analyst
          </span>
          <span className="text-stone-600">•</span>
          <span className="flex items-center gap-2">
            KoboCollect Survey Architect
          </span>
          <span className="text-stone-600">•</span>
        </div>
        <div className="flex shrink-0 animate-marquee gap-10 items-center min-w-full justify-around pr-10" aria-hidden="true">
          <span className="flex items-center gap-2">
            React JS / Next JS Frontend Developer
          </span>
          <span className="text-stone-600">•</span>
          <span className="flex items-center gap-2">
            Economist & Statistical Data Analyst
          </span>
          <span className="text-stone-600">•</span>
          <span className="flex items-center gap-2">
            KoboCollect Survey Architect
          </span>
          <span className="text-stone-600">•</span>
        </div>
      </div>

      {/* Core Body Frame Section widgets */}
      <main className="pb-20">
        
        {activeTab === "cv" ? (
          /* Dynamic CV presentation & printable panel */
          <CVSection 
            profile={profile} 
            projects={projects} 
          />
        ) : (
          <>
            {/* Profile Details Block */}
            <ProfileSection 
              profile={profile} 
              onUpdateProfile={handleUpdateProfile} 
              onNavigate={scrollToSection}
            />

            {/* Skills meter Block */}
            <SkillsSection 
              categories={skills} 
              onUpdateSkills={handleUpdateSkills} 
            />

            {/* Projects showcases Grid */}
            <ProjectsSection 
              projects={projects} 
              onDeleteProject={handleDeleteProject} 
            />
          </>
        )}

      </main>

      {/* Footer Details block */}
      <footer className="bg-stone-900 text-stone-400 border-t border-stone-850 py-12 px-4 sm:px-6 lg:px-8 print:hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          
          <div>
            <div className="text-white mb-4">
              <span className="font-sans text-sm font-extrabold tracking-widest uppercase">
                {profile.fullName.toUpperCase()}
              </span>
            </div>
            <p className="text-stone-500 text-xs leading-relaxed max-w-sm">
              Portfolio professionnel d'ingénierie web responsive avec React et traitement automatisé de données terrains statistiques sous Python & KoboToolbox.
            </p>
          </div>

          <div>
            <h4 className="font-mono text-[10px] font-bold uppercase text-stone-300 tracking-widest mb-4">
              Navigation Rapide
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <button onClick={() => scrollToSection("profile")} className="hover:text-white transition-colors cursor-pointer text-left">
                  › Profil & Biographie
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("skills")} className="hover:text-white transition-colors cursor-pointer text-left">
                  › Compétences informatiques
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("projects")} className="hover:text-white transition-colors cursor-pointer text-left">
                  › Réalisations (Sékouh, ShopHub)
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("cv")} className="hover:text-white transition-colors cursor-pointer text-left">
                  › Curriculum & Exporter
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[10px] font-bold uppercase text-stone-300 tracking-widest mb-4">
              Spécifications de sauvegarde
            </h4>
            <p className="text-stone-500 text-xs leading-relaxed mb-4">
              Les modifications de profil, de photo et de projets sont instantanément raccordées et préservées dans votre stockage local (<code className="bg-stone-950 p-1 rounded font-normal text-[10px]">localStorage</code>).
            </p>
          </div>

        </div>

        <div className="max-w-7xl mx-auto pt-8 mt-8 border-t border-stone-850/60 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-600 gap-4 font-mono">
          <span>&copy; {new Date().getFullYear()} {profile.fullName}. Tous droits réservés.</span>
          <span>Crafted for Frontend & Data Science Analytics.</span>
        </div>
      </footer>

      {/* Elegant back-to-top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 p-3 bg-stone-900 border border-stone-850 hover:bg-stone-800 text-white rounded-xl shadow-2xl z-55 cursor-pointer active:scale-90 transition-all"
            title="Revenir au sommet"
          >
            <ArrowUp className="w-5 h-5 text-white" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Modern Contact Modal Overlay */}
      <AnimatePresence>
        {isContactOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop with elegant blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm"
              onClick={() => setIsContactOpen(false)}
            />

            {/* Modal Body card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative bg-white text-stone-900 rounded-3xl w-full max-w-md border border-stone-200 shadow-2xl p-6 sm:p-8 z-10"
            >
              {/* Close button icon top right */}
              <button
                onClick={() => setIsContactOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-stone-100 text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
                aria-label="Fermer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="mb-6">
                <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-600 font-black bg-emerald-50 border border-emerald-150 px-3 py-1 rounded-full inline-block mb-3">
                  Prendre Contact Direct
                </span>
                <h3 className="font-sans text-xl font-bold text-stone-900 tracking-tight">
                  Discutons de vos projets !
                </h3>
                <p className="text-stone-500 text-xs mt-1 leading-relaxed">
                  Traduisez vos besoins d'ingénierie web ou d'analyses quantitatives en solutions concrètes avec Destin MAITOL.
                </p>
              </div>

              {/* Action grid options */}
              <div className="space-y-4">
                
                {/* 1. Phone number item */}
                {profile.phone && (
                  <div className="p-4 bg-stone-50 border border-stone-200/60 rounded-2xl flex items-center justify-between gap-4 hover:border-stone-300 transition-all">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="p-2.5 bg-stone-900 text-white rounded-xl flex-shrink-0">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[9px] uppercase font-mono tracking-wider text-stone-400 block -mb-0.5">Téléphone</span>
                        <a href={`tel:${profile.phone}`} className="text-xs sm:text-sm font-sans font-bold text-stone-900 hover:underline truncate block">
                          {profile.phone}
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <button
                        onClick={() => handleCopy(profile.phone || "", "phone")}
                        className="p-2 bg-white border border-stone-200 hover:border-stone-400 text-stone-500 hover:text-stone-900 rounded-xl transition-all cursor-pointer"
                        title="Copier le numéro"
                      >
                        {copiedField === "phone" ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                      <a
                        href={`tel:${profile.phone}`}
                        className="py-2 px-3 bg-stone-900 hover:bg-stone-850 text-stone-50 text-[10px] font-mono leading-none tracking-wider uppercase font-bold rounded-xl transition-all cursor-pointer"
                      >
                        Appeler
                      </a>
                    </div>
                  </div>
                )}

                {/* 2. WhatsApp click item */}
                {profile.whatsapp && (
                  <div className="p-4 bg-emerald-50/50 border border-emerald-100 rounded-2xl flex items-center justify-between gap-4 hover:bg-emerald-50/80 transition-all">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="p-2.5 bg-emerald-600 text-white rounded-xl flex-shrink-0">
                        <MessageSquare className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[9px] uppercase font-mono text-emerald-600 font-bold tracking-wider block -mb-0.5">WhatsApp Chat</span>
                        <a 
                          href={formatWhatsAppLink(profile.whatsapp)} 
                          target="_blank" 
                          rel="noreferrer"
                          className="text-xs sm:text-sm font-sans font-bold text-stone-900 hover:underline truncate block"
                        >
                          {profile.whatsapp}
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <button
                        onClick={() => handleCopy(profile.whatsapp || "", "whatsapp")}
                        className="p-2 bg-white border border-stone-200 hover:border-stone-400 text-stone-500 hover:text-stone-900 rounded-xl transition-all cursor-pointer"
                        title="Copier le numéro WhatsApp"
                      >
                        {copiedField === "whatsapp" ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                      <a
                        href={formatWhatsAppLink(profile.whatsapp)}
                        target="_blank"
                        rel="noreferrer"
                        className="py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-mono leading-none tracking-wider uppercase font-bold rounded-xl transition-all flex items-center gap-1 cursor-pointer"
                      >
                        Message
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                )}

                {/* 3. Primary Email row */}
                {profile.email && (
                  <div className="p-4 bg-stone-50 border border-stone-200/60 rounded-2xl flex items-center justify-between gap-4 hover:border-stone-300 transition-all">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="p-2.5 bg-red-500/10 text-red-600 rounded-xl flex-shrink-0">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[9px] uppercase font-mono tracking-wider text-stone-400 block -mb-0.5">E-mail principal</span>
                        <a href={`mailto:${profile.email}`} className="text-xs font-sans font-bold text-stone-900 hover:underline truncate block">
                          {profile.email}
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <button
                        onClick={() => handleCopy(profile.email, "email")}
                        className="p-2 bg-white border border-stone-200 hover:border-stone-400 text-stone-500 hover:text-stone-900 rounded-xl transition-all cursor-pointer"
                        title="Copier l'adresse email"
                      >
                        {copiedField === "email" ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                      <a
                        href={`mailto:${profile.email}`}
                        className="py-2 px-3 bg-stone-900 hover:bg-stone-850 text-stone-50 text-[10px] font-mono leading-none tracking-wider uppercase font-bold rounded-xl transition-all cursor-pointer"
                      >
                        Écrire
                      </a>
                    </div>
                  </div>
                )}

              </div>

              {/* Informative timing status footnote */}
              <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-[9px] font-mono text-stone-400 uppercase tracking-widest">
                <span>Disponibilité : Immédiate</span>
                <span>Cameroun & Remote</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
