const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

const validateNewHire = [
  body("new_hire_email")
    .trim()
    .isEmail()
    .withMessage("Enter a valid email address."),
  body("new_hire_phone")
    .trim()
    .matches(/^\+27 \d{2} \d{3} \d{4}$/)
    .withMessage("Enter a phone number in the format +27 12 345 6789."),
];

const renderForm = async (res, errors = [], values = {}) => {
  const [jobs, managers, hrOwners] = await Promise.all([
    db.getAllJobs(),
    db.getEmployeesByRole("Manager"),
    db.getEmployeesByRole("HR Employee"),
  ]);
  res.render("form", { jobs, managers, hrOwners, errors, values });
};

const formGet = async (req, res) => {
  await renderForm(res);
};

const formPost = [
  validateNewHire,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400);
      return renderForm(res, errors.array(), req.body);
    }

    const { new_hire_name, new_hire_email, new_hire_phone, new_hire_start_date, job_id, manager_id, hr_owner_id } = req.body;

    try {
      await db.createNewHire({
        new_hire_name,
        new_hire_email,
        new_hire_phone: new_hire_phone || null,
        new_hire_start_date,
        job_id,
        manager_id,
        hr_owner_id,
      });
    } catch (error) {
      console.error(error);
      if (error.code === "23505") {
        return res.status(409).send("A new hire with that email already exists.");
      }
      throw error;
    }

    res.render("success", { new_hire_name });
  },
];

module.exports = { formGet, formPost };