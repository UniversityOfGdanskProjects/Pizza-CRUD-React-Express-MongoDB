const samplePizzas = [
  {
    name: "Margerita",
    toppings: ["sos pomidorowy", "mozzarella", "bazylia"],
    price: {
      small: 23,
      large: 27,
    },
    vegan: true,
    imageUrl: "https://placekitten.com/g/330/310",
    comments: [
      {
        author: "Author 1",
        title: "Best Pizza!",
        body: "It's very tasty.",
        imageUrl: "https://placekitten.com/g/150/150",
      },
      {
        author: "Author 2",
        title: "My favourite...",
        body: "I love this pizza.",
        imageUrl: "https://placekitten.com/g/150/150",
      },
    ],
  },
  {
    name: "Capricciosa",
    toppings: ["sos pomidorowy", "szynka", "pieczarki", "ser"],
    price: {
      small: 25,
      large: 35,
    },
    vegan: false,
    imageUrl: "https://placekitten.com/g/330/310",
    comments: [
      {
        author: "Author 3",
        title: "Best!",
        body: "It's very tasty.",
        imageUrl: "https://placekitten.com/g/150/150",
      },
      {
        author: "Author 4",
        title: "favourite...",
        body: "love this pizza.",
        imageUrl: "https://placekitten.com/g/150/150",
      },
    ],
  },
  {
    name: "Enna",
    toppings: [
      "sos pomidorowy",
      "mozzarella",
      "kurczak",
      "pomidor",
      "pieczarki",
    ],
    price: {
      small: 26,
      large: 35,
    },
    vegan: false,
    imageUrl: "https://placekitten.com/g/330/310",
    comments: [
      {
        author: "Author 4",
        title: "<3",
        body: "It's very tasty.",
        imageUrl: "https://placekitten.com/g/150/150",
      },
      {
        author: "Author 5",
        title: "favourite!!!",
        body: "<3 this pizza.",
        imageUrl: "https://placekitten.com/g/150/150",
      },
    ],
  },
  {
    name: "Palermo",
    toppings: [
      "sos pomidorowy",
      "mozzarella",
      "szynka parmeńska",
      "rukola",
      "pomidory cherry",
      "ser Grana Padano",
    ],
    price: {
      small: 32,
      large: 45,
    },
    vegan: false,
    imageUrl: "https://placekitten.com/g/330/310",
    comments: [
      {
        author: "Author 5",
        title: "<3 love it",
        body: "tasty!",
        imageUrl: "https://placekitten.com/g/150/150",
      },
      {
        author: "Author 6",
        title: "favouriteeee!!!",
        body: "<333 this pizza.",
        imageUrl: "https://placekitten.com/g/150/150",
      },
    ],
  },
];

module.exports = samplePizzas;
