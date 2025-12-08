export interface FaqItem {
  id: number;
  slug: string;
  question: string;
  answer: string;
}

// Helper function to generate URL-friendly slugs
const createSlug = (question: string): string => {
  return question
    .toLowerCase()
    .normalize("NFD") // Handle accents
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/[?,':]/g, '') // Remove special characters
    .replace(/[^a-z0-9-]/g, ''); // Remove invalid characters
};

const questionsAndAnswers: Omit<FaqItem, 'id' | 'slug'>[] = [
  {
    question: "QU'EST CE QUE LA TNT ?",
    answer: "La Télévision Numérique Terrestre (TNT) est cette évolution technologique en matière de télédiffusion terrestre qui permet d'optimiser l'usage de la ressource spectrale par un accroissement du nombre de chaines par fréquence, d'obtenir une meilleure qualité d'image et de réduire les coûts de transmission et de diffusion.\n\nCette nouvelle technologie de diffusion d'images et de son de qualité numérique offre des avantages multiples tels que :\n- La qualité d'image et de son\n- La diffusion de plusieurs programmes de chaînes de télévision sur une seule fréquence\n- L'accès à plus de chaînes et une multitude de programmes\n- La possibilité d'offrir des services innovants comme la vidéo à la demande (VOD), l'enregistrement des programmes (catch up TV), etc.\n\nAVEC LA TNT PAS DE COUPURE D'IMAGE NI DE SON DURANT L'ORAGE !\n\nNB : La Côte d'Ivoire s'engage à migrer de la télévision analogique vers la télévision numérique conformément au traité international appelé « Accord GE06 » initié par l'Union Internationale des télécommunications (UIT ou ITU) en 2006 à Genève.",
  },
  {
    question: "COMMENT BÉNÉFICIER DE LA TNT ?",
    answer: "La Télévision Numérique Terrestre permettra aux foyers équipés du kit TNT de recevoir une offre de plusieurs chaines publiques et privées nationales et locales en qualité numérique. \n\nPour recevoir la TNT dans les foyers il faut :\n- Un poste téléviseur aux normes en vigueur DVB-T2 + une antenne râteau TNT \nOu\n- Un poste téléviseur (hors norme) + un décodeur TNT + une antenne râteau TNT",
  },
  {
    question: "DÉPLOIEMENT DE LA TNT EN CÔTE D'IVOIRE",
    answer: "image",
  },
  {
    question: "CHOIX TECHNOLOGIQUE",
    answer: "La Côte d'Ivoire a fait les choix technologiques suivants pour le déploiement de la TNT :\n\n- Norme de diffusion : DVB-T2\n- Norme de compression : MPEG 4 AVC\n- Format de diffusion : HD (Haute Définition)\n\nCes normes sont utilisées dans les espaces UEMOA et CEDEAO, favorisant ainsi l'interopérabilité régionale et permettant aux téléspectateurs de bénéficier d'une qualité d'image et de son optimale.",
  },
];

export const faqData: FaqItem[] = questionsAndAnswers.map((item, index) => ({
  ...item,
  id: index + 1,
  slug: createSlug(item.question),
}));
