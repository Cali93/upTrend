import { formatErrors } from '../../utils/format-errors';

export default {
  Query: {
    myLikes: (parent, args, { models, req }) =>
      models.Likes.findAll({
        where: { userId: { [models.Op.eq]: req.session.userId } },
        raw: true
      }).then(bookmarks => console.log(bookmarks.getPosts()))
  },
  Mutation: {
    deleteLike: async (parent, { bookmarkId }, { models }) => {
      try {
        await models.Like.destroy({ where: { id: bookmarkId } });
        return {
          ok: true
        };
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err, models)
        };
      }
    },
    createLike: async (parent, { input }, { models }) => {
      try {
        await models.Like.create(input);
        return {
          ok: true
        };
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err, models)
        };
      }
    }
  }
};
