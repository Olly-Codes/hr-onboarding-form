const { Router } = require("express");
const formController = require("../controllers/formController");
const approvalController = require("../controllers/approvalController");

const indexRouter = Router();

indexRouter.get("/", (req, res) => res.redirect("/form"));

indexRouter.get("/form", formController.formGet);
indexRouter.post("/form", formController.formPost);

indexRouter.get("/approve/:id", approvalController.approveGet);
indexRouter.post("/approve/:id", approvalController.approvePost);

module.exports = indexRouter;