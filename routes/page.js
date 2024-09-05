const express = require("express");
const { isLoggedIn, isNotLoggedIn } = require("../middlewares");
const { jsonMain, jsonHashtag } = require("../controllers/page");

const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.followerCount = req.user?.Followers?.length || 0;
  res.locals.followingCount = req.user?.Followings?.length || 0;
  res.locals.followingIdList = req.user?.Followings?.map((f) => f.id) || [];
  next();
});

router.get("/", jsonMain);
router.get("/hashtag", jsonHashtag);

module.exports = router;
