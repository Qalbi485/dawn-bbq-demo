/* ============================================================
   Dawn — client menu data (dawnbbqrestaurant.com se)
   adminPhone = jahan orders aayenge; riderPhone = delivery boy
   priceMax set ho to card pe "₨X – ₨Y" dikhta hai, cart me min price
   ============================================================ */
const RESTAURANT = {
  name: "Dawn BBQ Restaurant",
  tagline: "Pizza, BBQ & Fast Food",
  adminPhone: "923283662174",   // orders yahan aayenge (admin ka WhatsApp) — 03283662174
  riderPhone: "923367358509",   // delivery boy — 92 336 7358509
  deliveryFee: 100,
  freeDeliveryAbove: 2000,
  timing: "12:00 PM – 1:00 AM",
  address: "Lahore, Pakistan",
  currency: "₨",
  categories: [
    {
      id: "bbq", name: "BBQ", items: [
        { id: "q1", name: "Chicken Chargha", desc: "Full chargha with chutney", price: 2200, img: "img/chicken-chargha.png", tag: "Bestseller" },
        { id: "q2", name: "Chicken Boti", desc: "Soft grilled chicken boti", price: 800, img: "img/chicken-boti.png", tag: "" },
        { id: "q3", name: "Chicken Malai Boti", desc: "Creamy malai boti, BBQ smoke", price: 700, img: "img/chicken-malai-boti.jpg", tag: "" },
        { id: "q4", name: "Chicken Malai Tikka", desc: "Juicy malai tikka pieces", price: 450, img: "img/chicken-malai-tikka.jpg", tag: "" },
        { id: "q5", name: "Chicken Red Tikka", desc: "Spicy red tikka", price: 450, img: "img/chicken-red-tikka.jpg", tag: "Spicy" },
        { id: "q6", name: "Seekh Kabab", desc: "Fresh grilled seekh kabab", price: 800, img: "img/seekh-kabab.png", tag: "" },
      ]
    },
    {
      id: "broast", name: "Broast & Paratha Roll", items: [
        { id: "r1", name: "Chest Broast", desc: "Crispy chest piece broast", price: 600, img: "img/chest-broast.jpg", tag: "" },
        { id: "r2", name: "Leg Broast", desc: "Crispy leg piece broast", price: 600, img: "img/leg-broast.png", tag: "" },
        { id: "r3", name: "Hot Wings (6 Pieces)", desc: "Spicy hot wings", price: 400, img: "img/hot-wings.jpg", tag: "Spicy" },
        { id: "r4", name: "Chicken Chatni Mayo Roll", desc: "Chutney & mayo chicken roll", price: 300, img: "img/chatni-mayo-roll.png", tag: "" },
        { id: "r5", name: "Chicken Cheese Roll", desc: "Cheesy chicken paratha roll", price: 350, img: "img/cheese-roll.png", tag: "" },
        { id: "r6", name: "Zinger Cheese Roll", desc: "Zinger strips + cheese roll", price: 400, img: "img/zinger-cheese-roll.jpg", tag: "Bestseller" },
        { id: "r7", name: "Paneer Cheese Roll", desc: "Paneer + cheese roll", price: 400, img: "img/paneer-cheese-roll.png", tag: "" },
        { id: "r8", name: "Vegetable Chatni Roll", desc: "Veg chutney paratha roll", price: 200, img: "img/veg-chatni-roll.png", tag: "" },
        { id: "r9", name: "Vegetable Lava Burger", desc: "Veg lava style burger", price: 350, img: "img/veg-lava-burger.jpg", tag: "" },
      ]
    },
    {
      id: "burgers", name: "Burgers", items: [
        { id: "b1", name: "Chicken Zinger Burger", desc: "Crispy zinger, secret sauce", price: 400, img: "img/zinger-burger.png", tag: "Bestseller" },
        { id: "b2", name: "Double Decker Burger", desc: "Double decker, loaded taste", price: 750, img: "img/double-decker.png", tag: "" },
        { id: "b3", name: "Lava Cheese Burger", desc: "Molten lava cheese burger", price: 500, img: "img/lava-cheese-burger.png", tag: "" },
        { id: "b4", name: "Paneer Burger", desc: "Grilled paneer patty burger", price: 350, img: "img/paneer-burger.jpg", tag: "" },
      ]
    },
    {
      id: "foods", name: "Foods", items: [
        { id: "f1", name: "Chicken Biryani", desc: "Dum biryani with raita", price: 600, img: "img/chicken-biryani.jpg", tag: "Bestseller" },
        { id: "f2", name: "Mutton Biryani", desc: "Mutton dum biryani", price: 1100, img: "img/mutton-biryani.png", tag: "" },
        { id: "f3", name: "Vegetable Bryani", desc: "Mixed veg biryani", price: 500, img: "img/veg-biryani.jpg", tag: "" },
        { id: "f4", name: "Chicken Karahi", desc: "Regular to family size", price: 1200, priceMax: 2300, img: "img/chicken-karahi.png", tag: "" },
        { id: "f5", name: "Chicken White Karahi", desc: "White karahi with black pepper", price: 1200, priceMax: 2300, img: "img/chicken-white-karahi.jpg", tag: "" },
        { id: "f6", name: "Mutton Karahi", desc: "Regular to family size", price: 1900, priceMax: 3700, img: "img/mutton-karahi.png", tag: "" },
        { id: "f7", name: "Mutton White Karahi", desc: "Shinwari style white karahi", price: 1900, priceMax: 2800, img: "img/mutton-white-karahi.webp", tag: "" },
        { id: "f8", name: "Paneer Handi", desc: "Creamy paneer handi", price: 1400, priceMax: 2800, img: "img/paneer-handi.jpg", tag: "" },
        { id: "f9", name: "Chicken Fried Rice", desc: "Chinese style fried rice", price: 600, img: "img/chicken-fried-rice.jpg", tag: "" },
        { id: "f10", name: "Daal Fry", desc: "Tarka daal fry", price: 250, img: "img/daal-fry.png", tag: "" },
        { id: "f11", name: "Daal Makhni", desc: "Creamy daal makhni", price: 450, img: "img/daal-makhni.png", tag: "" },
        { id: "f12", name: "Mix Vegetable", desc: "Mix veg curry", price: 250, img: "img/mix-vegetable.jpg", tag: "" },
      ]
    },
    {
      id: "fries", name: "Fries", items: [
        { id: "s1", name: "Crunch Fries", desc: "Crispy crunch fries", price: 450, img: "img/crunch-fries.png", tag: "" },
        { id: "s2", name: "Loaded Fries", desc: "Loaded cheese fries", price: 450, img: "img/loaded-fries.png", tag: "Bestseller" },
        { id: "s3", name: "Plane Fries", desc: "Simple salted fries", price: 250, img: "img/plane-fries.jpg", tag: "" },
      ]
    },
    {
      id: "juices", name: "Juices & Shakes", items: [
        { id: "j1", name: "Mint Margarita", desc: "Chilled mint margarita", price: 250, img: "img/mint-margarita.jpg", tag: "Bestseller" },
        { id: "j2", name: "Lime Margarita", desc: "Zesty lime margarita", price: 250, img: "img/lime-margarita.jpg", tag: "" },
        { id: "j3", name: "Apple Juice", desc: "Fresh apple juice", price: 250, img: "img/apple-juice.jpg", tag: "" },
        { id: "j4", name: "Orange Juice", desc: "Fresh orange juice", price: 250, img: "img/orange-juice.jpg", tag: "" },
        { id: "j5", name: "Pomegranate Juice", desc: "Fresh pomegranate juice", price: 250, img: "img/pomegranate-juice.jpg", tag: "" },
        { id: "j6", name: "Grape Fruit", desc: "Grapefruit juice", price: 250, img: "img/grape-fruit.jpg", tag: "" },
        { id: "j7", name: "Sweet Lime", desc: "Sweet lime juice", price: 250, img: "img/sweet-lime.webp", tag: "" },
      ]
    },
    {
      id: "pizza", name: "Pizza", items: [
        { id: "z1", name: "BBQ Tikka Pizza", desc: "Regular to Large", price: 600, priceMax: 1300, img: "img/bbq-tikka-pizza.jpg", tag: "Bestseller" },
        { id: "z2", name: "Dawn Special Pizza", desc: "Regular to Large", price: 700, priceMax: 1450, img: "img/dawn-special-pizza.png", tag: "" },
        { id: "z3", name: "Cheese Lovers", desc: "Extra cheese, Regular to Large", price: 600, priceMax: 1300, img: "img/cheese-lovers.jpg", tag: "" },
        { id: "z4", name: "Fajita Pizza", desc: "Chicken fajita, Regular to Large", price: 600, priceMax: 1300, img: "img/fajita-pizza.png", tag: "" },
        { id: "z5", name: "Malai Boti Pizza", desc: "Malai boti topping, Regular to Large", price: 600, priceMax: 1300, img: "img/malai-boti-pizza.jpg", tag: "" },
        { id: "z6", name: "Paneer Lovers", desc: "Paneer overload, Regular to Large", price: 600, priceMax: 1300, img: "img/paneer-lovers.jpg", tag: "" },
        { id: "z7", name: "Supreme Pizza", desc: "Loaded supreme, Regular to Large", price: 600, priceMax: 1300, img: "img/supreme-pizza.jpg", tag: "" },
      ]
    },
    {
      id: "sandwiches", name: "Sandwiches", items: [
        { id: "w1", name: "BBQ Sandwich", desc: "Grilled BBQ chicken sandwich", price: 450, img: "img/bbq-sandwich.jpg", tag: "" },
        { id: "w2", name: "Club Sandwich", desc: "Triple decker club sandwich", price: 450, img: "img/club-sandwich.jpg", tag: "" },
        { id: "w3", name: "Vegetable Sandwich", desc: "Fresh veg sandwich", price: 350, img: "img/veg-sandwich.jpg", tag: "" },
      ]
    },
  ]
};
