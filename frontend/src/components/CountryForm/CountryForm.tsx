import type { FormEvent } from "react";
import { useMutation } from "@apollo/client";
import { ADD_COUNTRY, COUNTRIES } from "../../api/example";
import "./CountryForm.css";

export default function Form() {

  const [addCountry] = useMutation(ADD_COUNTRY, {
    refetchQueries: [
      COUNTRIES
    ]
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    addCountry({ variables: { data } })
      .then(() => form.reset())
      .catch((err) => console.log(`Error adding a country ${err}`));
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
        <button type="submit">Add</button>
      </form>
    </section>
  )
}