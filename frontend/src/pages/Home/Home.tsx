import { useQuery } from "@apollo/client";
import CountryCard from "../../components/CountryCard/CountryCard";
import Form from "../../components/CountryForm/CountryForm";
import { COUNTRIES } from "../../api/example";
import type { Country } from "../../utils/types";
import { Link } from "react-router-dom";
import "./Home.css";

export function HomePage() {
  const { data, loading, error } = useQuery<{ countries: Country[] }>(COUNTRIES);

  if (loading) {
    return <p>Loading countries ...</p>
  }

  if(error) {
    alert(error.message);
  }
  
  return (
    <>
      <Form />
      <ul className="country-list">
        {data?.countries.map((country) => {
          return (
            <li key={country.name}>
              <Link to={`country/${country.code}`}>
                <CountryCard name={country.name} emoji={country.emoji} />
              </Link>
            </li>
          )
        })}
      </ul>
    </>
  )
}
