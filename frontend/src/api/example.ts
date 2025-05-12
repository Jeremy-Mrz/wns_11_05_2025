import { gql } from "@apollo/client";

export const COUNTRIES = gql`#graphql
  query Countries {
    countries {
      id
      name
      emoji
      code
    }
  }
`
export const ADD_COUNTRY = gql`#graphql
  mutation Country($data: NewCountryInput!) {
    addCountry(data: $data) {
      id
    }
  }
`

export const COUNTRY = gql`#graphql
  query Country($code: String!) {
    country(code: $code) {
      id
      name
      emoji
      code
    }
  }
`