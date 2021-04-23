import express from 'express';
const route = express.Router();
import {addComment} from "../controller/comment.controller";
import {verifyToken} from "../middleware/auth";

route.post('/comment/:id', verifyToken, addComment);

export default route;