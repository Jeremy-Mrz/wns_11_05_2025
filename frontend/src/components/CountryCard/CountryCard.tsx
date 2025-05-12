import "./CountryCard.css";

export default function CountryCard({ name, emoji }: { name: string, emoji: string }) {
  return (
    <section className="country-card">
      <p>{name}</p>
      <p aria-label={`The flag of ${name}`}>{emoji}</p>
    </section>
  )
}