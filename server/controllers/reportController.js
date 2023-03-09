const asyncHandler = require("express-async-handler");
const Pizza = require("../models/Pizza");

const getReport = asyncHandler(async (req, res) => {
  // liczba wszystkich pizz
  const totalPizzas = await Pizza.countDocuments();

  // posortowane nazwy pizz, które są bez glutenu
  const pizzasWithoutGluten = await Pizza.aggregate([
    {
      $match: {
        gluten: false,
      },
    },
    {
      $sort: {
        name: 1,
      },
    },
    {
      $project: {
        name: 1,
        _id: 0,
      },
    },
    {
      $group: {
        _id: null,
        names: {
          $push: "$name",
        },
      },
    },
    {
      $project: {
        _id: 0,
      },
    },
  ]);

  // Najwięszka i najmniejsza cena za pizze dużą oraz za małą.
  const minAndMaxPriceOfSmallAndLargePizzas = await Pizza.aggregate([
    {
      $group: {
        _id: null,
        minSmall: { $min: "$price.small" },
        maxSmall: { $max: "$price.small" },
        minLarge: { $min: "$price.large" },
        maxLarge: { $max: "$price.large" },
      },
    },
    {
      $project: {
        _id: 0,
        minSmall: 1,
        maxSmall: 1,
        minLarge: 1,
        maxLarge: 1,
      },
    },
  ]);

  // Średnia cena za pizze małą i dużą
  const avgPriceOfSmallAndLargePizza = await Pizza.aggregate([
    {
      $group: {
        _id: null,
        averageSmallPrice: { $avg: "$price.small" },
        averageLargePrice: { $avg: "$price.large" },
      },
    },
    {
      $project: {
        _id: 0,
      },
    },
  ]);

  // Pizze pogrupowane po typie mąki wraz z ich ilością
  const pizzasGroupedByFlourType = await Pizza.aggregate([
    {
      $group: {
        _id: "$flour",
        names: { $push: "$name" },
        count: { $sum: 1 },
      },
    },
  ]);

  // Pizza z największą ilością składników
  const pizzaWithMaxToppings = await Pizza.aggregate([
    {
      $project: {
        name: 1,
        id: 1,
        _id: 0,
        toppingCount: { $size: "$toppings" },
      },
    },
    { $sort: { toppingCount: -1 } },
    { $limit: 1 },
  ]);

  // Pizza z najmniejszą ilością składników
  const pizzaWIthMinToppings = await Pizza.aggregate([
    {
      $project: {
        name: 1,
        id: 1,
        _id: 0,
        toppingCount: { $size: "$toppings" },
      },
    },
    { $sort: { toppingCount: 1 } },
    { $limit: 1 },
  ]);

  // lista składników i ich liczby wystąpień w kolekcji pizz
  const toppingsOccurencesInPizzaAmount = await Pizza.aggregate([
    { $unwind: "$toppings" },
    {
      $group: {
        _id: "$toppings",
        count: { $sum: 1 },
      },
    },
    { $sort: { count: -1 } },
  ]);

  const report = {
    totalPizzas,
    pizzasWithoutGluten: pizzasWithoutGluten[0],
    minAndMaxPriceOfSmallAndLargePizzas: minAndMaxPriceOfSmallAndLargePizzas[0],
    avgPriceOfSmallAndLargePizza: avgPriceOfSmallAndLargePizza[0],
    pizzasGroupedByFlourType,
    pizzaWithMaxToppings: pizzaWithMaxToppings[0],
    pizzaWIthMinToppings: pizzaWIthMinToppings[0],
    toppingsOccurencesInPizzaAmount,
  };

  if (!report) {
    return res.status(400).json({ message: "Raport can't be generated." });
  }

  res.status(200).json(report);
});

module.exports = {
  getReport,
};
