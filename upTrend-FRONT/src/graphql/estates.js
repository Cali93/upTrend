import gql from 'graphql-tag';

export const GET_ALL_ESTATES = gql`
  query {
    allEstates {
      id
      name
      cover
      postId
    }
  }
`;
export const GET_ALL_ESTATES_BY_POST = gql`
  query($postId: Int!) {
    allEstatesByPostId(postId: $postId) {
      id
      name
      cover
      postId
    }
  }
`;

export const DELETE_ESTATE = gql`
  mutation($id: Int!) {
    deleteEstate(id: $id) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

export const UPDATE_ESTATE = gql`
  mutation($input: UpdateEstateInput!) {
    updateEstate(input: $input) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

export const CREATE_ESTATE = gql`
  mutation($input: CreateEstateInput!) {
    createEstate(input: $input) {
      ok
      errors {
        path
        message
      }
    }
  }
`;
