export interface CommonDish {
  name: string
  aliases: string[]
  calories: number
  protein: number
  fat?: number
  carbs?: number
  servingNote?: string
}

/** Typical restaurant / takeaway portions (not per 100 g). */
export const COMMON_DISHES: CommonDish[] = [
  {
    name: 'Döner / Kebab',
    aliases: ['doner', 'kebap', 'kebab', 'doener', 'dürüm', 'durum', 'yufka'],
    calories: 750,
    protein: 38,
    servingNote: '1 Döner-Teller',
  },
  {
    name: 'Chicken Tikka Masala',
    aliases: ['tikka masala', 'chicken tikka', 'indisches curry hähnchen'],
    calories: 680,
    protein: 35,
    servingNote: 'mit Reis',
  },
  {
    name: 'Pho',
    aliases: ['pho bo', 'pho ga', 'vietnamesische suppe', 'reisnudelsuppe'],
    calories: 450,
    protein: 28,
    servingNote: '1 Schüssel',
  },
  {
    name: 'Ramen',
    aliases: ['miso ramen', 'shoyu ramen', 'tonkotsu', 'japanische nudelsuppe'],
    calories: 550,
    protein: 22,
    servingNote: '1 Schüssel',
  },
  {
    name: 'Schinken-Pizza',
    aliases: ['schinken pizza', 'pizza schinken', 'ham pizza', 'prosciutto pizza'],
    calories: 580,
    protein: 24,
    servingNote: '2 Stück',
  },
  {
    name: 'Pizza Margherita',
    aliases: ['margherita', 'pizza margherita'],
    calories: 520,
    protein: 20,
    servingNote: '2 Stück',
  },
  {
    name: 'Pizza Salami',
    aliases: ['salami pizza', 'pizza salami'],
    calories: 620,
    protein: 24,
    servingNote: '2 Stück',
  },
  {
    name: 'Burger mit Pommes',
    aliases: ['burger', 'cheeseburger', 'hamburger', 'big mac'],
    calories: 850,
    protein: 32,
  },
  {
    name: 'Pad Thai',
    aliases: ['pad thai', 'thai nudeln', 'reisnudeln thai'],
    calories: 620,
    protein: 22,
  },
  {
    name: 'Sushi-Set',
    aliases: ['sushi', 'maki', 'nigiri', 'sushi box'],
    calories: 480,
    protein: 24,
    servingNote: '8–10 Stück',
  },
  {
    name: 'Currywurst mit Pommes',
    aliases: ['currywurst', 'curry wurst'],
    calories: 720,
    protein: 18,
  },
  {
    name: 'Bratwurst mit Kraut',
    aliases: ['bratwurst', 'bratwurst mit sauerkraut'],
    calories: 580,
    protein: 22,
  },
  {
    name: 'Schnitzel mit Pommes',
    aliases: ['schnitzel', 'wiener schnitzel', 'jägerschnitzel', 'paprika schnitzel'],
    calories: 780,
    protein: 38,
  },
  {
    name: 'Butter Chicken',
    aliases: ['butter chicken', 'murgh makhani'],
    calories: 650,
    protein: 32,
    servingNote: 'mit Reis',
  },
  {
    name: 'Falafel-Teller',
    aliases: ['falafel', 'falafel teller', 'falafel wrap'],
    calories: 620,
    protein: 18,
  },
  {
    name: 'Shawarma',
    aliases: ['shawarma', 'schawarma', 'chicken shawarma'],
    calories: 680,
    protein: 34,
  },
  {
    name: 'Burrito',
    aliases: ['burrito', 'beef burrito', 'chicken burrito'],
    calories: 720,
    protein: 28,
  },
  {
    name: 'Tacos (3 Stück)',
    aliases: ['tacos', 'taco'],
    calories: 540,
    protein: 24,
  },
  {
    name: 'Lasagne',
    aliases: ['lasagne', 'lasagna'],
    calories: 620,
    protein: 28,
    servingNote: '1 Portion',
  },
  {
    name: 'Spaghetti Bolognese',
    aliases: ['bolognese', 'spaghetti bolognese', 'pasta bolognese'],
    calories: 580,
    protein: 26,
  },
  {
    name: 'Carbonara',
    aliases: ['carbonara', 'pasta carbonara', 'spaghetti carbonara'],
    calories: 650,
    protein: 24,
  },
  {
    name: 'KFC / Fried Chicken',
    aliases: ['fried chicken', 'kentucky', 'hähnchenstreifen', 'chicken strips'],
    calories: 680,
    protein: 36,
    servingNote: '3–4 Stück + Beilage',
  },
  {
    name: 'Fish & Chips',
    aliases: ['fish and chips', 'fisch mit pommes'],
    calories: 820,
    protein: 30,
  },
  {
    name: 'Gyros-Teller',
    aliases: ['gyros', 'gyros teller', 'griechischer gyros'],
    calories: 720,
    protein: 36,
  },
  {
    name: 'Paella',
    aliases: ['paella', 'spanischer reis'],
    calories: 580,
    protein: 28,
  },
  {
    name: 'Risotto',
    aliases: ['risotto', 'pilz risotto', 'milanese'],
    calories: 520,
    protein: 14,
  },
  {
    name: 'Tom Yum Suppe',
    aliases: ['tom yum', 'tom yam', 'thai suppe'],
    calories: 180,
    protein: 12,
    servingNote: '1 Schüssel',
  },
  {
    name: 'Green Curry',
    aliases: ['green curry', 'grünes curry', 'thai green curry'],
    calories: 540,
    protein: 26,
    servingNote: 'mit Reis',
  },
  {
    name: 'Kaiserschmarrn',
    aliases: ['kaiserschmarrn', 'schmarrn'],
    calories: 480,
    protein: 12,
  },
  {
    name: 'Apfelstrudel',
    aliases: ['apfelstrudel', 'strudel'],
    calories: 380,
    protein: 5,
    servingNote: '1 Stück',
  },
]
