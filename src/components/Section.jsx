
export default function Section({ id, title, children }) {
  return (
    <section id={id} className="container-narrow py-16 scroll-mt-20">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 tracking-tight">
        <span className="u-astro">{title}</span>
      </h2>
      <div className="grid gap-6">{children}</div>
    </section>
  );
}
