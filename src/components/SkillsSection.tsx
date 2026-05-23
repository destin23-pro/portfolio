import React, { useState } from "react";
import { SkillCategory } from "../types";
import { SKILL_CATEGORIES } from "../data";
import { Code, TrendingUp, HelpCircle, Plus, Trash2, Check, Star } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface SkillsSectionProps {
  categories: SkillCategory[];
  onUpdateSkills: (updated: SkillCategory[]) => void;
}

export default function SkillsSection({ categories, onUpdateSkills }: SkillsSectionProps) {
  const [selectedSkill, setSelectedSkill] = useState<{ name: string; info?: string } | null>(null);
  const [isAddingSkill, setIsAddingSkill] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  // Form State for dynamic skills addition
  const [newSkillName, setNewSkillName] = useState("");
  const [newSkillLevel, setNewSkillLevel] = useState(80);
  const [newSkillInfo, setNewSkillInfo] = useState("");
  const [selectedCategoryIdx, setSelectedCategoryIdx] = useState(0);

  const handleAddSkillSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;

    const updated = [...categories];
    updated[selectedCategoryIdx].skills.push({
      name: newSkillName.trim(),
      level: Number(newSkillLevel),
      info: newSkillInfo.trim() || undefined
    });

    onUpdateSkills(updated);
    setNewSkillName("");
    setNewSkillLevel(80);
    setNewSkillInfo("");
    setIsAddingSkill(false);
  };

  const handleRemoveSkill = (catIdx: number, skillIdx: number) => {
    if (confirm("Voulez-vous vraiment retirer cette compétence ?")) {
      const updated = [...categories];
      updated[catIdx].skills.splice(skillIdx, 1);
      onUpdateSkills(updated);
      setSelectedSkill(null);
    }
  };
  return (
    <section id="skills" className="py-16 bg-stone-950 border-y border-stone-900 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center mb-12">
          <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-400 font-extrabold bg-emerald-950/45 px-3 py-1 rounded-full inline-block mb-3 border border-emerald-800/30">
            Matrice de Compétences
          </span>
          <h2 className="font-sans text-3xl font-extrabold tracking-tight text-white animate-pulse">
            Expertise Multidisciplinaire
          </h2>
          <p className="text-stone-400 text-sm max-w-xl mx-auto mt-2">
            Découvrez mes compétences structurées entre programmation frontend réactive, analyse scientifique et capture d'indicateurs de terrain.
          </p>
        </div>

        {/* Tab Selector for Skill categories */}
        <div className="flex border-b border-stone-850 gap-1 overflow-x-auto pb-px mb-8 justify-center">
          {categories.map((cat, idx) => (
            <button
              key={cat.name}
              onClick={() => {
                setActiveTab(idx);
                setSelectedSkill(null);
              }}
              className={`py-3 px-5 text-xs font-mono font-bold uppercase tracking-wider border-b-2 whitespace-nowrap transition-all cursor-pointer ${
                activeTab === idx 
                  ? "border-emerald-500 text-white bg-stone-900 rounded-t-xl" 
                  : "border-transparent text-stone-400 hover:text-stone-200"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Categories content layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Skill lists (Span 2 cols on wide) */}
          <div className="lg:col-span-2 space-y-5 bg-stone-900 border border-stone-850 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-4 border-b border-stone-800 pb-4">
              <h3 className="font-sans font-bold text-sm uppercase tracking-wider text-white flex items-center gap-2">
                 {categories[activeTab]?.name}
              </h3>
              
              <button
                onClick={() => {
                  setSelectedCategoryIdx(activeTab);
                  setIsAddingSkill(true);
                }}
                id="add-skill-btn"
                className="py-1.5 px-3 bg-stone-950 hover:bg-stone-800 border border-stone-800 text-stone-200 hover:text-white text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all flex items-center gap-1 shadow-sm cursor-pointer"
                title="Ajouter une compétence à cette liste"
              >
                <Plus className="w-3 h-3" />
                Ajouter
              </button>
            </div>

            <div className="space-y-6">
              {categories[activeTab]?.skills.map((skill, sIdx) => (
                <div 
                  key={skill.name}
                  onClick={() => setSelectedSkill(skill)}
                  className="group cursor-pointer hover:bg-stone-800/60 p-3 -mx-3 rounded-2xl transition-all"
                  title="Cliquez pour afficher les détails de la compétence"
                >
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-sans font-semibold text-stone-200 text-sm group-hover:text-white transition-colors">
                        {skill.name}
                      </span>
                      {skill.info && (
                        <HelpCircle className="w-3.5 h-3.5 text-stone-500 group-hover:text-stone-400 transition-colors" />
                      )}
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono font-bold text-stone-300">
                        {skill.level}%
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveSkill(activeTab, sIdx);
                        }}
                        className="opacity-0 group-hover:opacity-100 p-1 text-stone-400 hover:text-red-400 rounded hover:bg-red-950/40 transition-all cursor-pointer"
                        title="Détruire"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Meter Bar background */}
                  <div className="h-2 w-full bg-stone-950 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="h-full bg-emerald-500 rounded-full group-hover:bg-emerald-400 transition-colors"
                    />
                  </div>
                </div>
              ))}

              {categories[activeTab]?.skills.length === 0 && (
                <div className="text-center py-8 text-stone-500 text-xs font-mono">
                  Aucune compétence saisie dans cette catégorie pour le moment.
                </div>
              )}
            </div>
          </div>

          {/* Context detail showcase (Span 1 col on wide) */}
          <div className="bg-stone-900 border border-stone-850 rounded-3xl p-6 sm:p-8 shadow-2xl h-full flex flex-col justify-between min-h-[300px]">
            <div>
              <span className="text-[9px] uppercase font-mono tracking-widest text-stone-400 font-extrabold block mb-2">
                Focus d'implémentation
              </span>
              
              {selectedSkill ? (
                <div>
                  <h4 className="font-sans font-extrabold text-white text-lg mb-2 animate-fadeIn">
                    {selectedSkill.name}
                  </h4>
                  
                  {/* Decorative badge meter circle */}
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-stone-950 text-stone-100 rounded-xl font-mono text-xs border border-stone-800 font-bold mb-4 shadow-inner">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-450 bg-emerald-500 animate-pulse" />
                    Maîtrise : {selectedSkill.level}%
                  </div>

                  <p className="text-stone-300 text-xs leading-relaxed font-sans bg-stone-950/65 border border-stone-800 p-4 rounded-xl">
                    {selectedSkill.info || "Cette compétence est cruciale dans mon processus d’ingénierie statistique et applicative. Elle est employée de manière autonome dans des projets d’envergure de type Sékouh, ShopHub ou de recherche terrain."}
                  </p>
                </div>
              ) : (
                <div className="text-stone-500 py-12 flex flex-col items-center justify-center text-center">
                  <HelpCircle className="w-10 h-10 text-stone-600 stroke-[1.2] mb-3" />
                  <p className="text-xs font-sans font-medium text-stone-400">Sélectionnez une compétence</p>
                  <p className="text-[10px] text-stone-500 mt-1 max-w-[200px]">
                    Touchez l'une des compétences de la liste de gauche pour en révéler les contextes d'application concrets.
                  </p>
                </div>
              )}
            </div>

            <div className="border-t border-stone-800 pt-6 mt-6">
              <span className="text-[9px] uppercase font-mono tracking-wide text-stone-500 block leading-tight">
                PROFILING : <strong className="text-emerald-400">REACT NEXT.JS + PYTHON STATS</strong>
              </span>
            </div>
          </div>

        </div>

      </div>

      {/* Dynamic Skill Addition Overlay dialog */}
      {isAddingSkill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-stone-950/70 backdrop-blur-sm" onClick={() => setIsAddingSkill(false)} />
          <div className="relative bg-stone-900 text-white border border-stone-800 rounded-3xl w-full max-w-md shadow-2xl p-6 z-10">
            <h3 className="font-sans font-bold text-base uppercase tracking-wider text-white mb-1">
              Ajouter une compétence
            </h3>
            <p className="text-[10px] font-mono text-stone-400 uppercase tracking-widest mb-4 pb-2 border-b border-stone-800">
              Insérer un nouvel indicateur d'expertise dans la catégorie : <strong className="text-emerald-400">{categories[selectedCategoryIdx]?.name}</strong>
            </p>

            <form onSubmit={handleAddSkillSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-400 mb-1">
                  Nom de la compétence *
                </label>
                <input
                  type="text"
                  required
                  value={newSkillName}
                  onChange={(e) => setNewSkillName(e.target.value)}
                  placeholder="Ex: GraphQL, Scikit-learn, Docker..."
                  className="w-full text-sm p-2.5 border border-stone-800 rounded-xl focus:outline-none focus:border-emerald-500 bg-stone-950 text-stone-100"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-400 mb-1">
                  Niveau d'expertise ({newSkillLevel}%)
                </label>
                <input
                  type="range"
                  min="20"
                  max="100"
                  step="5"
                  value={newSkillLevel}
                  onChange={(e) => setNewSkillLevel(Number(e.target.value))}
                  className="w-full accent-emerald-550 bg-stone-950 rounded-lg height-2 appearance-none h-1.5 cursor-pointer accent-emerald-550"
                />
                <div className="flex justify-between text-[10px] font-mono text-stone-500 px-1 mt-1">
                  <span>Praticien</span>
                  <span>Expert</span>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-400 mb-1">
                  Détail d'application ou contexte
                </label>
                <textarea
                  value={newSkillInfo}
                  onChange={(e) => setNewSkillInfo(e.target.value)}
                  placeholder="Expliquez comment vous utilisez cette compétence au quotidien..."
                  rows={3}
                  className="w-full text-sm p-2.5 border border-stone-800 rounded-xl focus:outline-none focus:border-emerald-500 bg-stone-950 text-stone-100 resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-stone-800">
                <button
                  type="button"
                  onClick={() => setIsAddingSkill(false)}
                  className="px-4 py-2 border border-stone-800 hover:bg-stone-800 rounded-xl text-xs font-semibold uppercase tracking-wider font-mono cursor-pointer text-stone-300"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-550 text-white rounded-xl text-xs font-semibold uppercase tracking-wider font-mono flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  Insérer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
}
