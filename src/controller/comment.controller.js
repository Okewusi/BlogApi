import Comments from '../model/comment.model';
import Users from "../model/user.model";
import Posts from "../model/post.model"

export const addComment = async(req,res)=>{
    const user = req.user;
    const postId = req.params.id;
    const comment = req.body.comment;
    const post = await Posts.findOne({_id: postId});
    if(!post){
        res.status(400).json({error: "post no found"});
        return;
    }
    const newComment = await new Comments({comment,owner: postId});
    await newComment.save((err, newComment)=>{
        if(err){
            res.status(400).json(err);
            return;
        }
        res.status(200).json({newComment});
    })
}
