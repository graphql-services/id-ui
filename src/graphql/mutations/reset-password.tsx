import gql from 'graphql-tag';

export const RESET_PASSWORD_MUTATION = gql`
  mutation($requestID: ID!, $password: String!) {
    resetPassword(requestID: $requestID, newPassword: $password)
  }
`;
