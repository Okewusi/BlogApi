import express from 'express';
const route = express.Router();
import {addPost, findPosts, findPost, findAllPosts, deletePost, updatePost,addComment} from '../controller/post.controller';
import {verifyToken} from '../middleware/auth';


route.get('/posts', verifyToken,findPosts);
route.get('/allposts', verifyToken, findAllPosts);
route.get('/post',verifyToken, findPost);
route.delete('/post', verifyToken, deletePost);
route.post('/post', verifyToken, addPost);
route.put('/post',verifyToken,updatePost);
route.post('/comment/:id', verifyToken, addComment);


export default route;