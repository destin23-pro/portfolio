import React, { useState } from "react";
import { Project } from "../types";
import { ExternalLink, Users, Calendar, ArrowUpRight, Filter } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ProjectsSectionProps {
  projects: Project[];
  onDeleteProject?: (id: string) => void;
}

export default function ProjectsSection({ projects, onDeleteProject }: ProjectsSectionProps) {
  const [filter, setFilter] = useState<"All" | "Frontend" | "Data" | "Fullstack">("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  // Filtered projects
  const filtered = projects.filter(
    (p) => filter === "All" || p.category.toLowerCase() === filter.toLowerCase()
  );

  return (
    <section id="projects" className="py-16 scroll-mt-16 bg-stone-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-400 font-extrabold bg-emerald-950/45 px-3 py-1 rounded-full inline-block mb-3 border border-emerald-800/30">
              Showcase de Réalisations
            </span>
            <h2 className="font-sans text-3xl font-extrabold tracking-tight text-white animate-pulse">
              Projets Réalisés
            </h2>
            <p className="text-stone-400 text-sm max-w-xl mt-2">
              Exploration active des infrastructures frontend développées et des diagnostics analytiques économiques déployés.
            </p>
          </div>
        </div>

        {/* Categories / Filter controls */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-stone-850">
          <Filter className="w-3.5 h-3.5 text-stone-500 mr-2 flex-shrink-0" />
          {[
            { label: "Tous les Projets", val: "All" },
            { label: " Développement Frontend", val: "Frontend" },
            { label: " Analyse & Sondages (Collect)", val: "Data" },
            { label: " Fullstack", val: "Fullstack" }
          ].map((item) => (
            <button
              key={item.val}
              onClick={() => setFilter(item.val as any)}
              className={`py-1.5 px-3.5 rounded-lg text-xs font-mono font-bold tracking-tight transition-all cursor-pointer whitespace-nowrap border ${
                filter === item.val
                  ? "bg-white border-white text-stone-950 shadow-md font-black"
                  : "bg-stone-900 border-stone-800 text-stone-300 hover:text-white hover:border-stone-700"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Projects Grid Card Stage */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((proj) => (
            <div 
              key={proj.id}
              className="group bg-stone-900 border border-stone-850 rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl hover:border-stone-750 transition-all flex flex-col justify-between"
            >
              {/* Product Card Image Frame */}
              <div 
                onClick={() => setSelectedProject(proj)}
                className="aspect-[16/10] bg-stone-950 relative overflow-hidden cursor-pointer"
              >
                <img 
                  src={proj.image} 
                  alt={proj.title} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                
                {/* Category Overly Badge */}
                <div className="absolute top-3 left-3">
                  <span className={`text-[8px] uppercase tracking-widest font-mono font-bold px-2 py-1 rounded bg-stone-950/80 backdrop-blur-sm text-white`}>
                    {proj.category === "Frontend" ? "Development - Frontend" : proj.category === "Data" ? "Survey & Statistics" : "Fullstack"}
                  </span>
                </div>

                {/* Info zoom eye hover placeholder */}
                <div className="absolute inset-0 bg-stone-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="p-3 rounded-full bg-emerald-500/95 text-white border border-emerald-400 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform font-mono text-[10px] uppercase tracking-widest font-black">
                    Consulter la fiche
                  </div>
                </div>
              </div>

              {/* Text Area contents */}
              <div className="p-6 flex-1 flex flex-col justify-between bg-stone-900">
                <div>
                  <h3 
                    onClick={() => setSelectedProject(proj)}
                    className="font-sans font-bold text-white text-base mb-1.5 hover:text-emerald-400 transition-colors cursor-pointer"
                  >
                    {proj.title}
                  </h3>
                  
                  <span className="text-[10px] font-mono font-bold text-stone-500 block mb-3 uppercase tracking-wide">
                    Rôle : <span className="text-stone-300">{proj.role}</span>
                  </span>

                  <p className="text-stone-300 text-xs sm:text-sm line-clamp-3 mb-4 leading-relaxed font-sans">
                    {proj.summary || proj.description}
                  </p>
                </div>

                {/* Tech tags list */}
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {proj.tags.slice(0, 4).map((t) => (
                      <span key={t} className="text-[9px] font-mono text-stone-300 bg-stone-950 border border-stone-800 px-2 py-0.5 rounded">
                        {t}
                      </span>
                    ))}
                    {proj.tags.length > 4 && (
                      <span className="text-[9px] font-mono text-stone-400 bg-stone-800 px-2 py-0.5 rounded">
                        +{proj.tags.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Actions Bar inside card bottom */}
                  <div className="flex items-center justify-between border-t border-stone-800/80 pt-4 mt-auto">
                    <button
                      onClick={() => setSelectedProject(proj)}
                      className="text-[10px] font-mono uppercase font-black tracking-widest text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      Détails techniques
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>

            </div>
          ))}

          {filtered.length === 0 && (
            <div className="col-span-full bg-stone-900/40 border border-dashed border-stone-800 rounded-3xl p-12 text-center text-stone-400">
              <p className="font-sans font-medium text-stone-300">Aucun projet répertorié</p>
              <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
                Aucun projet ne correspond à la catégorie sélectionnée pour le moment.
              </p>
            </div>
          )}
        </div>

        {/* Project Detailed Presentation Overlay Modal */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
              {/* Backdrop */}
              <div 
                className="fixed inset-0 bg-stone-950/70 backdrop-blur-sm" 
                onClick={() => setSelectedProject(null)} 
              />
              
              {/* Content Panel */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="relative bg-stone-900 text-white rounded-3xl w-full max-w-3xl border border-stone-850 shadow-2xl overflow-hidden z-10 my-8"
              >
                {/* Hero section inside modal */}
                <div className="aspect-[21/9] w-full bg-stone-950 relative">
                  <img 
                    src={selectedProject.image} 
                    alt={selectedProject.title} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent" />
                  
                  {/* Closing icon top right */}
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-stone-950/40 hover:bg-stone-800 backdrop-blur-md text-white border border-stone-800 transition-colors cursor-pointer text-xl"
                  >
                    ×
                  </button>

                  <div className="absolute bottom-5 left-6 right-6">
                    <span className="text-[9px] uppercase font-mono tracking-widest text-emerald-300 font-bold block mb-1">
                       {selectedProject.category === "Frontend" ? "REACT / NEXT JS FRONTEND" : selectedProject.category === "Data" ? "ECONOMICS & PY SURVEY DATA" : "FULLSTACK WEB APPLICATION"}
                    </span>
                    <h3 className="font-sans text-xl sm:text-2xl font-black text-white leading-tight">
                      {selectedProject.title}
                    </h3>
                  </div>
                </div>

                {/* Content area */}
                <div className="p-6 md:p-8 space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-stone-950 border border-stone-800 rounded-2xl p-4">
                    <div className="flex items-center gap-2 text-stone-300">
                      <Calendar className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <div>
                        <span className="text-[9px] font-mono uppercase text-stone-500 block -mb-0.5">Rôle Assigné</span>
                        <span className="text-xs sm:text-sm font-sans font-semibold text-stone-200">{selectedProject.role}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-stone-300">
                      <Users className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <div>
                        <span className="text-[9px] font-mono uppercase text-stone-500 block -mb-0.5">Équipe Projet</span>
                        <span className="text-xs sm:text-sm font-sans font-semibold text-stone-200">{selectedProject.teamSize || "Individuel"}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-mono text-[9px] uppercase tracking-widest text-stone-500 font-extrabold mb-2">
                      Résumé & Contexte
                    </h4>
                    <p className="text-stone-200 text-sm leading-relaxed whitespace-pre-line font-sans">
                      {selectedProject.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-mono text-[9px] uppercase tracking-widest text-stone-500 font-extrabold mb-2.5">
                      Fiche d'outils appliqués
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProject.tags.map((tg) => (
                        <span key={tg} className="text-xs font-mono font-semibold text-stone-200 bg-stone-950 px-3 py-1 rounded-lg border border-stone-800">
                          #{tg}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions Footer inside modal */}
                  <div className="flex items-center justify-between pt-6 border-t border-stone-800">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-stone-500">
                      IDENTIFICATEUR : <strong className="text-stone-300">{selectedProject.id}</strong>
                    </span>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedProject(null)}
                        className="px-4 py-2 border border-stone-800 hover:bg-stone-800 text-stone-350 rounded-xl text-xs font-bold uppercase tracking-wider font-mono cursor-pointer text-stone-300"
                      >
                        Annuler
                      </button>
                      
                      {selectedProject.link && selectedProject.link !== "#" && (
                        <a
                          href={selectedProject.link}
                          target="_blank"
                          rel="noreferrer"
                          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-550 text-white rounded-xl text-xs font-bold uppercase tracking-wider font-mono flex items-center gap-1.5 shadow-sm"
                        >
                          Visiter
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>

                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
