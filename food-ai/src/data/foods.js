// Optional: put your own photo for any dish here, e.g. 1: '/images/cheeseburger.jpg'
// (put the file inside the /public/images folder). If empty, the dish illustration is used.
const photos = {};

const palette = {
  Burgers: ['#ffd89b', '#f6a821'], Pizza: ['#ffb199', '#e24a2b'], Pasta: ['#fff0b3', '#f6c445'],
  Chinese: ['#ffc2c2', '#e8685a'], Indian: ['#ffd9a0', '#e8923a'], 'South Indian': ['#e6f2c4', '#9cc65a'],
  Healthy: ['#c9f0d8', '#4cb782'], Vegetarian: ['#d9f2c9', '#6fbf5a'], Desserts: ['#ffd1e3', '#e87aa8'],
  Drinks: ['#cdeafc', '#5aaee8'],
};

// Generates a food illustration (emoji on a category-coloured background) as an SVG data URI
const illustration = (emoji, category) => {
  const [from, to] = palette[category];
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='450' viewBox='0 0 600 450'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='${from}'/><stop offset='1' stop-color='${to}'/></linearGradient></defs><rect width='600' height='450' fill='url(#g)'/><circle cx='300' cy='225' r='150' fill='white' fill-opacity='.35'/><text x='300' y='225' font-size='170' text-anchor='middle' dominant-baseline='central'>${emoji}</text></svg>`;
  return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
};

// tags: h=healthy s=spicy w=sweet p=protein f=fast | meals: b=breakfast l=lunch d=dinner k=snack
const f = (id, name, category, price, discount, rating, reviews, isVeg, preparationTime, isPopular, tags, meals, emoji, description, ingredients) => ({
  id, name, category, price, discount, rating, reviews, isVeg, preparationTime, isPopular,
  tags: tags.split(''), meals: meals.split(''), image: photos[id] || illustration(emoji, category),
  description, ingredients: ingredients.split(', '),
});

export const categories = [
  { name: 'Burgers', emoji: '🍔' },
  { name: 'Pizza', emoji: '🍕' },
  { name: 'Pasta', emoji: '🍝' },
  { name: 'Chinese', emoji: '🥡' },
  { name: 'Indian', emoji: '🍛' },
  { name: 'South Indian', emoji: '🥞' },
  { name: 'Healthy', emoji: '🥗' },
  { name: 'Vegetarian', emoji: '🥦' },
  { name: 'Desserts', emoji: '🍰' },
  { name: 'Drinks', emoji: '🥤' },
];

const foods = [
  f(1, 'Classic Cheeseburger', 'Burgers', 249, 24, 4.5, 1280, false, '15 min', true, 'pf', 'ld', '🍔', 'Juicy grilled patty with melted cheddar, fresh lettuce and house sauce in a toasted bun.', 'Beef patty, Cheddar, Lettuce, Tomato, Brioche bun, House sauce'),
  f(2, 'Crispy Veg Burger', 'Burgers', 179, 16, 4.2, 860, true, '12 min', false, 'f', 'lk', '🍔', 'Golden crumb-fried vegetable patty with creamy mayo and crunchy slaw.', 'Veg patty, Mayo, Cabbage slaw, Onion, Sesame bun'),
  f(3, 'Spicy Chicken Zinger', 'Burgers', 269, 26, 4.6, 1510, false, '18 min', true, 'sfp', 'ld', '🍗', 'Extra crispy fried chicken fillet tossed in fiery peri-peri sauce.', 'Chicken fillet, Peri-peri sauce, Lettuce, Jalapeno, Bun'),
  f(4, 'Margherita Pizza', 'Pizza', 349, 14, 4.4, 2140, true, '20 min', true, 'f', 'ld', '🍕', 'Wood-fired style crust with San Marzano tomato sauce, fresh mozzarella and basil.', 'Pizza dough, Tomato sauce, Mozzarella, Basil, Olive oil'),
  f(5, 'Pepperoni Feast Pizza', 'Pizza', 499, 10, 4.7, 1890, false, '22 min', true, 'fps', 'd', '🍕', 'Loaded with double pepperoni, mozzarella and a hint of oregano.', 'Pizza dough, Pepperoni, Mozzarella, Tomato sauce, Oregano'),
  f(6, 'Paneer Tikka Pizza', 'Pizza', 399, 10, 4.5, 970, true, '22 min', false, 'sp', 'ld', '🍕', 'Tandoor-marinated paneer cubes, capsicum and onions on a spicy tikka base.', 'Paneer, Capsicum, Onion, Tikka sauce, Mozzarella'),
  f(7, 'Creamy Alfredo Pasta', 'Pasta', 289, 14, 4.3, 740, true, '18 min', false, 'l', 'ld', '🍝', 'Penne tossed in a silky parmesan cream sauce with garlic and herbs.', 'Penne, Cream, Parmesan, Garlic, Parsley'),
  f(8, 'Penne Arrabbiata', 'Pasta', 259, 12, 4.2, 610, true, '16 min', false, 'sh', 'ld', '🍝', 'Penne in a bold tomato sauce with red chilli, garlic and fresh basil.', 'Penne, Tomato, Red chilli, Garlic, Basil'),
  f(9, 'Chicken Pesto Pasta', 'Pasta', 339, 12, 4.6, 820, false, '20 min', true, 'pl', 'ld', '🍝', 'Fusilli with grilled chicken in a vibrant basil and pine nut pesto.', 'Fusilli, Grilled chicken, Basil pesto, Pine nuts, Parmesan'),
  f(10, 'Veg Hakka Noodles', 'Chinese', 199, 10, 4.1, 1320, true, '14 min', true, 'f', 'ld', '🍜', 'Wok-tossed noodles with crunchy vegetables and soy-garlic sauce.', 'Noodles, Cabbage, Carrot, Capsicum, Soy sauce'),
  f(11, 'Chilli Chicken', 'Chinese', 299, 16, 4.6, 1470, false, '20 min', true, 'sp', 'ld', '🍗', 'Crispy chicken tossed with green chillies, onions and a tangy Indo-Chinese glaze.', 'Chicken, Green chilli, Onion, Capsicum, Soy sauce'),
  f(12, 'Veg Manchurian', 'Chinese', 219, 10, 4.3, 930, true, '18 min', false, 'sf', 'dk', '🥡', 'Crispy vegetable dumplings in a garlicky, tangy Manchurian gravy.', 'Cabbage, Carrot, Corn flour, Garlic, Spring onion'),
  f(13, 'Butter Chicken', 'Indian', 369, 18, 4.8, 3120, false, '25 min', true, 'p', 'ld', '🍛', 'Tender tandoori chicken in a rich, velvety tomato-butter gravy.', 'Chicken, Tomato, Butter, Cream, Kasuri methi'),
  f(14, 'Paneer Butter Masala', 'Indian', 319, 15, 4.6, 2260, true, '22 min', true, 'p', 'ld', '🍛', 'Soft paneer cubes simmered in a creamy cashew-tomato gravy.', 'Paneer, Tomato, Cashew, Butter, Cream'),
  f(15, 'Chicken Biryani', 'Indian', 349, 14, 4.7, 2890, false, '30 min', true, 's', 'ld', '🍚', 'Aromatic basmati layered with spiced chicken, saffron and fried onions.', 'Basmati rice, Chicken, Saffron, Fried onion, Whole spices'),
  f(16, 'Dal Makhani', 'Indian', 239, 8, 4.4, 1180, true, '24 min', false, 'p', 'ld', '🍲', 'Black lentils slow-cooked overnight with butter and cream.', 'Black lentils, Kidney beans, Butter, Cream, Tomato'),
  f(17, 'Masala Dosa', 'South Indian', 139, 8, 4.5, 2450, true, '12 min', true, 's', 'bl', '🥞', 'Paper-thin crisp dosa filled with spiced potato, served with chutney and sambar.', 'Rice batter, Potato, Onion, Mustard seeds, Coconut chutney'),
  f(18, 'Idli Sambar', 'South Indian', 99, 0, 4.3, 1760, true, '10 min', true, 'hb', 'bk', '🍚', 'Soft steamed rice cakes with piping hot sambar and coconut chutney.', 'Rice, Urad dal, Toor dal, Vegetables, Coconut'),
  f(19, 'Medu Vada', 'South Indian', 89, 0, 4.2, 980, true, '10 min', false, 'f', 'bk', '🍩', 'Crispy golden lentil doughnuts, fluffy inside, served with sambar.', 'Urad dal, Curry leaves, Black pepper, Ginger, Green chilli'),
  f(20, 'Onion Uttapam', 'South Indian', 129, 8, 4.1, 640, true, '12 min', false, 'b', 'bl', '🥞', 'Thick, soft dosa-style pancake topped with onions, tomato and coriander.', 'Rice batter, Onion, Tomato, Coriander, Green chilli'),
  f(21, 'Greek Salad Bowl', 'Healthy', 249, 20, 4.4, 540, true, '8 min', false, 'hl', 'lk', '🥗', 'Crisp cucumber, olives, tomato and feta with a lemon-oregano dressing.', 'Cucumber, Tomato, Olives, Feta, Olive oil'),
  f(22, 'Grilled Chicken Quinoa Bowl', 'Healthy', 379, 21, 4.7, 710, false, '20 min', true, 'hp', 'ld', '🥘', 'Lean grilled chicken over quinoa with roasted veggies and tahini drizzle.', 'Chicken breast, Quinoa, Broccoli, Bell pepper, Tahini'),
  f(23, 'Avocado Toast', 'Healthy', 199, 15, 4.3, 480, true, '8 min', false, 'hb', 'bk', '🥑', 'Smashed avocado on toasted sourdough with chilli flakes and seeds.', 'Sourdough, Avocado, Lemon, Chilli flakes, Seeds'),
  f(24, 'Gujarati Veg Thali', 'Vegetarian', 269, 15, 4.6, 1650, true, '25 min', true, 'l', 'ld', '🍱', 'A complete homestyle platter with dal, kadhi, sabzi, rotli, rice and sweet.', 'Dal, Kadhi, Seasonal sabzi, Rotli, Rice, Sweet'),
  f(25, 'Paneer Tikka Wrap', 'Vegetarian', 189, 12, 4.4, 820, true, '12 min', false, 'pf', 'lk', '🌯', 'Smoky paneer tikka rolled in a soft wrap with mint chutney and onions.', 'Paneer, Wrap, Mint chutney, Onion, Capsicum'),
  f(26, 'Hara Bhara Kabab', 'Vegetarian', 179, 8, 4.2, 590, true, '15 min', false, 'hk', 'dk', '🍢', 'Spinach and green pea patties, pan-seared with light Indian spices.', 'Spinach, Green peas, Potato, Cashew, Spices'),
  f(27, 'Chocolate Lava Cake', 'Desserts', 169, 12, 4.8, 2010, true, '14 min', true, 'w', 'dk', '🍫', 'Warm dark chocolate cake with a molten centre, served with a dusting of cocoa.', 'Dark chocolate, Butter, Eggs, Sugar, Flour'),
  f(28, 'Gulab Jamun (4 pcs)', 'Desserts', 109, 9, 4.5, 1730, true, '5 min', true, 'w', 'k', '🍡', 'Soft khoya dumplings soaked in rose-cardamom sugar syrup.', 'Khoya, Sugar, Cardamom, Rose water, Ghee'),
  f(29, 'Classic Tiramisu', 'Desserts', 249, 8, 4.6, 640, true, '5 min', false, 'w', 'dk', '🍰', 'Layers of coffee-soaked sponge and mascarpone cream, finished with cocoa.', 'Ladyfingers, Mascarpone, Coffee, Cocoa, Sugar'),
  f(30, 'Mango Lassi', 'Drinks', 119, 8, 4.5, 1390, true, '4 min', true, 'wk', 'bk', '🥭', 'Thick chilled yoghurt blended with sweet Alphonso mango pulp.', 'Yoghurt, Alphonso mango, Sugar, Cardamom'),
  f(31, 'Iced Cold Coffee', 'Drinks', 149, 7, 4.3, 1120, true, '5 min', false, 'wf', 'bk', '☕', 'Creamy cold-brewed coffee shaken with milk and a scoop of ice cream.', 'Coffee, Milk, Ice cream, Sugar, Ice'),
  f(32, 'Fresh Lime Soda', 'Drinks', 79, 0, 4.0, 760, true, '3 min', false, 'hf', 'lk', '🍋', 'Sparkling soda with fresh lime, mint and a pinch of black salt.', 'Lime, Soda, Mint, Black salt, Sugar'),
];

export default foods;
