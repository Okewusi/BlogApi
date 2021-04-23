import { json } from 'express';
import Posts from '../model/post.model';
import Users from '../model/user.model'



export const addPost = async (req, res)=>{
    if(!req.body.title || !req.body.post){
        res.status(400).json("INVALID credentials");
        return;
    }
    const user = req.user;
    const findUser = await Users.findOne({email: user});
    const title = req.body.title;
    const post = req.body.post;
    const newPost = await new Posts({title, post, owner: findUser._id});
    await newPost.save((err, newPost)=>{
        if(err){
            res.status(400).json(err);
            return;
        }
        res.status(200).json({newPost});
    })
}

export const findPosts = async(req, res)=>{
    const user = req.user;
    const findUser = await Users.findOne({email: user});
    const findPosts = await Posts.find({owner: findUser[0]._id}, {_id: 0});
    res.status(200).json({posts: findPosts})
}

export const findPost = async (req,res)=>{
    const user = req.user;
    const titleId = req.params.id;
    if(!titleId){
        res.status(400).json({error: "enter post id"}); return;
    }
    const findPost = await Posts.findOne({_id: titleId});
    if(!findPost){
        res.status(400).json({message: "no post found"});
        return;
    }
    res.status(200).json({post: findPost})
}

export const updatePostTitle = async(req, res)=>{
    const user = req.user;
    const titleId = req.params.id;
    const newTitle = req.body.newtitle;
    if(!titleId || !newTitle){
        res.status(403).json({error: "enter title of post"});
        return;
    }
    // const findUser = await Users.findOne({email: user});
    const updatedPost = await Posts.findOneAndUpdate({_id: titleId}, {title: newTitle});
    if(!updatedPost){
        res.status(400).json({error: "No post found"});
        return;
    }
    res.status(200).json({updated: updatedPost})
}
export const deletePost = async(req, res)=>{
    const user = req.user;
    const titleId = req.params.id;
    if(!titleId){
        res.status(400).send('enter post title to delete');
        return;
    }
    const findUser = await Users.findOne({email: user});
    const findPost = await Posts.findOne({_id: titleId});
    if(!findPost){
        res.status(400).json({error: "post not found"});
        return;
    }
    const findandDelete = await Posts.findOneAndDelete({_id: titleId});
    res.status(200).json({message: "post succesfully deleted"},{findandDelete})
}
export const findAllPosts = async(req, res)=>{
    const findAllPosts = await Posts.find({});
    res.status(200).json({Allposts: findAllPosts});
}


export const addComment = async(req,res)=>{
    const user = req.user;
    const postId = req.params.id;
    const comment = req.body.comment;
    const post = await Posts.findOne({_id: postId});
    if(!post){
        res.status(400).json({error: "post no found"});
        return;
    }

    const newComment = await Posts.comments.push({comment});
    await newComment.save((err,data)=>{
        if(err){
            status.send(400).json({error: "comment not saved"}); 
            return;
        }
        res.status(200).json({data})
    })
}