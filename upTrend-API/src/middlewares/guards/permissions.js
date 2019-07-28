import { or, and, rule, shield } from 'graphql-shield';

const isAuthenticated = rule()(async (parent, args, { models, req }, info) => {
  if (req.session && req.session.userId) {
    return models.User.scope('withoutPassword').findOne({
      where: { id: { [models.Op.eq]: req.session.userId } },
      raw: true
    }).then(user => !!user.id);
  }
});

const isAdmin = rule()(async (parent, args, { models, req }, info) => {
  if (req.session && req.session.userId) {
    return models.User.scope('withoutPassword').findOne({
      where: {
        id: { [models.Op.eq]: req.session.userId },
        role: { [models.Op.eq]: 'admin' }
      },
      raw: true
    }).then(({ role }) => role === 'admin');
  } else {
    return false;
  }
});

const isPostOwner = rule()(async (parent, args, { models, req }, info) => {
  if (req.session && req.session.userId) {
    return models.Post.findOne({
      where: {
        id: { [models.Op.eq]: args.input.postId },
        userId: { [models.Op.eq]: req.session.userId }
      },
      raw: true
    }).then(post =>
      post.id === args.input.postId
    );
  } else {
    return false;
  }
});

export const permissions = shield({
  Query: {
    getUser: isAuthenticated
    // allEstates: isAdmin,
    // allEstatesByPostId: isAuthenticated,
    // allPosts: isAuthenticated,
    // allUsers: isAdmin,
    // allUsersByPostId: isAuthenticated
  },
  Mutation: {
    // createEstate: isAdminOrManager,
    // updateEstate: or(isAdmin, and(isManager, estatebelongsToSamePost)),
    // deleteEstate: or(isAdmin, and(isManager, estatebelongsToSamePost)),
    createPost: isAuthenticated,
    updatePost: isPostOwner
    // deletePost: isAdmin,
    // createUser: isAdminOrManager,
    // updateUser: or(isAdminOrOwner, and(isManager, userbelongsToSamePost)),
    // deleteUser: or(isAdmin, and(isManager, userbelongsToSamePost))
  }
});
