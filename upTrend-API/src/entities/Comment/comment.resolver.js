import { formatErrors } from '../../utils/format-errors';

export default {
  Query: {
    allPostComments: (parent, { postId }, { models }) =>
      models.Comments.findAll({
        where: { id: { [models.Op.eq]: postId } },
        raw: true
      }).then(posts => ({ posts }))
  },
  Mutation: {
    updateComment: async (parent, { input }, { models }) => {
      try {
        const { commentId, ...newData } = input;
        await models.Comment.update(
          { ...newData },
          { where: { id: { [models.Op.eq]: commentId } } }
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
            id: { [models.Op.eq]: commentId }
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
            id: { [models.Op.eq]: commentId }
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
        await models.Comment.destroy({ where: { id: { [models.Op.eq]: commentId } } });
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
