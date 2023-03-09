const Pizza  = require("../models/Pizza");
const Comment = require("../models/Comment");
const asyncHandler = require("express-async-handler");


const createComment = asyncHandler(async (req, res) => {

  const { pizzaId }  = req.params

  const comment  = req.body;

  //console.log(comment);

  const pizza = await Pizza.findOne({ id: pizzaId }).exec();

  if (!pizza) {
    return res.status(400).json({ message: "Pizza not found" });
  }

  if (!comment) {
    return res.status(400).json({ message: "New comment is required!" });
  }

  const addedComment = new Comment(comment);

  pizza.comments.push(addedComment._id);

  await Promise.all([addedComment.save(), pizza.save()]);

  return res.status(201).send({message: `Comment has been added`, addedComment});

});


const deleteComment = asyncHandler(async (req, res) => {

  const { pizzaId }  = req.params

  const { commentId }  = req.body;

  if (!commentId) {
    return res.status(400).json({ message: "Comment id is required!" });
  }

  const comment = await Comment.findById(commentId);

  if (!comment) {
    return res.status(404).json({ message: 'Comment not found' });
  }
  
  const pizza = await Pizza.findOne({ id: pizzaId }).exec();

  if (!pizza) {
    return res.status(400).json({ message: "Pizza not found" });
  }

  await pizza.comments.pull(comment);

  await Promise.all([pizza.save(), comment.remove()])

  return res.status(200).send({message: "Comment has been deleted!", comment});

});

module.exports = {
  deleteComment,
  createComment
};