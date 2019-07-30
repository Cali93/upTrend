import { formatErrors } from '../../utils/format-errors';
import Sequelize from 'sequelize';
const { Op } = Sequelize;

export default {
  Query: {
    // postDetails: async (parent, { postId }, { models }) => {
    //   const likes = await models.Likes.findOne({ where: { id: postId }, raw: true });
    //   const comments = await models.Comments.findAll({
    //     where: { id: { [Op.eq]: postId } },
    //     raw: true
    //   }).then(comments => ({ comments }))
    // },
    // I need: the post infos, the number of comments, and number of likes
    allPosts: (parent, args, { models }) =>
      models.Post.findAll({ raw: true }).then(posts => ({ posts }))
  },
  Mutation: {
    updatePost: async (parent, { input }, { models }) => {
      try {
        const { postId, ...newData } = input;
        await models.Post.update(
          { ...newData },
          { where: { id: { [Op.eq]: postId } } }
        );
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
    deletePost: async (parent, { postId }, { models }) => {
      try {
        await models.Post.destroy(
          { where: { id: { [Op.eq]: postId } } }
        );
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
    createPost: async (parent, { input }, { models, req }) => {
      try {
        await models.Post.create({ userId: req.session.userId, ...input });
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
