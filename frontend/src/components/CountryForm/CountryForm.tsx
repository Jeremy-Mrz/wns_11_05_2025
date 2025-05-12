import type { FormEvent } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_COUNTRY, CONTINENTS, COUNTRIES } from "../../api/example";
import "./CountryForm.css";
import type { Continent } from "../../utils/types";
import { basicFormValidation } from "../../utils/helpers";

export default function Form() {

  const [addCountry] = useMutation(ADD_COUNTRY, {
    refetchQueries: [
      COUNTRIES
    ]
  });

  const { data, error } = useQuery<{ continents: Continent[] }>(CONTINENTS);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    const missingFields = basicFormValidation(data, ['name', 'emoji', 'code']);
    if (missingFields.length) {
      const fields = missingFields.join(' ');
      return alert(`Those fields must be completed: ${fields}`);
    }
    if (data['continent']) {
      (data['continent'] as any) = { id: Number(data['continent']) };
    } else {
      delete data['continent'];
    }
    addCountry({ variables: { data } })
      .then(() => form.reset())
      .catch((err) => alert(`Check your inputs fields, err:  ${err}`));
  }

  if (error) {
    alert(error.message)
  }

  return (
    <section className="country-form">
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" required />
        </div>
        <div>
          <label htmlFor="emoji">Emoji</label>
          <input type="text" name="emoji" id="emoji" required />
        </div>
        <div>
          <label htmlFor="code">Code</label>
          <input type="text" name="code" id="code" required />
        </div>
        <select name="continent" id="continent">
          <option value="">-- Select Continent --</option>
          {data?.continents.map((continent) => {
            return <option key={continent.id} value={continent.id}>{continent.name}</option>
          })}
        </select>
        <button type="submit">Add</button>
      </form>
    </section>
  )
}