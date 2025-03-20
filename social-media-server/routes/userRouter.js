import express from 'express';

const router = express.Router();

import {getTopUsersByPosts,getUserPosts,getPostComments} from '../controller/userConteroller';

router.get('/users',getTopUsersByPosts);
router.get('/users/:userid/posts',getUserPosts);
router.get('/users/posts/:postid/comments',getPostComments);

export default router;