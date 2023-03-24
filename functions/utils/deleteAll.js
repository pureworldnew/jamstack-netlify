const faunadb = require("faunadb");

const q = faunadb.query;

module.exports = function deleteAll() {
   return q.Map(
      q.Paginate(q.Documents(q.Collection("track_entries")), { size: 9999 }),
      q.Lambda(["ref"], q.Delete(q.Var("ref")))
   );
};
