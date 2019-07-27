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

  type LikesResponseStatus {
    posts: [Post]!
  }
`;
