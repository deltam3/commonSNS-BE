const { User, Post } = require("../models");

exports.jsonMain = async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      include: {
        model: User,
        attributes: ["id", "nick"],
      },
      order: [["createdAt", "DESC"]],
    });
    res.json({
      posts: posts,
    });
  } catch (err) {
    next(err);
  }
};
