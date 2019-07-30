import { gql } from 'apollo-server-express';

export default gql`

  type Like {
    id: Int!
    postId: Int!
    userId: Int!
  }

  input LikeInput {
    postId: Int!
    userId: Int!
  }

  type Query {
    likesCountByPostId(postId: Int!): PostLikesCountResponse!,
    myLikes(userId: Int!): LikesResponseStatus!
  }

  type Mutation {
    createLike(input: LikeInput!) : LikeResponseStatus!
    deleteLike(bookmarkId: Int!): LikeResponseStatus!
  }

  type LikeResponseStatus {
    ok: Boolean!
    errors: [Error]
  }

  type PostLikesCountResponse {
    ok: Boolean
    count: Int
    errors: [Error]
  }

  type LikesResponseStatus {
    posts: [Post]!
  }
`;
