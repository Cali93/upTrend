import { gql } from 'apollo-server-express';

export default gql`

  type Post {
    id: Int!
    title: String!
    category: String!
    content: String!
    cover: String
    userId: Int!
    comments: [Comment!]!
  }

  input CreatePostInput {
    title: String!
    category: String!
    content: String!
    cover: String
  }

  input UpdatePostInput {
    postId: Int!
    title: String
    category: String
    content: String
    cover: String
  }

  type Query {
    postDetails(postId: Int!): Post!,
    allPosts: PostsResponse!,
    myPosts(userId: Int!): PostsResponse!
  }

  type Mutation {
    createPost(input: CreatePostInput!) : PostResponseStatus!
    updatePost(input: UpdatePostInput!) : PostResponseStatus!
    deletePost(postId: Int!) : PostResponseStatus!
  }

  type PostResponseStatus {
    ok: Boolean!
    errors: [Error]
  }

  type PostsResponse {
    posts: [Post]!
  }
`;
