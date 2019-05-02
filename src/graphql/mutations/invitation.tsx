import gql from 'graphql-tag';

export const CONFIRM_INVITATION_MUTATION = gql`
  mutation($requestID: ID!, $password: String!) {
    confirmInvitation(requestID: $requestID, password: $password) {
      id
      email
    }
  }
`;
