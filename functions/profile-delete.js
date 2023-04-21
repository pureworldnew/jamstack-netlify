/* eslint-disable no-unused-vars */
const { MongoClient, ObjectId } = require("mongodb");
const getId = require("./utils/getId");
const getMongoDBSecret = require("./utils/getMongoDBSecret");

exports.handler = async (event, context) => {
   const id = getId(event.path);
   console.log("typeofId", typeof id);
   console.log("Function `profile-delete` invoked", id);

   const client = new MongoClient(getMongoDBSecret());
   try {
      const database = client.db("selftrain");
      const profilesCollection = database.collection("profiles");
      const query = { _id: new ObjectId(id) };
      const result = await profilesCollection.deleteOne(query);
      if (result.deletedCount === 1) {
         console.log("Successfully deleted one document.");
         return {
            statusCode: 200,
            body: JSON.stringify("Successfully deleted one document."),
         };
      }
      console.log("No documents matched the query. Deleted 0 documents.");
      return {
         statusCode: 400,
         body: JSON.stringify(
            "No documents matched the query. Deleted 0 documents."
         ),
      };
   } finally {
      await client.close();
   }
};
