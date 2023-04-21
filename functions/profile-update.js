/* eslint-disable no-unused-vars */
const { MongoClient, ObjectId } = require("mongodb");
const getId = require("./utils/getId");
const getMongoDBSecret = require("./utils/getMongoDBSecret");

exports.handler = async (event, context) => {
   const data = JSON.parse(event.body);
   const id = getId(event.path);
   console.log("typeofId", typeof id);
   console.log("Function `profile-update` invoked", data, id, new ObjectId(id));

   const client = new MongoClient(getMongoDBSecret());
   try {
      const database = client.db("selftrain");
      const profilesCollection = database.collection("profiles");
      const query = { _id: new ObjectId(id) };
      const newvalues = { $set: data };
      const updateOne = await profilesCollection.updateOne(query, newvalues);
      console.log(updateOne);
      return {
         statusCode: 200,
         body: JSON.stringify("document updated"),
      };
   } finally {
      await client.close();
   }
};
