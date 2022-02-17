const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '61813d00b65f5a5ba0bb509f',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt id velit, blanditiis tenetur laborum dignissimos laboriosam ipsam, facilis odit magnam similique. Quas omnis distinctio sit repudiandae deserunt, similique obcaecati id!',
            price,
            geometry: { 
                type: 'Point', 
                coordinates: [ -0.47413, 50.9654 ] 
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dwlklfqyu/image/upload/v1639055923/YelpCamp/jesz8qb3xazxalz1zjwd.png',
                    filename: 'YelpCamp/jesz8qb3xazxalz1zjwd'
                },
                {
                    url: 'https://res.cloudinary.com/dwlklfqyu/image/upload/v1638969240/YelpCamp/sqxhjrweuqdava0fxeco.jpg',
                    filename: 'YelpCamp/sqxhjrweuqdava0fxeco'
                }
            ]
          
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})

