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
    const findUser = await Users.find({email: user});
    const findPosts = await Posts.find({owner: findUser[0]._id}, {_id: 0});
    res.status(200).json({posts: findPosts})
}

export const findPost = async (req,res)=>{
    const user = req.user;
    const title = req.body.title;
    if(!title){
        res.status(400).json({error: "enter title of post to find"}); return;
    }
    const findUser = await Users.findOne({email: user});
    const findPost = await Posts.findOne({title: title});
    console.log(findPost);
    if(!findPost){
        res.status(400).json({message: "no post found"});
        return;
    }
    res.status(200).json({post: findPost})
}

export const updatePost = async(req, res)=>{
    const user = req.user;
    const title = req.body.title;
    const newTitle = req.body.newtitle;
    if(!title || !newTitle){
        res.status(403).json({error: "enter title of post"});
        return;
    }
    // const findUser = await Users.findOne({email: user});
    const updatedPost = await Posts.findOneAndUpdate({title: title}, {title: newTitle});
}
export const deletePost = async(req, res)=>{
    const user = req.user;
    const title = req.body.title;
    if(!title){
        res.status(400).send('enter post title to delete');
        return;
    }
    const findUser = await Users.findOne({email: user});
    const findPost = await Posts.findOne({title: title});
    if(!findPost){
        res.status(400).json({error: "post not found"});
        return;
    }
    const findandDelete = await Posts.findOneAndDelete({owner: findUser._id}, {title: findPost.title});
    res.status(200).json({message: "post succesfully deleted"},{findandDelete})
}
export const findAllPosts = async(req, res)=>{
    const findAllPosts = await Posts.find({});
    res.status(200).json({Allposts: findAllPosts});
}

export const addComment = async(req,res)=>{
    const user = req.user;
    const owner = req.params.id;
    const postTitle = req.body.title;
    const comment = req.body.comment;
    const post = await Posts.findOne({title: postTitle, owner: owner});
    if(!post){
        res.status(400).json({error: "post no found"});
        return;
    }
    await Posts.updateOne({owner},{"$push":{"comments":comment}});
    res.status(200).json({post})
}

