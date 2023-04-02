import { graphql } from "react-relay";

export const CurrentUserQuery = graphql`
  query CurrentUserQuery {
    currentUser {
      id
      firstName
      lastName
      email
      pictureUrl
    }
  }
`;
