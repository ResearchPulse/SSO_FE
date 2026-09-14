import ResearchIllustration from './ResearchIllustration';

export default function AuthBrandPanel({
  ariaLabel = 'Hyperdata Lab introduction',
  heading = <>Discover.<br />Explore. Advance.</>,
  description = 'A central hub for research, publications, and academic insights.',
}) {
  return <section className="brand-panel" aria-label={ariaLabel}>
    <header className="brand-header"><img className="hyperdata-logo" src="/hyperdata-lab-logo.png" alt="" /><div className="hyperdata-wordmark"><span>Hyperdata</span><strong> Lab</strong></div></header>
    <div className="brand-copy"><h1>{heading}</h1><p className="brand-copy__description">{description}</p><div className="brand-accent" /><ResearchIllustration /></div>
    <footer className="brand-footer"><span>© {new Date().getFullYear()} Hyperdata Lab. All rights reserved.</span></footer>
  </section>;
}
