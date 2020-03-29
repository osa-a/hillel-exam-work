let items = [];
let cart = [];

const categories = ['Furniture', 'Decoration'];
const material = ['Wood', 'Wool', 'Metal', 'Stone', 'Glass'];
const type = ['Chair', 'Textile', 'Light', 'Table', 'Vase', 'Picture'];
const rating = ['1', '2', '3', '4', '5'];
const descriptions = {
    '76': 'This is the softest chair in the whole goddamn world. You\'ll never be disappointed in this chair. Buy it, my friend, buy!',
    '4gh': 'This beautiful and colorful blanket is just for your soft and beautiful skin. Gimme your money and I\'ll give you this piece of gold. ',
    '74': 'This amazing lamp will light your path till the end of your life. Trust me! I am a Dcotor!. In my TARDIS I have the same one.',
    'k78': 'Absolutely comfortable low table, for everythig you need. So, I am just don\'t know what else can I add here. So, further there will lorem ipsum text.',
    '1s3': 'THIS IS SPARTAAAAAAAAA. Nah, nope. This is just black lamp on the RED WIRE. This lamp with the warm light, so in the room it will always be cozy.',
    '75t': 'Yellow armchair. It\'s not that soft as the Tweed Armchair, so, don\'t buy it. Leave this page and go buy Tweed Armchair. Tweed Armchair loves you. Buy it.',
    'kg': 'Side Table it\'s ok, but the Tweed Armchair is better. You can check Yellow Armchair, but remember, nothing will be as good as Tweed Armchair',
    '24d': 'Vase. Vase for flowers. Vase for beautiful flowers. Flowers. Flowers. Vase. Tweed Armchair. Buy all our goods. You\'ll like them as much as we. I promise you.',
    '54vt': 'Don\'t you know that we have Tweed Armchair? Nope? Now you know. And this is a picture. Some more text for amount. And more, and more, and more, and more, and more. Perfect.',
    '9mn': 'Amyndas Pendant Lamp. God, who decided to give this lamp such a name? 99$ It is too much for the item with the name like this. Don\'t buy it. Buy Tweed Armchair.',
    '5b': 'LAMP. MORE LAMPS IN OUR SHOP. I LOVE LAMPS. I WANT AAAAALLLLLL THE LAMPS IN THIS WORLD. I WANNA BE AS BEAUTIFUL AS LAMP.',
    '51': 'Colorful planting vase set. Amazingly fit with the Tweed Armchair. Buy both and forget about troubles. This set will solve it automatically. Good luck, have fun.',
};