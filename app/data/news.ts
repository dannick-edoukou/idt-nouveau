export interface NewsItem {
  id: number;
  title: string;
  summary: string;
  content: string;
  image: string;
  date: string;
  author: string;
  category: string;
  readTime: number;
}

export const mockNews: NewsItem[] = [
  {
    id: 1,
    title: "Nouvelle technologie révolutionnaire dans le secteur",
    summary: "Une innovation majeure qui va transformer notre approche du travail.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop",
    date: "15 Juin 2025",
    author: "Marie Dubois",
    category: "Technologie",
    readTime: 5
  },
  {
    id: 2,
    title: "Lancement de notre nouveau service client",
    summary: "Découvrez notre nouvelle approche du service client avec des outils innovants.",
    content: "Nous sommes fiers d'annoncer le lancement de notre nouveau service client, conçu pour offrir une expérience exceptionnelle à nos utilisateurs. Cette initiative s'inscrit dans notre démarche d'amélioration continue.",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&h=400&fit=crop",
    date: "12 Juin 2025",
    author: "Pierre Martin",
    category: "Service",
    readTime: 3
  },
  {
    id: 3,
    title: "Partenariat stratégique avec des leaders du marché",
    summary: "Un nouveau partenariat qui va nous permettre d'étendre notre portée.",
    content: "Ce partenariat stratégique marque une étape importante dans notre développement. En nous associant avec des leaders reconnus du marché, nous pouvons désormais proposer une gamme de services élargie.",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&h=400&fit=crop",
    date: "10 Juin 2025",
    author: "Sophie Leclerc",
    category: "Business",
    readTime: 4
  },
  {
    id: 4,
    title: "Initiative environnementale : notre engagement vert",
    summary: "Découvrez les actions concrètes que nous mettons en place pour l'environnement.",
    content: "L'environnement est au cœur de nos préoccupations. C'est pourquoi nous avons mis en place une série d'initiatives pour réduire notre empreinte carbone et promouvoir des pratiques durables.",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&h=400&fit=crop",
    date: "8 Juin 2025",
    author: "Thomas Rousseau",
    category: "Environnement",
    readTime: 6
  },
  {
    id: 5,
    title: "Expansion internationale : ouverture de nouveaux bureaux",
    summary: "Nous sommes ravis d'annoncer notre expansion en Asie et en Amérique du Sud.",
    content: "Cette expansion marque une nouvelle ère de croissance pour notre entreprise, nous permettant de mieux servir nos clients mondiaux et de puiser dans de nouveaux viviers de talents.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop",
    date: "22 Juin 2025",
    author: "Laura Bernard",
    category: "Business",
    readTime: 5
  },
  {
    id: 6,
    title: "Cybersécurité : renforcer nos défenses",
    summary: "Face à des menaces croissantes, nous avons massivement investi dans la sécurité.",
    content: "La sécurité de nos données et de celles de nos clients est notre priorité absolue. Nous avons mis en œuvre des protocoles de sécurité de pointe et une surveillance 24/7 pour garantir une protection maximale.",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=600&h=400&fit=crop",
    date: "20 Juin 2025",
    author: "Julien Petit",
    category: "Technologie",
    readTime: 4
  },
  {
    id: 7,
    title: "Bien-être au travail : une nouvelle charte pour nos employés",
    summary: "Nous lançons un programme complet pour le bien-être de nos équipes.",
    content: "Ce programme inclut des horaires flexibles, des espaces de détente, et un soutien à la santé mentale, car nous croyons qu'un employé heureux est un employé productif.",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=600&h=400&fit=crop",
    date: "18 Juin 2025",
    author: "Marie Dubois",
    category: "RH",
    readTime: 3
  }
];
