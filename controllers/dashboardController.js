const db = require("../db/queries");

const dashboardGet = async (req, res) => {
  const hires = await db.getAllNewHires();
  res.render("dashboard", { hires });
};

module.exports = { dashboardGet };