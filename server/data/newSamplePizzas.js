// const GlutenFloures = ["Italian Flour", "Tipo 00", "Tipo 0", "Typ 1 Flour"];

// const GlutenFreefloures = ["Almond Flour", "Oat Flour", " Tapioca Flour"];

const GlutenFloures = ["Włoska", "Typ 00", "Typ 0", "Typ 1"];

const GlutenFreefloures = ["Migdałowa", "Owsiana", "z Tapioki"];

const pizzaImgUrl = "https://api.lorem.space/image/pizza?w=330&h=310"

// vegan - gluten // ok

const instructions = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi mollitia dignissimos voluptas ipsam reprehenderit eaque velit natus, labore ut repellendus culpa excepturi at aliquam repellat obcaecati nam possimus fugit quod."


const newSamplePizzas = [
  {
    name: "Margerita",
    toppings: ["sos pomidorowy", "mozzarella", "bazylia"],
    price: {
      small: 23,
      large: 27,
    },
    flour: "Migdałowa", //
    gluten: false, //
    instructions: instructions, //
    imageUrl: "https://api.lorem.space/image/pizza?w=330&h=310",
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
    flour: "Włoska",
    gluten: true, 
    instructions: instructions,
    imageUrl: "https://api.lorem.space/image/pizza?w=330&h=310",
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
    flour: "Typ 00",
    gluten: true,
    instructions: instructions,
    imageUrl: "https://api.lorem.space/image/pizza?w=330&h=310",
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
    flour: "Owsiana",
    gluten: false,
    instructions: instructions,
    imageUrl: "https://api.lorem.space/image/pizza?w=330&h=310",
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

module.exports = newSamplePizzas;
