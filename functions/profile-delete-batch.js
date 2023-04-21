/* eslint-disable no-unused-vars */
const { MongoClient, ObjectId } = require("mongodb");
const getMongoDBSecret = require("./utils/getMongoDBSecret");

exports.handler = async (event, context) => {
   const data = JSON.parse(event.body);
   console.log("Function `profile-delete-batch` invoked", data.ids);

   const client = new MongoClient(getMongoDBSecret());
   try {
      const database = client.db("selftrain");
      const profilesCollection = database.collection("profiles");
      const query = { _id: { $in: data.ids.map((e) => new ObjectId(e)) } };
      const result = await profilesCollection.deleteMany(query);
      if (result.deletedCount !== 0) {
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
