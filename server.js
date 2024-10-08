const express = require("express");
const app = express();
const PORT = process.env.PORT || 3005;

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Welcome to my page!");
});

// 1. Route for greetings
app.get("/greetings/:id", (req, res) => {
  res.send({
    msg: `Hello there, ${req.params.id}!`,
  });
});

//2. Route for Dice
app.get("/roll/:id", (req, res) => {
  let returnMessage = "";
  if (isNaN(req.params.id)) {
    returnMessage = "You must specifiy a number";
  } else {
    returnMessage = `You rolled a ${Math.floor(
      Math.random() * (parseInt(req.params.id) + 1)
    )}`;
  }

  res.send({
    msg: returnMessage,
  });
});

//3. route for I want that one


app.get("/collectibles/:id",(req, res) =>{
    const collectibles = [
        { name: 'shiny ball', price: 5.95 },
        { name: 'autographed picture of a dog', price: 10 },
        { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
      ];
      
    let returnMessage = "";
    if (parseInt(req.params.id) >= 0 && parseInt(req.params.id) <collectibles.length ){
        returnMessage = `So, you want the ${collectibles[req.params.id].name}? For $${collectibles[req.params.id].price}, it can be yours!`
    } else {
        returnMessage = "This item is not yet in stock. Check back soon!"
    }
res.send({
    msg: returnMessage,
})
})

//4. route for shoes 
const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

app.get("/shoes", (req,res)=>{
    let filteredShoes = shoes
    const minPrice = req.query["min-price"];
    const maxPrice = req.query["max-price"];
    const type = req.query.type;

    if(minPrice){
        filteredShoes = filteredShoes.filter((shoe)=>{
            return shoe.price >= parseFloat(minPrice);
        })
    } 
    if(maxPrice){
        filteredShoes = filteredShoes.filter((shoe)=>{
            return shoe.price <= parseFloat(maxPrice)
        })
    }
    if(type){
        filteredShoes = filteredShoes.filter((shoe) =>{
            return shoe.type.toLowerCase() === type.toLowerCase()
        })
    }

    res.send(filteredShoes);
})