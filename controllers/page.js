exports.jsonMain = (req, res, next) => {
  const posts = [];
  res.json({
    posts,
  });
};
