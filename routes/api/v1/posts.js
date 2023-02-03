const express = require("express");
const router = express.Router();
const postsApi = require("../../../controllers/api/v1/post-api");

router.get("/", postsApi.index);
router.delete("/", postsApi.destroy)
module.exports = router;
