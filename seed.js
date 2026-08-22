require('dotenv').config()
const connectDB = require('./db/connectDB');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Category = require('./models/Category');
const User = require('./models/User')
const Registration = require('./models/Registration')
const Event = require('./models/Event');

const seed = async() =>{
    try{
        await connectDB();
        await Registration.deleteMany({});
        await Event.deleteMany({});
        await User.deleteMany({});
        await Category.deleteMany({});
        console.log("Cleaning done.");
        
        const hashedPass = await bcrypt.hash('Alexbirthday123', 10)
        const hashedPass2 = await bcrypt.hash('SamanthaCool123', 10)
        const admin = await User.create({
            name: 'Alex',
            email: 'Alex@gmail.com',
            password: hashedPass,
            role: 'admin'
        });
        const admin2 = await User.create({
            name: 'Samantha',
            email: 'Samantha@gmail.com',
            password: hashedPass2,
            role: 'admin'
        });
        console.log('The admin user has been created successfully.');

        const categories = await Category.create([
            {
                name: 'Music',
                description: 'Feel the music like you never did before!'
            },
            {
                name: 'Tech',
                description: 'Level up your brain with some modern technology!'
            },
            {
                name: 'Sports',
                description: 'Become active and join some wonderful activites!'
            },
            {
                name: 'Cooking',
                description: 'Become a great cook and make some wonderful dishes!'
            }
        ]);

        console.log("The categories have been created successfully.");
        const events = await Event.create([
            {   
                title: 'Electric Nights',
                description: 'Enjoy the best music in the best music event!',
                category: categories[0]._id,
                date: new Date('2026-08-10'),
                city: 'Newyork',
                venue: 'Central Park Arena',
                capacity: 400,
                organizer: admin._id,
                registrations: 387
            },
            {   
                title: 'Pasta Wars',
                description: 'Join us in wars full of fun and lots of pasta, yum!',
                category: categories[3]._id,
                date: new Date('2026-11-03'),
                city: 'Roma',
                venue: 'City Food Center',
                capacity: 220,
                organizer: admin._id,
                registrations: 219
            },
            {   
                title: 'Geek Speak',
                description: 'Meet up with professional developers and develope new soft-skills!',
                category: categories[1]._id,
                date: new Date('2026-09-07'),
                city: 'Paris',
                venue: 'Grand Tech Hall',
                capacity: 300,
                organizer: admin2._id,
                registrations: 176
            },
            {   
                title: 'Marathon of Cairo',
                description: 'Run as fast as you can and strenghen yourself!',
                category: categories[2]._id,
                date: new Date('2026-08-23'),
                city: 'Cairo',
                venue: 'Cairo Sports Club',
                capacity: 1220,
                organizer: admin._id,
                registrations: 623
            },
            {   
                title: 'Sizzle & Spice',
                description: 'Discover how to use strong spices and make tasty sauces from scratch!',
                category: categories[3]._id,
                date: new Date('2026-12-01'),
                city: 'London',
                venue: 'Downtown Cooking Studio',
                capacity: 70,
                organizer: admin2._id,
                registrations: 70
            },
            {   
                title: 'AI Conference',
                description: 'Dive deeper into AI and discover new information!',
                category: categories[1]._id,
                date: new Date('2026-09-02'),
                city: 'Giza',
                venue: 'Smart Village Hall',
                capacity: 700,
                organizer: admin2._id,
                registrations: 492
            },
            {   
                title: 'Code Day',
                description: 'Join us to build websites together!',
                category: categories[1]._id,
                date: new Date('2026-09-15'),
                city: 'Cairo',
                venue: 'Downtown Tech Hub',
                capacity: 100,
                organizer: admin._id,
                registrations: 76
            },
            {   
                title: 'Music Fest',
                description: 'Join this live music concert with local bands!',
                category: categories[0]._id,
                date: new Date('2026-09-28'),
                city: 'Paris',
                venue: 'City Music Hall',
                capacity: 2300,
                organizer: admin2._id,
                registrations: 2190
            }
        ])
        console.log(`${categories.length + events.length + 2} docs have been created and added to the database.`);
    } catch(error){
        console.log("Error! Couldn't create data.", error.message);
        process.exit(1);
    } finally{
        await mongoose.disconnect();
        console.log('Database disconnected.')
        process.exit(0);
    }
}

seed();