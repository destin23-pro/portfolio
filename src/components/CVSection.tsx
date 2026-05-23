import React, { useState, useRef } from "react";
import { ProfileInfo, Project } from "../types";
import { FileText, Download, UploadCloud, Check, Trash2, Briefcase, GraduationCap, Printer, BookOpen } from "lucide-react";
import { motion } from "motion/react";

interface CVSectionProps {
  profile: ProfileInfo;
  projects: Project[];
}

export default function CVSection({ profile, projects }: CVSectionProps) {
  // We can save custom uploaded files (Base64) in localStorage
  const [customCVName, setCustomCVName] = useState<string>(() => {
    return localStorage.getItem("aura_custom_cv_name") || "";
  });
  const [customCVData, setCustomCVData] = useState<string>(() => {
    return localStorage.getItem("aura_custom_cv_data") || "";
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Le fichier de CV est trop volumineux (maximum 5 Mo).");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setCustomCVData(reader.result);
          setCustomCVName(file.name);
          localStorage.setItem("aura_custom_cv_data", reader.result);
          localStorage.setItem("aura_custom_cv_name", file.name);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveCustomCV = () => {
    if (confirm("Voulez-vous réinitialiser le document de CV importé ?")) {
      setCustomCVData("");
      setCustomCVName("");
      localStorage.removeItem("aura_custom_cv_data");
      localStorage.removeItem("aura_custom_cv_name");
    }
  };

  const triggerUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleDownloadCV = () => {
    if (customCVData) {
      // Creator has loaded their custom PDF/Doc
      const link = document.createElement("a");
      link.href = customCVData;
      link.download = customCVName || "CV_Desire_Maitol.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // Fallback: trigger standard browser printing optimized style!
      window.print();
    }
  };

  return (
    <section id="cv" className="py-16 bg-stone-950 border-t border-stone-900 scroll-mt-16 print:bg-white print:py-0 print:border-none">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-12 print:hidden">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-400 font-extrabold bg-emerald-950/45 px-3 py-1 rounded-full inline-block mb-3 border border-emerald-800/30">
              Curriculum Vitae
            </span>
            <h2 className="font-sans text-3xl font-extrabold tracking-tight text-white animate-pulse">
              Fiche Professionnelle & CV
            </h2>
            <p className="text-stone-400 text-sm mt-2 max-w-sm">
              Visualisez mes qualifications académiques de terrain ou importez votre propre document pour mise à disposition.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Direct Upload tool */}
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleCVUpload}
              accept=".pdf,.doc,.docx"
              className="hidden"
            />
            
            {customCVData ? (
              <div className="flex items-center bg-stone-900 border border-stone-800 pl-3 pr-2 py-1.5 rounded-xl text-xs gap-2 shadow-sm font-mono text-stone-300">
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> PDF Actif
                </span>
                <button 
                  onClick={handleRemoveCustomCV}
                  className="p-1 text-stone-500 hover:text-red-400 transition-colors cursor-pointer rounded" 
                  title="Supprimer le document"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={triggerUploadClick}
                className="py-2 px-4 bg-stone-900 hover:bg-stone-800 border border-stone-800 hover:border-stone-700 rounded-xl text-xs font-semibold uppercase tracking-wider text-stone-200 transition-all cursor-pointer flex items-center gap-2 font-mono"
                title="Importer un fichier PDF ou Word de votre CV de terrain"
              >
                <UploadCloud className="w-4 h-4 text-emerald-400" />
                Importer mon PDF CV
              </button>
            )}

            <button
              onClick={handleDownloadCV}
              id="download-cv-btn"
              className="py-2.5 px-5 bg-emerald-600 hover:bg-emerald-555 text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer flex items-center gap-2 font-mono touch-manipulation active:scale-95"
              title={customCVData ? "Télécharger le CV enregistré" : "Imprimer ou exporter la fiche au format PDF"}
            >
              <Download className="w-4 h-4 text-white" />
              {customCVData ? "Télécharger mon PDF" : "Imprimer / Exporter PDF"}
            </button>
          </div>
        </div>

        {/* Dynamic printable interactive Resume Frame */}
        <div className="bg-stone-900 border border-stone-850 shadow-3xl text-stone-100 rounded-3xl overflow-hidden p-8 sm:p-12 print:bg-white print:text-black print:shadow-none print:border-none print:p-0">
          
          {/* Printable Resume Header */}
          <div className="flex flex-col md:flex-row justify-between items-start border-b border-stone-800 pb-8 gap-6 print:border-stone-200">
            <div>
              <h3 className="font-sans text-3xl font-black text-white tracking-tight print:text-black">
                {profile.fullName}
              </h3>
              
              <p className="text-sm font-mono text-emerald-400 uppercase font-extrabold tracking-wider mt-1.5 print:text-emerald-700">
                {profile.title}
              </p>
              
              <p className="text-xs text-stone-500 mt-0.5 font-medium print:text-stone-500">
                {profile.subtitle}
              </p>
            </div>

            <div className="text-left md:text-right space-y-1 font-mono text-xs text-stone-400 print:text-stone-600">
              <p> Cameroun & International</p>
              <p> <a href={`mailto:${profile.email}`} className="hover:underline">{profile.email}</a></p>
              {profile.phone && <p> <a href={`tel:${profile.phone}`} className="hover:underline">{profile.phone}</a></p>}
              {profile.whatsapp && <p> <a href={`https://wa.me/${profile.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noreferrer" className="hover:underline">WhatsApp direct</a></p>}
              <p> <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:underline">LinkedIn Profile</a></p>
              <p> <a href={profile.github} target="_blank" rel="noreferrer" className="hover:underline">GitHub Workspace</a></p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 items-start">
            
            {/* Left sidebar info columns */}
            <div className="space-y-8 md:border-r md:border-stone-800/80 md:pr-6 print:border-stone-105">
              
              {/* Profile Bio summary */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-stone-300 font-extrabold mb-3 pb-1 border-b border-stone-800 print:text-black print:border-stone-200">
                  Profil professionnel
                </h4>
                <p className="text-stone-300 text-xs leading-relaxed font-sans print:text-stone-800">
                  {profile.bio}
                </p>
              </div>

              {/* Statistical & Survey expertise */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-stone-300 font-extrabold mb-3 pb-1 border-b border-stone-800 print:text-black print:border-stone-200">
                  Méthodes Statistiques
                </h4>
                <div className="space-y-2 text-xs font-sans text-stone-300 print:text-stone-800">
                  <div className="flex justify-between items-center bg-stone-950 p-2 rounded-lg print:bg-stone-50">
                    <span className="font-mono font-bold text-stone-200 print:text-black">CAPI / CATI</span>
                    <span className="text-[10px] text-stone-500">Ordinateur & Tél</span>
                  </div>
                  <div className="flex justify-between items-center bg-stone-950 p-2 rounded-lg print:bg-stone-50">
                    <span className="font-mono font-bold text-stone-200 print:text-black">PAPI / MAPI</span>
                    <span className="text-[10px] text-stone-500">Papier & Mobile</span>
                  </div>
                  <div className="flex justify-between items-center bg-stone-950 p-2 rounded-lg print:bg-stone-50">
                    <span className="font-mono font-bold text-stone-200 print:text-black">KoboToolbox</span>
                    <span className="text-[10px] text-emerald-400 font-semibold font-mono print:text-emerald-700">XLSForms</span>
                  </div>
                  <div className="flex justify-between items-center bg-stone-950 p-2 rounded-lg print:bg-stone-50">
                    <span className="font-mono font-bold text-stone-200 print:text-black">Python Stats</span>
                    <span className="text-[10px] text-stone-500">Pandas, Matplotlib</span>
                  </div>
                </div>
              </div>

              {/* Educations Info */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-stone-300 font-extrabold mb-3 pb-1 border-b border-stone-800 print:text-black print:border-stone-200">
                  Formations & Diplômes
                </h4>
                <div className="space-y-4 text-xs">
                  <div className="relative pl-4 border-l border-stone-800 print:border-stone-200">
                    <div className="absolute w-2 h-2 rounded-full bg-emerald-500 -left-[4.5px] top-1" />
                    <span className="font-mono font-bold text-stone-500 text-[10px] block">2021 - 2024</span>
                    <h5 className="font-sans font-bold text-white leading-tight print:text-black">Master en Sciences Économiques</h5>
                    <p className="text-stone-400 text-[10px] print:text-stone-600">Modélisation Économétrique & Statistiques</p>
                  </div>
                  
                  <div className="relative pl-4 border-l border-stone-800 print:border-stone-200">
                    <div className="absolute w-2 h-2 rounded-full bg-emerald-500 -left-[4.5px] top-1" />
                    <span className="font-mono font-bold text-stone-500 text-[10px] block">2018 - 2021</span>
                    <h5 className="font-sans font-bold text-white leading-tight print:text-black">Licence en Sciences Économiques</h5>
                    <p className="text-stone-400 text-[10px] print:text-stone-600">Analyse Quantitative & Gestion</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Right main column timeline */}
            <div className="md:col-span-2 space-y-8">
              
              {/* Experience layout timeline */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-stone-300 font-extrabold mb-4 pb-1 border-b border-stone-800 print:text-black print:border-stone-200">
                  Parcours professionnel
                </h4>
                
                <div className="space-y-6">
                  <div className="relative pl-6 border-l-2 border-emerald-600 print:border-emerald-700">
                    <span className="absolute w-3 h-3 rounded-full bg-emerald-500 -left-2 top-1.5 ring-4 ring-stone-900 print:ring-white" />
                    <div className="flex justify-between items-start mb-1 gap-2">
                      <h5 className="font-sans font-bold text-sm text-white print:text-black">
                        Développeur Frontend React / Analyste Terrain
                      </h5>
                      <span className="text-[10px] font-mono font-bold text-stone-300 bg-stone-950 px-2 py-0.5 rounded whitespace-nowrap print:bg-stone-100 print:text-black">
                        2022 - Présent
                      </span>
                    </div>
                    <p className="text-stone-400 text-xs font-mono mb-2 print:text-stone-700">
                      Chef d'équipe de campagne d'enquêtes & UI Integrator Freelance
                    </p>
                    <ul className="list-disc list-inside text-xs text-stone-300 space-y-1 mt-2 print:text-stone-800">
                      <li>Conception de fiches XLSForm sur KoboToolbox et suivi de collecteurs mobiles avec KoboCollect.</li>
                      <li>Pipeline d'analyse Python : fusion de bases, nettoyage minutieux avec Pandas et tracé d'indicateurs KPIs.</li>
                      <li>Intégration et raccordement de tableaux de bord financiers interactifs sous Power BI et SPSS.</li>
                    </ul>
                  </div>

                  <div className="relative pl-6 border-l-2 border-stone-700 print:border-stone-300">
                    <span className="absolute w-3 h-3 rounded-full bg-stone-600 -left-2 top-1.5 ring-4 ring-stone-900 print:ring-white" />
                    <div className="flex justify-between items-start mb-1 gap-2">
                      <h5 className="font-sans font-bold text-sm text-stone-200 print:text-black">
                        Développeur Frontend - Équipe Sékouh
                      </h5>
                      <span className="text-[10px] font-mono font-bold text-stone-350 bg-stone-955 px-2 py-0.5 rounded whitespace-nowrap print:bg-stone-100 print:text-black">
                        Projet de Groupe
                      </span>
                    </div>
                    <p className="text-stone-400 text-xs font-mono mb-2 print:text-stone-700">
                      Application Sékouh (Gouvernance Académique au Cameroun)
                    </p>
                    <ul className="list-disc list-inside text-xs text-stone-300 space-y-1 mt-2 print:text-stone-800">
                      <li>Modélisation agile des fiches UI de notes, gestion administrative de classes sous React JS.</li>
                      <li>Raccordement des interfaces avec les schémas de SGBD relationnel SQL.</li>
                      <li>Optimisation du responsive design sous Tailwind CSS pour devices à bas débit.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Major realizated products summary */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-stone-300 font-extrabold mb-4 pb-1 border-b border-stone-800 print:text-black print:border-stone-200">
                  Applications & Solutions clés développées
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {projects.map((p) => (
                    <div key={p.id} className="border border-stone-800 bg-stone-950/40 hover:border-emerald-800 transition-colors rounded-xl p-4 print:border-stone-200">
                      <span className="text-[9px] uppercase font-mono tracking-wider font-extrabold text-emerald-450 print:text-emerald-700">
                        {p.category}
                      </span>
                      <h5 className="font-sans font-bold text-white text-sm mt-0.5 mb-1.5 print:text-black">
                        {p.title}
                      </h5>
                      <p className="text-[11px] text-stone-400 leading-relaxed font-sans line-clamp-2 print:text-stone-700">
                        {p.summary || p.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* CV Footer */}
          <div className="border-t border-stone-800 pt-8 mt-12 text-center text-stone-500 text-[10px] font-mono print:border-stone-200 print:text-stone-500">
            <span>  Portfolio interactif Destin MAITOL — {new Date().getFullYear()}</span>
          </div>

        </div>

      </div>
    </section>
  );
}
