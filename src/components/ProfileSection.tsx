import React from "react";
import { ProfileInfo } from "../types";
import { Github, Linkedin, Mail, BookOpen, Camera, FileText } from "lucide-react";
// Gitlab is not always exported or could fail in some lucide versions - let's build a clean custom Gitlab svg or fallback gracefully if Gitlab doesn't exist
// Gitlab icon is actually represented perfectly with a path or a custom SVG or importing from lucide if available. 
// Just in case, let's import it but have a fallback or we can write a highly reliable custom Gitlab SVG since the user asked for Gitlab! Let's do a beautiful custom SVG for Gitlab to be 100% error-proof.

// Custom modern GitLab svg icon
export function GitLabIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      className={className}
      fill="currentColor"
    >
      <path d="M22.65 14.39L12 22.13L1.35 14.39a.84.84 0 0 1-.3-.94l2.42-7.44a.83.83 0 0 1 .79-.57h15.48a.83.83 0 0 1 .79.57l2.42 7.44a.84.84 0 0 1-.3.94zm-1.84-8h-3l1.83 5.61zM14.65 6.39H9.35L12 14.56zm-5.83 0h-3L4 12z" />
    </svg>
  );
}

interface ProfileSectionProps {
  profile: ProfileInfo;
  onUpdateProfile?: (updated: ProfileInfo) => void;
  onNavigate?: (id: string) => void;
}

