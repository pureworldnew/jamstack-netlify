/* eslint-disable no-unused-vars */
/* Import faunaDB sdk */
const { MongoClient } = require("mongodb");
const getMongoDBSecret = require("./utils/getMongoDBSecret");

exports.handler = async (event, context) => {
   console.log("Function `profile-read-all` invoked");

   const client = new MongoClient(getMongoDBSecret());
   // Create a MongoClient with a MongoClientOptions object to set the Stable API version
   try {
      const database = client.db("selftrain");
      const profilesCollection = database.collection("profiles");

      const profiles = await profilesCollection.find({}).toArray();
      console.log(profiles);

      // print a message if no documents were found
      if ((await profilesCollection.countDocuments({})) === 0) {
         console.log("No documents found!");
      }
      return {
         statusCode: 200,
         body: JSON.stringify(profiles),
      };
   } finally {
      await client.close();
   }
};
