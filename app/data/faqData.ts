export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

// Helper function to generate URL-friendly IDs
const createId = (question: string) => {
  return question
    .toLowerCase()
    .normalize("NFD") // Handle accents
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/[^a-z0-9-]/g, ''); // Remove invalid characters
};

const questionsAndAnswers: Omit<FaqItem, 'id'>[] = [
  {
    question: "Qu’est-ce que la TNT ?",
    answer: "La TNT, ou Télévision Numérique Terrestre, est une technologie de diffusion qui permet de recevoir la télévision en qualité numérique via une antenne râteau. Elle offre une meilleure qualité d’image et de son, plus de chaînes et des services interactifs, sans dépendre d'un abonnement internet ou satellite.",
  },
  {
    question: "Comment bénéficier de la TNT ?",
    answer: "Pour recevoir la TNT, vous avez besoin d’un téléviseur compatible (la plupart des modèles récents le sont) ou d’un adaptateur TNT externe, ainsi que d’une simple antenne râteau (intérieure ou extérieure). Une fois l'équipement branché, lancez une recherche de chaînes.",
  },
  {
    question: "Le déploiement de la TNT",
    answer: "Le déploiement de la TNT en Côte d'Ivoire se fait progressivement sur l'ensemble du territoire pour couvrir toutes les régions. Vous pouvez consulter la carte de couverture officielle pour vérifier la disponibilité du signal dans votre localité.",
  },
  {
    question: "Le choix de la technologie",
    answer: "La Côte d'Ivoire a adopté la norme de diffusion DVB-T2 et la norme de compression vidéo MPEG-4. Ces technologies modernes permettent de diffuser des chaînes en Haute Définition (HD) et d'optimiser le spectre de fréquences pour un plus grand nombre de programmes.",
  },
];

export const faqData: FaqItem[] = questionsAndAnswers.map(item => ({
  ...item,
  id: createId(item.question),
}));
