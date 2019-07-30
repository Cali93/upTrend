import { formatErrors } from '../../utils/format-errors';
import Sequelize from 'sequelize';
const { Op } = Sequelize;

export default {
  Query: {
    myLikes: (parent, args, { models, req }) =>
      models.Likes.findAll({
        where: { userId: { [Op.eq]: req.session.userId } },
        raw: true
      }).then(bookmarks => console.log(bookmarks.getPosts())),
    likesCountByPostId: async (parent, { postId }, { models }) => {
      try {
        const [ count ] = await models.Like.findAll({
          where: { postId },
          attributes: [[models.db.fn('COUNT', models.db.col('id')), 'count']],
          raw: true
        });
        return count;
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err, models)
        };
      }
    }
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
