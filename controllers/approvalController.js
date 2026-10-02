const db = require("../db/queries");

const isUuid = (value) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);

const approveGet = async (req, res) => {
  const { id } = req.params;
  const newHire = isUuid(id) ? await db.getNewHireForApproval(id) : null;

  if (!newHire) {
    return res
      .status(404)
      .render("approval", { newHire: null, message: "This request could not be found." });
  }
  res.render("approval", { newHire, message: null });
};

const approvePost = async (req, res) => {
  const { id } = req.params;
  const { decision } = req.body;

  let status = null;
  if (decision === "approve") status = "Approved";
  if (decision === "reject") status = "Rejected";

  if (!isUuid(id) || !status) return res.status(400).send("Invalid request.");

  await db.setApprovalStatus(id, status);
  res.redirect(303, `/approve/${id}`);
};

module.exports = { approveGet, approvePost };