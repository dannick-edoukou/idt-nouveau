import { redirect } from 'next/navigation';
import { faqData } from '../../data/faqData';

export default function FAQDetailPage({ params }: { params: { slug: string } }) {
  const question = faqData.find(item => item.slug === params.slug);

  if (!question) {
    redirect('/faq');
  }

  // Rediriger vers la page FAQ principale avec le paramètre highlight
  redirect(`/faq?highlight=${params.slug}`);
}

export function generateStaticParams() {
  return faqData.map((item) => ({
    slug: item.slug,
  }));
}