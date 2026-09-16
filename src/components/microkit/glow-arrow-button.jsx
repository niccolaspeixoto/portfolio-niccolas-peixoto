import { ArrowRight } from "lucide-react";

const CLASSES = "group inline-flex cursor-pointer items-center gap-2 overflow-hidden rounded-full border-0 bg-[var(--terra)] px-8 py-4 text-base font-medium text-[var(--papel)] transition-shadow duration-300 hover:shadow-[0_3px_20px_rgba(232,118,59,0.5)] focus-visible:shadow-[0_3px_20px_rgba(232,118,59,0.5)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--terra-clara)]";

export function GlowArrowButton({ href, children = "Get Started", className = "", icon: Icon = ArrowRight, ...props }) {
  const content = (
    <>
      <span>{children}</span>
      <Icon aria-hidden="true" size={16} strokeWidth={2.3} className="transition-transform duration-300 group-hover:translate-x-1 group-focus-visible:translate-x-1" />
    </>
  );

  if (href) {
    return (
      <a href={href} className={`${CLASSES} ${className}`} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" className={`${CLASSES} ${className}`} {...props}>
      {content}
    </button>
  );
}
