import gql from 'graphql-tag';

export const GET_LIKES_COUNT_BY_POST = gql`
  query likesCountByPostId($postId: Int!) {
    likesCountByPostId(postId: $postId) {
      count
    }
  }
`;
