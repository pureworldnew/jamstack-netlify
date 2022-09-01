const faunadb = require("faunadb");
const q = faunadb.query;

module.exports = function multiUpsert(arrData) {
  return q.Map(
    arrData,
    q.Lambda(
      ["d"],
      q.If(
        q.Exists(
          q.Match(
            q.Index("all_time_entries"),
            q.Select(["data", "id"], q.Var("d"))
          )
        ),
        q.Replace(
          q.Select(
            "ref",
            q.Get(
              q.Match(
                q.Index("all_time_entries"),
                q.Select(["data", "id"], q.Var("d"))
              )
            )
          ),
          q.Var("d")
        ),
        q.Create(q.Collection("time_entries"), q.Var("d"))
      )
    )
  );
};