export default function ProfileSection({ profile, onNavigate }: ProfileSectionProps) {
  return (
    <section id="profile" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-16">
      {/* Presentation Banner Frame */}
      <div className="bg-stone-900 border border-stone-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-stone-800">
        
        {/* Left Side: Photo Frame & Interactive Social Badges */}
        <div className="lg:w-1/3 p-8 flex flex-col items-center justify-center text-center bg-stone-900/60">
          <div className="relative group mb-6">
            <div className="w-48 h-48 rounded-full overflow-hidden border-2 border-stone-750 shadow-2xl bg-stone-950 flex items-center justify-center">
              {profile.avatar ? (
                <img 
                  src={profile.avatar} 
                  alt={profile.fullName} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-full h-full bg-stone-850 flex items-center justify-center text-stone-500">
                  <Camera className="w-12 h-12 stroke-[1]" />
                </div>
              )}
            </div>
          </div>

          <h1 className="font-sans text-2xl font-bold tracking-tight text-white mb-1">
            {profile.fullName}
          </h1>
          <p className="text-sm font-mono text-emerald-400 font-semibold uppercase tracking-wider mb-2">
            {profile.title}
          </p>
          <p className="text-xs text-stone-400 font-medium max-w-xs mb-6">
            {profile.subtitle}
          </p>

          {/* Social Contact Buttons */}
          <div className="flex items-center gap-3 justify-center w-full mb-6">
            {profile.github && (
              <a 
                href={profile.github} 
                target="_blank" 
                rel="noreferrer"
                id="social-github"
                className="p-2.5 rounded-full bg-stone-950 border border-stone-800 hover:border-stone-100 hover:bg-stone-900 transition-all text-stone-300 hover:text-white active:scale-95 shadow-md"
                title="Mon GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            
            <a 
              href={profile.gitlab || "#"} 
              target="_blank" 
              rel="noreferrer"
              id="social-gitlab"
              className="p-2.5 rounded-full bg-stone-950 border border-stone-800 hover:border-stone-100 hover:bg-stone-900 transition-all text-stone-300 hover:text-white active:scale-95 shadow-md"
              title="Mon GitLab"
            >
              <GitLabIcon className="w-4 h-4 text-orange-500" />
            </a>

            {profile.linkedin && (
              <a 
                href={profile.linkedin} 
                target="_blank" 
                rel="noreferrer"
                id="social-linkedin"
                className="p-2.5 rounded-full bg-stone-950 border border-stone-800 hover:border-stone-100 hover:bg-stone-900 transition-all text-stone-300 hover:text-white active:scale-95 shadow-md"
                title="Mon LinkedIn"
              >
                <Linkedin className="w-4 h-4 text-blue-400" />
              </a>
            )}

            {profile.email && (
              <a 
                href={`mailto:${profile.email}`}
                id="social-email"
                className="p-2.5 rounded-full bg-stone-950 border border-stone-800 hover:border-stone-100 hover:bg-stone-900 transition-all text-stone-300 hover:text-white active:scale-95 shadow-md"
                title="M'envoyer un e-mail"
              >
                <Mail className="w-4 h-4 text-red-400" />
              </a>
            )}
          </div>
        </div>

        {/* Right Side: Detailed Narrative Professional Profile */}
        <div className="lg:w-2/3 p-8 sm:p-10 flex flex-col justify-between bg-stone-900">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[10px] bg-stone-800 border border-stone-700 text-stone-300 font-mono uppercase tracking-widest font-extrabold px-3 py-1 rounded-full">
                Double Profil Réactif
              </span>
              <span className="text-[10px] bg-emerald-950/40 border border-emerald-800/80 text-emerald-400 font-mono uppercase tracking-widest font-extrabold px-3 py-1 rounded-full">
                Économiste Analyste
              </span>
            </div>

            <h2 className="font-sans text-3xl font-extrabold tracking-tight text-white mb-4 leading-tight">
              L'alliance de l'Ingénierie Frontend et de l'Analyse Économique de Terrain
            </h2>

            <div className="space-y-4 text-stone-300 text-sm sm:text-base leading-relaxed">
              <p className="border-l-2 border-emerald-500 pl-4 italic">
                {profile.bio}
              </p>
              <p>
                {profile.economicsBio}
              </p>
            </div>

            {/* Micro badges outlining field methodologies */}
            <div className="mt-8">
              <h3 className="text-xs uppercase font-mono tracking-widest text-stone-400 font-bold mb-3">
                Méthodologies d'enquêtes maîtrisées
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-stone-950/60 border border-stone-800 rounded-xl p-3 text-center" title="Computer-Assisted Personal Interviewing">
                  <span className="font-mono text-sm font-black text-white block">CAPI</span>
                  <span className="text-[9px] text-stone-400 uppercase font-sans">Enquête Assistée sur Tablette</span>
                </div>
                <div className="bg-stone-950/60 border border-stone-800 rounded-xl p-3 text-center" title="Computer-Assisted Telephone Interviewing">
                  <span className="font-mono text-sm font-black text-white block">CATI</span>
                  <span className="text-[9px] text-stone-400 uppercase font-sans">Enquête Assistée par Téléphone</span>
                </div>
                <div className="bg-stone-950/60 border border-stone-800 rounded-xl p-3 text-center" title="Paper and Pencil Interviewing">
                  <span className="font-mono text-sm font-black text-white block">PAPI</span>
                  <span className="text-[9px] text-stone-400 uppercase font-sans">Enquête manuelle sur Papier</span>
                </div>
                <div className="bg-stone-950/60 border border-stone-800 rounded-xl p-3 text-center" title="Mobile-Assisted Personal Interviewing">
                  <span className="font-mono text-sm font-black text-white block">MAPI</span>
                  <span className="text-[9px] text-stone-400 uppercase font-sans">Enquête mobile intelligente</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-stone-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-[10px] uppercase font-mono tracking-widest text-stone-400 block">
              Contact direct : <strong className="text-emerald-400">{profile.email}</strong>
            </span>
            <div className="flex gap-2">
              <button 
                onClick={() => onNavigate?.("cv")}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center gap-2 cursor-pointer font-mono"
              >
                <FileText className="w-3.5 h-3.5" />
                Accéder au CV
              </button>
              <button 
                onClick={() => onNavigate?.("projects")}
                className="px-4 py-2 bg-stone-800 hover:bg-stone-705 bg-stone-800 hover:bg-stone-700 text-stone-100 text-xs font-semibold uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 cursor-pointer font-mono"
              >
                <BookOpen className="w-3.5 h-3.5" />
                Voir les Projets
              </button>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
