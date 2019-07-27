import gql from 'graphql-tag';

export const GET_ALL_POSTS = gql`
  query {
    allPosts {
      posts {
        id
        title
        content
        cover
        userId
      }
    }
  }
`;

export const DELETE_POST = gql`
  mutation($postId: Int!) {
    deletePost(postId: $postId) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

export const UPDATE_POST = gql`
  mutation($input: UpdatePostInput!) {
    updatePost(input: $input) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

export const CREATE_POST = gql`
  mutation($input: CreatePostInput!) {
    createPost(input: $input) {
      ok
      errors {
        path
        message
      }
    }
  }
`;
