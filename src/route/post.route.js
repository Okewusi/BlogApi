import express from 'express';
const route = express.Router();
import {addPost, findPosts, findPost, findAllPosts, deletePost, updatePostTitle} from '../controller/post.controller';
import {verifyToken} from '../middleware/auth';


route.get('/posts', verifyToken,findPosts);
route.get('/allposts', verifyToken, findAllPosts);
route.get('/post/:id',verifyToken, findPost);
route.delete('/post/:id', verifyToken, deletePost);
route.post('/post', verifyToken, addPost);
route.put('/post/:id',verifyToken,updatePostTitle);
// route.post('/comment/:id', verifyToken,addComment);


export default route;