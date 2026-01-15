import { FoodItem, TestProcedure } from './types';
import { 
  Milk, 
  Utensils, 
  Droplet, 
  Flame, 
  Hexagon, 
  Sparkles, 
  Leaf,
  CircleDot
} from 'lucide-react';

export const APP_LOGO = "https://i.postimg.cc/hvzH74DR/pioneer-logo2.png";

// --- Test Procedures ---

const turmericChalkTest: TestProcedure = {
  aim: "To detect the presence of chalk powder in turmeric powder.",
  materials: ["Test tube", "Water", "Turmeric powder sample", "Concentrated Hydrochloric acid (HCl)", "Dropper"],
  procedure: [
    "Take a small quantity of turmeric powder in a test tube.",
    "Add some water to it and shake well.",
    "Add a few drops of concentrated Hydrochloric acid (HCl) to the mixture.",
    "Observe the reaction carefully."
  ],
  observation: "Effervescence (bubbling) is observed.",
  conclusion: "The presence of effervescence indicates the presence of chalk powder or other carbonates.",
  precautions: ["Handle acid with care.", "Do not inhale the fumes directly."]
};

const turmericMetanilTest: TestProcedure = {
  aim: "To detect Metanil Yellow in turmeric powder.",
  materials: ["Test tube", "Turmeric powder sample", "Water", "Concentrated Hydrochloric acid (HCl)"],
  procedure: [
    "Take about 1g of turmeric powder in a test tube.",
    "Add a few drops of concentrated Hydrochloric acid.",
    "Observe the color change.",
    "Add a large amount of water to dilute the mixture."
  ],
  observation: "The mixture turns pink immediately upon adding acid. If the pink color disappears on dilution, it is pure. If the pink color persists, Metanil Yellow is present.",
  conclusion: "Persistence of pink color after dilution indicates adulteration with Metanil Yellow.",
  precautions: ["Acid is corrosive; use protective gear."]
};

const milkWaterTest: TestProcedure = {
  aim: "To detect water adulteration in milk (Slip Test).",
  materials: ["Polished slanting surface (e.g., a glass plate or slate)"],
  procedure: [
    "Place a drop of milk on a polished slanting surface.",
    "Observe the flow of the drop."
  ],
  observation: "Pure milk flows slowly, leaving a white trail behind. Adulterated milk flows immediately without leaving a mark.",
  conclusion: "If the milk flows too fast without a trail, it contains added water.",
  precautions: ["Ensure the surface is clean and dry."]
};

const milkStarchTest: TestProcedure = {
  aim: "To detect starch in milk.",
  materials: ["Test tube", "Milk sample", "Iodine solution", "Water"],
  procedure: [
    "Take 3-5ml of milk in a test tube.",
    "Boil it thoroughly and cool to room temperature.",
    "Add 2-3 drops of iodine solution."
  ],
  observation: "Formation of blue color indicates the presence of starch.",
  conclusion: "Blue color confirms that the milk is adulterated with starch.",
  precautions: ["Cool the milk before adding iodine."]
};

const milkDetergentTest: TestProcedure = {
  aim: "To detect detergent in milk.",
  materials: ["Glass bottle or test tube", "Water", "Milk sample"],
  procedure: [
    "Take equal amounts of milk and water in a bottle.",
    "Shake the mixture vigorously for 1-2 minutes.",
    "Observe the lather formed."
  ],
  observation: "Pure milk forms a thin foam layer due to agitation. Adulterated milk forms a dense, soapy lather that persists.",
  conclusion: "Persistent soapy lather indicates the presence of detergent.",
  precautions: ["Shake vigorously for best results."]
};

const honeySugarTest: TestProcedure = {
  aim: "To detect sugar solution in honey.",
  materials: ["Transparent glass", "Water", "Honey sample"],
  procedure: [
    "Take a transparent glass filled with water.",
    "Add a drop of honey to the glass.",
    "Observe how the honey settles."
  ],
  observation: "Pure honey does not disperse immediately and settles at the bottom. Adulterated honey disperses in water.",
  conclusion: "If the honey dissolves rapidly, it contains added sugar syrup.",
  precautions: ["Do not stir the water initially."]
};

const sugarChalkTest: TestProcedure = {
  aim: "To detect chalk powder in sugar.",
  materials: ["Transparent glass", "Water", "Sugar sample"],
  procedure: [
    "Take a glass of water.",
    "Dissolve 10g of sugar in it.",
    "Allow the solution to settle for a few minutes."
  ],
  observation: "Chalk powder being insoluble will settle at the bottom. Pure sugar dissolves completely.",
  conclusion: "Sediment at the bottom indicates chalk powder adulteration.",
  precautions: ["Use clear water for best visibility."]
};

const oilArgemoneTest: TestProcedure = {
  aim: "To detect Argemone oil in edible oil.",
  materials: ["Test tube", "Edible oil sample", "Concentrated Nitric Acid"],
  procedure: [
    "Take 5ml of the oil sample in a test tube.",
    "Add 5ml of Concentrated Nitric Acid.",
    "Shake the tube carefully.",
    "Allow it to stand."
  ],
  observation: "Appearance of a reddish-brown precipitate at the acid layer indicates Argemone oil.",
  conclusion: "Reddish-brown color confirms adulteration.",
  precautions: ["Nitric acid is dangerous; handle with extreme caution."]
};

