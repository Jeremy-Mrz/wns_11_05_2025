import { useQuery } from "@apollo/client";
import { useParams, Link } from "react-router-dom";
import { COUNTRY } from "../../api/example";
import type { Country } from "../../utils/types";
import "./CountryDetails.css";

export default function CountryDetails() {
  const { code } = useParams<{ code: string }>();
  const { data, error } = useQuery<{ country: Country }>(COUNTRY, {
    variables: { code }
  })
  if (!code || error) {
    return (
      <>
        <h1>No country found matching this code</h1>
        <Link to="/">Go back to home page</Link>
      </>
    );
  }
  return (
    <section className="country-details">
      <h1 aria-label={`The flag of ${data?.country.name}`}>{data?.country.emoji}</h1>
      <p>Name: {data?.country.name} ({data?.country.code})</p>
      <p>Continent: {data?.country.continent ? data?.country.continent.name : "Non renseigné"}</p>
    </section>
  )
}