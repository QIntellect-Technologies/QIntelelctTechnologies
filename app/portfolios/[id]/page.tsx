import { PORTFOLIO_PROJECTS } from '@/constants';
import PortfolioDetailClient from '@/components/PortfolioDetailClient';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return PORTFOLIO_PROJECTS.map((project) => ({
    id: project.id,
  }));
}

export default async function PortfolioDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const project = PORTFOLIO_PROJECTS.find((p) => p.id === params.id);
  
  if (!project) {
    notFound();
  }

  return <PortfolioDetailClient project={project} />;
}
