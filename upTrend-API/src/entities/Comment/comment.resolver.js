import { formatErrors } from '../../utils/format-errors';
import Sequelize from 'sequelize';
const { Op } = Sequelize;

export default {
  Query: {
    allCommentsByPostId: async (parent, { postId }, { models }) => {
      try {
        const comments = await models.Comment.findAll({
          where: { postId },
          raw: true
        });
        return {
          ok: true,
          comments
        };
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err, models)
        };
      }
    },
    commentsCountByPostId: async (parent, { postId }, { models }) => {
      try {
        const [ count ] = await models.Comment.findAll({
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
    updateComment: async (parent, { input }, { models }) => {
      try {
        const { commentId, ...newData } = input;
        await models.Comment.update(
          { ...newData },
          { where: { id: { [Op.eq]: commentId } } }
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
    addPositiveVote: async (parent, { input }, { models }) => {
      try {
        const { commentId, userId } = input;
        const positiveVotes = await models.Comment.findOne({
          attributes: ['postiviteVotes'],
          where: {
            id: { [Op.eq]: commentId }
          }
        }).then(positiveVotes => [...positiveVotes, userId]);

        models.Comment.update({ positiveVotes }).then(() => ({
          ok: true
        }));
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err, models)
        };
      }
    },
    addNegativeVote: async (parent, { input }, { models }) => {
      try {
        const { commentId, userId } = input;
        const negativeVotes = await models.Comment.findOne({
          attributes: ['negativeVotes'],
          where: {
            id: { [Op.eq]: commentId }
          }
        }).then(negativeVotes => [...negativeVotes, userId]);

        models.Comment.update({ negativeVotes }).then(() => ({
          ok: true
        }));
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err, models)
        };
      }
    },
    deleteComment: async (parent, { commentId }, { models }) => {
      try {
        await models.Comment.destroy({ where: { id: { [Op.eq]: commentId } } });
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
    createComment: async (parent, { input }, { models }) => {
      try {
        await models.Comment.create(input);
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
