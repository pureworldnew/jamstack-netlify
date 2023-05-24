/* eslint-disable no-unused-vars */
/* Import faunaDB sdk */
const { MongoClient } = require("mongodb");
const getMongoDBSecret = require("./utils/getMongoDBSecret");

exports.handler = async (event, context) => {
   const data = JSON.parse(event.body);
   console.log("Function `profile-create-all` invoked", data);
   const client = new MongoClient(getMongoDBSecret());
   try {
      const database = client.db("selftrain");
      const profilesCollection = database.collection("profiles");
      const insertedOne = await profilesCollection.insertOne(data);
      return {
         statusCode: 200,
         body: JSON.stringify(insertedOne.profileName),
      };
   } finally {
      await client.close();
   }
};
