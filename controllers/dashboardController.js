const db = require("../db/queries");
const isUuid = require("../utils/isUuid");

const dashboardGet = async (req, res) => {
  const hires = await db.getAllNewHires();
  res.render("dashboard", { hires });
};

const hireGet = async (req, res) => {
  const { id } = req.params;
  const hire = isUuid(id) ? await db.getNewHireDetails(id) : null;

  if (!hire) return res.status(404).render("hire", { hire: null });
  res.render("hire", { hire });
};

module.exports = { dashboardGet, hireGet };