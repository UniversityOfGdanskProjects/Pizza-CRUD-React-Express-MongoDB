const Dog = require("../models/Dog");
const asyncHandler = require("express-async-handler");

// @desc Get all dogs
// @route GET /dogs
// @access Private
const getAllDogs = asyncHandler(async (req, res) => {

  const dogs = await Dog.find().lean().exec();

  if (!dogs?.length) {
    return res.status(400).json({ message: "Bad request, no dogs found." });
  }
  res.json(dogs);
});

// @desc Create new dog
// @route POST /dogs
// @access Private
const createNewDog = asyncHandler(async (req, res) => {

  const { name, imageUrl } = req.body;

  if (!name || !imageUrl ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const dogObject = {
    name,
    imageUrl
  };

  const dog = await Dog.create(dogObject);

  if (dog) {
    res.status(201).json({ message: `New dog ${name} created` });
  } else {
    res.status(400).json({ message: "Couldn't create a new dog" });
  }
});

// @desc Update a dog
// @route PATCH /dogs
// @access Private
const updateDog = asyncHandler(async (req, res) => {
  
  const { id, name, imageUrl } = req.body;

  if (!id || (!name && !imageUrl) ) {
    return res
      .status(400)
      .json({ message: "Invalid request, you need to pass data to update" });
  }

  const dog = await Dog.findOne({ _id: id }).exec();

  // console.log(user)

  if (!dog) {
    return res.status(400).json({ message: "Dog not found" });
  }

  if (name) {
    dog.name = name;
  }

  if (imageUrl) {
    dog.imageUrl = imageUrl;
  }

  const updatedDog = await dog.save();

  res.json({ message: `${dog.name} updated` });
});

// @desc Delete a dog
// @route DELETE /dogs
// @access Private
const deleteDog = asyncHandler(async (req, res) => {

  const { id } = req.body;

  console.log(id);

  if (!id) {
    return res.status(400).json({ message: "Dog id is required" });
  }

  const dog = await Dog.findOne({_id: id}).exec();

  if (!dog) {
    return res.status(400).json({ message: "Dog not found" });
  }

  const result = await Dog.deleteOne(dog)

  const resultMsg = `Dog: ${dog.name} with ID: ${dog._id} has been deleted`

  res.json(resultMsg)
});

module.exports = {
  getAllDogs,
  createNewDog,
  updateDog,
  deleteDog,
};