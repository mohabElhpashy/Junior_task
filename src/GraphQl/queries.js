import { gql } from "@apollo/client";

export const Tech_category = gql`
  query {
    category(input: { title: "tech" }) {
      products {
        name
        category
        gallery
        inStock
        description

        prices {
          currency
          amount
        }
        attributes {
          items {
            value
          }
        }
      }
    }
  }
`;
export const Clothes_category = gql`
  query {
    category(input: { title: "clothes" }) {
      products {
        name
        gallery
        inStock

        category
        prices {
          currency
          amount
        }
      }
    }
  }
`;
