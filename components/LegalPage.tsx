import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated?: string;
  children: React.ReactNode;
}) {
  return (
    <main>
      <Navbar />
      <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
        <h1 className="font-display text-3xl font-bold text-navy sm:text-4xl">
          {title}
        </h1>
        {updated && (
          <p className="mt-2 text-sm text-navy/50">Last updated: {updated}</p>
        )}
        <div className="prose prose-slate mt-8 max-w-none prose-headings:font-display prose-headings:text-navy prose-a:text-purple">
          {children}
        </div>
      </div>
      <Footer />
    </main>
  );
}
