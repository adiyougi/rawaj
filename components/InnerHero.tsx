import Link from "next/link";

export default function InnerHero({ eyebrow, title, text, image, action }: { eyebrow: string; title: string; text: string; image: string; action?: { label: string; href: string } }) {
  return (
    <section className="inner-hero" style={{ backgroundImage: "linear-gradient(90deg, rgba(7,7,9,.25), rgba(7,7,9,.88)), url(" + image + ")" }}>
      <div className="shell inner-hero-content">
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{text}</p>
        {action && <Link className="btn btn-primary" href={action.href}>{action.label}</Link>}
      </div>
    </section>
  );
}
