export default function ResearchIllustration() {
  return <svg className="research-illustration" viewBox="0 0 540 360" role="img" aria-label="Research insights illustration">
    <circle className="illustration-orbit" cx="258" cy="190" r="137" />
    <circle className="illustration-dot" cx="130" cy="260" r="7" />
    <circle className="illustration-dot" cx="385" cy="91" r="7" />
    <g className="illustration-card illustration-card--document">
      <rect x="118" y="85" width="250" height="190" rx="16" />
      <rect className="illustration-fill" x="144" y="112" width="52" height="52" rx="7" />
      <path d="M218 118h111M218 140h111M144 188h185M144 211h92M144 233h72M144 255h102" />
    </g>
    <g className="illustration-card illustration-card--chart">
      <rect x="365" y="126" width="112" height="105" rx="14" />
      <path d="M388 203v-22M411 203v-42M434 203v-30M457 203v-62" />
      <path className="illustration-baseline" d="M382 204h84" />
    </g>
    <g className="illustration-card illustration-card--search">
      <rect x="253" y="222" width="198" height="83" rx="15" />
      <circle cx="286" cy="258" r="13" />
      <path d="m296 268 10 10M324 251h92M324 270h66" />
    </g>
  </svg>;
}
