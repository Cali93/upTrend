export default (db, DataTypes) => {
  const Post = db.define(
    'Post',
    {
      title:
        DataTypes.STRING,
      content:
        DataTypes.TEXT,
      cover:
        DataTypes.STRING
    }
  );

  Post.associate = models => {
    Post.belongsTo(
      models.User,
      {
        foreignKey:
          'userId'
      }
    );
    Post.belongsToMany(
      models.User,
      {
        through:
          models.Like,
        foreignKey: {
          name:
            'postId',
          field:
            'post_id'
        }
      }
    );
    Post.belongsToMany(
      models.User,
      {
        through:
          models.Bookmark,
        foreignKey: {
          name:
            'postId',
          field:
            'post_id'
        }
      }
    );
  };

  return Post;
};
