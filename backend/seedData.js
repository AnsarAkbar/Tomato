const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const Category = require('./models/Category');

dotenv.config();

const menu_list = [
    {
        menu_name: "Salad",
        menu_image: "/images/menu_1.png"
    },
    {
        menu_name: "Rolls",
        menu_image: "/images/menu_2.png"
    },
    {
        menu_name: "Deserts",
        menu_image: "/images/menu_3.png"
    },
    {
        menu_name: "Sandwich",
        menu_image: "/images/menu_4.png"
    },
    {
        menu_name: "Cake",
        menu_image: "/images/menu_5.png"
    },
    {
        menu_name: "Pure Veg",
        menu_image: "/images/menu_6.png"
    },
    {
        menu_name: "Pasta",
        menu_image: "/images/menu_7.png"
    },
    {
        menu_name: "Noodles",
        menu_image: "/images/menu_8.png"
    }
];

const food_list = [
    {
        name: "Greek salad",
        image: "/images/food_1.png",
        price: 12,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Salad"
    },
    {
        name: "Veg salad",
        image: "/images/food_2.png",
        price: 18,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Salad"
    },
    {
        name: "Clover Salad",
        image: "/images/food_3.png",
        price: 16,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Salad"
    },
    {
        name: "Chicken Salad",
        image: "/images/food_4.png",
        price: 24,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Salad"
    },
    {
        name: "Lasagna Rolls",
        image: "/images/food_5.png",
        price: 14,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Rolls"
    },
    {
        name: "Peri Peri Rolls",
        image: "/images/food_6.png",
        price: 12,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Rolls"
    },
    {
        name: "Chicken Rolls",
        image: "/images/food_7.png",
        price: 20,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Rolls"
    },
    {
        name: "Veg Rolls",
        image: "/images/food_8.png",
        price: 15,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Rolls"
    },
    {
        name: "Ripple Ice Cream",
        image: "/images/food_9.png",
        price: 14,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Deserts"
    },
    {
        name: "Fruit Ice Cream",
        image: "/images/food_10.png",
        price: 22,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Deserts"
    },
    {
        name: "Jar Ice Cream",
        image: "/images/food_11.png",
        price: 10,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Deserts"
    },
    {
        name: "Vanilla Ice Cream",
        image: "/images/food_12.png",
        price: 12,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Deserts"
    },
    {
        name: "Chicken Sandwich",
        image: "/images/food_13.png",
        price: 12,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Sandwich"
    },
    {
        name: "Vegan Sandwich",
        image: "/images/food_14.png",
        price: 18,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Sandwich"
    },
    {
        name: "Grilled Sandwich",
        image: "/images/food_15.png",
        price: 16,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Sandwich"
    },
    {
        name: "Bread Sandwich",
        image: "/images/food_16.png",
        price: 24,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Sandwich"
    },
    {
        name: "Cup Cake",
        image: "/images/food_17.png",
        price: 14,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Cake"
    },
    {
        name: "Vegan Cake",
        image: "/images/food_18.png",
        price: 12,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Cake"
    },
    {
        name: "Butterscotch Cake",
        image: "/images/food_19.png",
        price: 20,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Cake"
    },
    {
        name: "Sliced Cake",
        image: "/images/food_20.png",
        price: 15,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Cake"
    },
    {
        name: "Garlic Mushroom",
        image: "/images/food_21.png",
        price: 14,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pure Veg"
    },
    {
        name: "Fried Cauliflower",
        image: "/images/food_22.png",
        price: 22,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pure Veg"
    },
    {
        name: "Mix Veg Pulao",
        image: "/images/food_23.png",
        price: 10,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pure Veg"
    },
    {
        name: "Rice Zucchini",
        image: "/images/food_24.png",
        price: 12,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pure Veg"
    },
    {
        name: "Cheese Pasta",
        image: "/images/food_25.png",
        price: 12,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pasta"
    },
    {
        name: "Tomato Pasta",
        image: "/images/food_26.png",
        price: 18,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pasta"
    },
    {
        name: "Creamy Pasta",
        image: "/images/food_27.png",
        price: 16,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pasta"
    },
    {
        name: "Chicken Pasta",
        image: "/images/food_28.png",
        price: 24,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pasta"
    },
    {
        name: "Butter Noodles",
        image: "/images/food_29.png",
        price: 14,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Noodles"
    },
    {
        name: "Veg Noodles",
        image: "/images/food_30.png",
        price: 12,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Noodles"
    },
    {
        name: "Somen Noodles",
        image: "/images/food_31.png",
        price: 20,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Noodles"
    },
    {
        name: "Cooked Noodles",
        image: "/images/food_32.png",
        price: 15,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Noodles"
    }
];

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/tomato');
        
        // Clear existing data
        await Promise.all([
            Category.deleteMany({}),
            Product.deleteMany({})
        ]);

        // Insert new data
        await Promise.all([
            Category.insertMany(menu_list),
            Product.insertMany(food_list)
        ]);

        console.log('Data seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedData(); 