import { gql } from 'apollo-server-express';

export default gql`

  type Comment {
    id: Int!
    title: String!
    content: String!
    positiveVotes: [Int!]!
    negativeVotes: [Int!]!
    userId: Int!
    postId: Int!
    createdAt: String!
    updatedAt: String!
  }

  input CreateCommentInput {
    title: String!
    content: String!
    postId: Int!
  }

  input UpdateCommentInput {
    commentId: Int!
    title: String
    content: String
  }

  input VoteInput {
    commentId: Int!
    userId: Int!
  }

  type Query {
    allCommentsByPostId(postId: Int!): PostCommentsResponse!,
    postCommentsCount(postId: Int!): PostCommentsCountResponse!
  }

  type Mutation {
    createComment(input: CreateCommentInput!) : CommentResponseStatus!
    updateComment(input: UpdateCommentInput!) : CommentResponseStatus!
    addPositiveVote(input: VoteInput!) : CommentResponseStatus!
    addNegativeVote(input: VoteInput!) : CommentResponseStatus!
    updateComment(input: UpdateCommentInput!) : CommentResponseStatus!
    deleteComment(commentId: Int!): CommentResponseStatus!
  }

  type PostCommentsCountResponse {
    count: Int!
  }

  type CommentResponseStatus {
    ok: Boolean!
    errors: [Error]
  }

  type PostCommentsResponse {
    ok: Boolean!
    comments: [Comment!]
    errors: [Error]
  }
`;
