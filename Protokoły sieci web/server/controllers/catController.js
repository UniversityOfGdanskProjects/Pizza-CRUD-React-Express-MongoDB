const Cat = require("../models/Cat");
const asyncHandler = require("express-async-handler");

// @desc Get all cats
// @route GET /cats
// @access Private
const getAllCats = asyncHandler(async (req, res) => {

  const cats = await Cat.find().lean().exec();

  if (!cats?.length) {
    return res.status(400).json({ message: "Bad request, no cats found." });
  }
  res.json(cats);
});

// @desc Create new cat
// @route POST /cats
// @access Private
const createNewCat = asyncHandler(async (req, res) => {

  const { name, imageUrl } = req.body;

  if (!name || !imageUrl ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const catObject = {
    name,
    imageUrl
  };

  const cat = await Cat.create(catObject);

  if (cat) {
    res.status(201).json({ message: `New cat ${name} created` });
  } else {
    res.status(400).json({ message: "Couldn't create a new cat" });
  }
});

// @desc Update a cat
// @route PATCH /cats
// @access Private
const updateCat = asyncHandler(async (req, res) => {
  
  const { id, name, imageUrl } = req.body;

  if (!id || (!name && !imageUrl) ) {
    return res
      .status(400)
      .json({ message: "Invalid request, you need to pass data to update" });
  }

  const cat = await Cat.findOne({ _id: id }).exec();

  // console.log(user)

  if (!cat) {
    return res.status(400).json({ message: "Cat not found" });
  }

  if (name) {
    cat.name = name;
  }

  if (imageUrl) {
    cat.imageUrl = imageUrl;
  }

  const updatedCat = await cat.save();

  res.json({ message: `${cat.name} updated` });
});

// @desc Delete a cat
// @route DELETE /cats
// @access Private
const deleteCat = asyncHandler(async (req, res) => {

  const { id } = req.body;

  console.log(id);

  if (!id) {
    return res.status(400).json({ message: "Cat id is required" });
  }

  const cat = await Cat.findOne({ _id: id }).exec();

  if (!cat) {
    return res.status(400).json({ message: "Cat not found" });
  }

  const result = await Cat.deleteOne(cat)

  const resultMsg = `Cat: ${cat.name} with ID: ${cat._id} has been deleted`

  res.json(resultMsg)
});

module.exports = {
  getAllCats,
  createNewCat,
  updateCat,
  deleteCat,
};