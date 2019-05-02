import gql from 'graphql-tag';

export const FORGOT_PASSWORD_MUTATION = gql`
  mutation($email: String!) {
    forgotPassword(email: $email)
  }
`;
