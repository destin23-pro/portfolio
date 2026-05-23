import { Project, ProfileInfo, SkillCategory } from "./types";
import avatarImg from "./assets/images/WhatsApp Image 2025-08-20 at 18.14.14.jpeg";
import sekouhImg from "./assets/images/sekouh_login_screen_1779526828257.png";
import budgetImg from "./assets/images/budget_quotidien_dashboard_1779524854695.png";

export const DEFAULT_PROFILE: ProfileInfo = {
  fullName: "Destin MAITOL",
  title: "Développeur Frontend & Analyste de Données",
  subtitle: "Économiste & Spécialiste de la collecte de données sur le terrain",
  bio: "Professionnel hybride alliant la rigueur analytique de l'économiste à l'expertise technique du développeur frontend. Je conçois des interfaces web d'exception avec React et Next.js, tout en orchestrant des campagnes de collecte de données intelligentes de bout en bout.",
  economicsBio: "Titulaire d'un master en Sciences Economiques,Ingénieur en codage informatique j'apporte une réelle valeur ajoutée dans l'exploitation des données : structuration d'enquêtes (KoboToolbox/KoboCollect), mise en œuvre de méthodologies rigoureuses (CAPI, CATI, PAPI, MAPI) et modélisation statistique avancée sous Python (Pandas, Matplotlib), SPSS et Power BI.",
  avatar: avatarImg,
  cvUrl: "", // Can be uploaded as file or base64 simulated
  github: "https://github.com/destin23-pro",
  gitlab: "https://gitlab.com/desmaitol",
  linkedin: "https://linkedin.com/in/destin-maitol",
  email: "desmaitol@gmail.com",
  phone: "+237 6 88 08 94 52",
  whatsapp: "+237 6 88 08 94 52"
};

export const INITIAL_PROJECTS: Project[] = [
  {
    id: "sekouh",
    title: "Sékouh - Gestion Établissements Scolaires",
    category: "Frontend",
    role: "Développeur UI / UX & Intégration Frontend",
    teamSize: "4 développeurs",
    summary: "Plateforme robuste de gouvernance académique pour le suivi scolaire au Cameroun.",
    description: "Membre actif de l'équipe frontend. Développement d'écrans hautement interactifs pour la planification des cours, le suivi du carnet de notes numérique et la génération de bulletins de performance. J'ai conçu des composants modulaires optimisés avec React, assurant un chargement rapide même en contexte de connectivité réduite.",
    tags: ["React JS", "Tailwind CSS", "JavaScript", "SQL", "Gestion Scolaire", "Cameroun"],
    image: sekouhImg,
    link: "#"
  },
  {
    id: "shophub",
    title: "ShopHub - Gestion de Ventes",
    category: "Frontend",
    role: "Concepteur & Développeur Lead Frontend",
    teamSize: "Projet individuel",
    summary: "Application fluide de pilotage commercial et de suivi d'activité de vente.",
    description: "Développement complet d'une application d’administration des ventes. Intégration d'un panier dynamique, gestion interactive des stocks, historisation de transactions locales et représentations des marges bénéficiaires via des micro-visualisations chartées.",
    tags: ["React JS", "Vite.js", "State Manager", "Local Storage", "HTML5", "CSS3 / Grid"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    link: "#"
  },
  {
    id: "budget-quotidien",
    title: "Budget Quotidien - Outil de Suivi Financier",
    category: "Frontend",
    role: "Concepteur & Développeur Unique React",
    teamSize: "Projet individuel",
    summary: "Application web épurée d'optimisation des dépenses quotidiennes et d'analyse d'épargne.",
    description: "Conception complète d'un planificateur budgétaire interactif et réactif sous React. Intègre une modélisation du reste à vivre, le calcul de la règle des 50/30/20, des alertes de surconsommation, et des graphiques épurés de répartition basés sur Tailwind CSS et le respect d'un stockage local pour la protection de la vie privée.",
    tags: ["React JS", "TypeScript", "Tailwind CSS", "Local Storage", "Charts", "Budgétisation"],
    image: budgetImg,
    link: "#"
  },
  {
    id: "kobo-python-analytics",
    title: "KoboCollect & Python Survey Analytics Pipeline",
    category: "Data",
    role: "Économiste Statisticien / Lead Analyst",
    teamSize: "Projet Individuel de Recherche / Terrain",
    summary: "Déploiement XLSForm de sondages terrain et chaîne d’automatisation analytique Python.",
    description: "Conception complète de fiches d'enquêtes complexes avec sauts logiques, géolocalisation GPS et contraintes de saisies rigoureuses sur KoboToolbox. Transfert vers KoboCollect pour la collecte de données mobiles hors-ligne. Nettoyage, fusion statistique des bases de données de terrain avec Python (Pandas) et visualisation dynamique des indicateurs économiques avec Matplotlib & Power BI.",
    tags: ["KoboToolbox", "KoboCollect", "Python", "Pandas", "Matplotlib", "Statistiques", "Power BI", "SPSS", "CAPI/PAPI"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    link: "#"
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: "Développement Frontend",
    skills: [
      { name: "React JS", level: 80, info: "Hooks avancés, Context API, Optimisations" },
      { name: "Next JS", level: 75, info: "Routage, Static Generation, Dynamic Server Rendering" },
      { name: "JavaScript / ES6+", level: 75, info: "Asynchronisme, Manipulation DOM, Programmation Fonctionnelle" },
      { name: "HTML5 & CSS3", level: 90, info: "Design responsive, Flexbox/Grid, Animations CSS" },
      { name: "Tailwind CSS", level: 90, info: "Utility-first standard, configuration personnalisée, clean layouts" }
    ]
  },
  {
    name: "Modélisation Economique & Analyse de Données",
    skills: [
      { name: "Python (Data Stack)", level: 75, info: "Pandas, NumPy, Matplotlib, Seaborn pour l'analyse descriptive" },
      { name: "SGBD / SQL", level: 80, info: "Requêtes de filtrage, agrégations, jointures, schémas relationnels" },
      { name: "Power BI", level: 70, info: "Création de rapports intéractifs DAX, indicateurs KPIs clés" },
      { name: "SPSS", level: 70, info: "Régressions statistiques, analyses factorielles, croisements de variables" },
      { name: "Méthodologies d'enquête", level: 95, info: "Conduite d'enquêtes sous formats CAPI, CATI, CAWI, PAPI et MAPI" }
    ]
  },
  {
    name: "Ingénierie de Collecte Terrain",
    skills: [
      { name: "KoboToolbox Form Design", level: 90, info: "Programmation XLSForm, contraintes, skip-logic avancés" },
      { name: "KoboCollect Implementation", level: 95, info: "Déploiement de bases d'enquête mobiles de terrain, synchronisation Cloud" }
    ]
  }
];