const teaIronFilingsTest: TestProcedure = {
  aim: "To detect iron filings in tea leaves.",
  materials: ["Filter paper or white paper", "Magnet", "Tea leaves sample"],
  procedure: [
    "Spread a small quantity of tea leaves on a white paper.",
    "Move a magnet through and over the tea leaves."
  ],
  observation: "Iron filings will stick to the magnet.",
  conclusion: "If particles stick to the magnet, the tea is adulterated with iron filings.",
  precautions: ["Use a strong magnet for better detection."]
};

const teaColorTest: TestProcedure = {
  aim: "To detect artificial color in tea leaves.",
  materials: ["Filter paper or white blotting paper", "Water", "Tea leaves"],
  procedure: [
    "Spread some tea leaves on a white filter paper.",
    "Sprinkle some water on the leaves to make the paper wet.",
    "Remove the leaves and observe the paper."
  ],
  observation: "Pure tea leaves will not stain the paper immediately. Artificially colored tea will leave pink or red spots/streaks on the paper.",
  conclusion: "Colored spots on the paper indicate added artificial color.",
  precautions: ["Use white paper for clear visibility."]
};

const chilliBrickPowderTest: TestProcedure = {
  aim: "To detect brick powder in chilli powder.",
  materials: ["Beaker", "Water", "Chilli powder sample"],
  procedure: [
    "Take a beaker full of water.",
    "Add a teaspoon of chilli powder to it.",
    "Do not stir; let it settle."
  ],
  observation: "Pure chilli powder floats on the surface. Brick powder settles at the bottom quickly.",
  conclusion: "Red sediment at the bottom indicates brick powder.",
  precautions: ["Do not disturb the water while observing."]
};

const chilliColorTest: TestProcedure = {
  aim: "To detect artificial color (Rhodamine B) in chilli powder.",
  materials: ["Glass of water", "Chilli powder sample"],
  procedure: [
    "Take a glass of water.",
    "Sprinkle a small quantity of chilli powder on the surface.",
    "Observe the water carefully."
  ],
  observation: "If colored streaks descend from the floating powder, artificial color is present. Pure powder floats without releasing color immediately.",
  conclusion: "Reddish streaks indicate the presence of artificial water-soluble dyes.",
  precautions: ["Do not stir the water immediately."]
};

const blackPepperPapayaTest: TestProcedure = {
  aim: "To detect papaya seeds in black pepper.",
  materials: ["Beaker or Glass", "Water", "Black pepper sample"],
  procedure: [
    "Take a glass or beaker filled with water.",
    "Add a sample of black pepper corns to it.",
    "Stir well and allow it to stand for a few minutes."
  ],
  observation: "Good quality black pepper sinks to the bottom. Papaya seeds float on the surface.",
  conclusion: "Floating seeds indicate adulteration with papaya seeds.",
  precautions: ["Ensure the water is still before final observation."]
};

// --- Data Structure ---

export const FOOD_DATABASE: FoodItem[] = [
  {
    id: 'turmeric',
    name: 'Turmeric Powder',
    icon: Utensils,
    adulterants: [
      { id: 'chalk', name: 'Chalk Powder', test: turmericChalkTest },
      { id: 'metanil', name: 'Metanil Yellow', test: turmericMetanilTest }
    ]
  },
  {
    id: 'chilli',
    name: 'Chilli Powder',
    icon: Flame,
    adulterants: [
      { id: 'brick', name: 'Brick Powder', test: chilliBrickPowderTest },
      { id: 'artificial_color', name: 'Artificial Color', test: chilliColorTest }
    ]
  },
  {
    id: 'milk',
    name: 'Milk',
    icon: Milk,
    adulterants: [
      { id: 'water', name: 'Water', test: milkWaterTest },
      { id: 'starch', name: 'Starch', test: milkStarchTest },
      { id: 'detergent', name: 'Detergent', test: milkDetergentTest }
    ]
  },
  {
    id: 'honey',
    name: 'Honey',
    icon: Hexagon,
    adulterants: [
      { id: 'sugar_solution', name: 'Sugar Solution', test: honeySugarTest }
    ]
  },
  {
    id: 'sugar',
    name: 'Sugar',
    icon: Sparkles,
    adulterants: [
      { id: 'chalk_powder', name: 'Chalk Powder', test: sugarChalkTest }
    ]
  },
  {
    id: 'oil',
    name: 'Edible Oil',
    icon: Droplet,
    adulterants: [
      { id: 'argemone', name: 'Argemone Oil', test: oilArgemoneTest }
    ]
  },
  {
    id: 'tea',
    name: 'Tea Leaves',
    icon: Leaf,
    adulterants: [
      { id: 'iron', name: 'Iron Filings', test: teaIronFilingsTest },
      { id: 'color', name: 'Artificial Color', test: teaColorTest }
    ]
  },
  {
    id: 'black_pepper',
    name: 'Black Pepper',
    icon: CircleDot,
    adulterants: [
      { id: 'papaya', name: 'Papaya Seeds', test: blackPepperPapayaTest }
    ]
  }
];