const faunadb = require("faunadb");
// const deleteAll = require("./deleteAll");

const q = faunadb.query;

module.exports = function multiUpsert(arrData) {
   console.log("arrData", arrData);
   return q.Map(
      arrData,
      q.Lambda(["d"], q.Create(q.Collection("track_entries"), q.Var("d")))
   );
};
