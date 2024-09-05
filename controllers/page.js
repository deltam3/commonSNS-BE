const { User, Post, Hashtag } = require("../models");

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

exports.jsonHashtag = async (req, res, next) => {
  const query = req.query.hashtag;
  if (!query) {
    return res.redirect("/");
  }

  try {
    const hashtag = await Hashtag.findOne({ where: { title: query } });
    let posts = [];
    if (hashtag) {
      posts = await hashtag.getPosts({ include: [{ model: User }] });
    }
    return res.json({
      posts: posts,
    });
  } catch (error) {
    return next(error);
  }
};
