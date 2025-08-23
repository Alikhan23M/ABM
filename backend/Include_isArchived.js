// // update-multiple-models.js
const mongoose = require('mongoose');
const connectDB = require('./configuration/dbConfiguration');

const Blog = require('./models/blogModel');
const BodyCards = require('./models/bodyCardModel');
const Career = require('./models/careerModel');
const Carousel = require('./models/carousalModel');
const Category = require('./models/categoryModel');
const Event = require('./models/eventModel');
const HelpOption = require('./models/helpOptionModel');
const News = require('./models/newsModel');
const Pages = require('./models/pagesModel');
const Partner = require('./models/partnerModel');
const Project = require('./models/projectModel');
const Stats = require('./models/statsModel');
const Team = require('./models/teamModel');
const Tender = require('./models/TenderModel');
const User = require('./models/userModel');
const Video = require('./models/videoModel');

// // Add all the models you want to update to this array
// const modelsToUpdate = [Blog, BodyCards, Career, Carousel, Category, Event, HelpOption, News, Pages, Partner, Project, Team, Tender, User, Video];


// const Migrate = async () => {

//     try {

//         await connectDB();
//             await connectDB();
//     for (const Model of modelsToUpdate) {
//       console.log(`\nStarting update for model: ${Model.modelName}`);
//       const result = await Model.updateMany(
//         { isArchived: { $exists: false } },
//         { $set: { isArchived: false } }
//       );
//       console.log(`Successfully updated ${result.modifiedCount} documents in ${Model.modelName} collection.`);
      
//     }
//     process.exit();
//     console.log('\nAll models have been updated!');
//     } catch (err) {
//         console.error('Error updating models:', err);
//         process.exit();

//     }
// }

// Migrate();





// This script connects to a MongoDB database and runs the updateMany()
// query to add the 'siteUrl' field to all documents in the 'partners'
// collection that are missing it.

// You will need to install the 'mongodb' package first.
// Open your terminal and run: npm install mongodb


async function main() {
  try {
    // Connect to the MongoDB client.
   await connectDB();

    // Select the database. Replace 'yourDatabase' with your actual database name.
    

    // The filter to find documents where the 'siteUrl' field does not exist.
    const filter = {
      siteUrl: { $exists: false }
    };

    // The update operation to set the 'siteUrl' field to an empty string.
    const updateDoc = {
      $set: {
        siteUrl: ""
      }
    };

    // Execute the update operation.
    const result = await Partner.updateMany(filter, updateDoc);

    console.log(`Successfully updated ${result.modifiedCount} documents.`);
  

  } catch (err) {
    console.error("An error occurred:", err);
    process.exit(1);
  } finally {
    // Close the connection when done.
   
    process.exit();
    console.log("Connection closed.");
  }
}

// Run the main function.
main();
