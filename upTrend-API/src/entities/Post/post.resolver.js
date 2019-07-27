import { formatErrors } from '../../utils/format-errors';
import Sequelize from 'sequelize';
const { Op } = Sequelize;

export default {
  Query: {
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
    createPost: async (parent, { input }, { models }) => {
      try {
        await models.Post.create(input);
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
