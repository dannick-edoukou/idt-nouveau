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
    answer: "La Télévision Numérique Terrestre (TNT) est cette évolution technologique en matière de télédiffusion terrestre qui permet d'optimiser l'usage de la ressource spectrale par un accroissement du nombre de chaines par fréquence, d'obtenir une meilleure qualité d'image et de réduire les coûts de transmission et de diffusion.\n\nCette nouvelle technologie de diffusion d'images et de son de qualité numérique offre des avantages multiples tels que :\n- La qualité d'image et de son\n- La diffusion de plusieurs programmes de chaînes de télévision sur une seule fréquence\n- L'accès à plus de chaînes et une multitude de programmes\n- La possibilité d'offrir des services innovants comme la vidéo à la demande (VOD), l'enregistrement des programmes (catch up TV), etc.\n\nAVEC LA TNT PAS DE COUPURE D'IMAGE NI DE SON DURANT L'ORAGE !\n\nNB : La Côte d'Ivoire s'engage à migrer de la télévision analogique vers la télévision numérique conformément au traité international appelé « Accord GE06 » initié par l'Union Internationale des télécommunications (IUT ou ITU) en 2006 à Genève.",
  },
  {
    question: "COMMENT BÉNÉFICIER DE LA TNT ?",
    answer: "La Télévision Numérique de Terre est cette évolution technologique qui permet d'optimiser grâce au codage numérique, l'usage des fréquences qui servent à la transmission des ondes par lesquelles l'on reçoit les images. Elle permet une meilleure qualité d'image en réduisant les couts de transmission et de diffusion.\n\nElle permettra aux foyers équipés d'une simple antenne râteau de recevoir une offre de plus d'une trentaine de chaines publiques et privées nationales et locales en qualité numérique.\n\nLa réception de la télévision numérique est possible avec :\n- Un téléviseur analogique et un décodeur numérique\n- Des téléviseurs conformes aux normes de compression MPEG 4 et de diffusion DVB-T2\n- Un téléviseur numérique avec décodeur intégré\n- Un ordinateur équipé d'une carte PC-TV tuner ou d'une clé USB TNT\n- Des équipements intelligents (smartphones, tablettes) capables de réceptionner la vidéo TV mobile\n\nLa réception des programmes numériques est possible en mode :\n- Fixe (avec une antenne extérieure fixe ou via un accès à un réseau spécifique)\n- Portable (avec une antenne intérieure posée sur le téléviseur ou intégrée)\n- Mobile (avec des équipements intelligents : smartphones, tablettes, etc.)",
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
