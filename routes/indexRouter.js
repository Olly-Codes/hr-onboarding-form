const { Router } = require("express");
const formController = require("../controllers/formController");

const indexRouter = Router();

indexRouter.get("/", (req, res) => res.redirect("/form"));
indexRouter.get("/form", formController.formGet);
indexRouter.post("/form", formController.formPost);

module.exports = indexRouter;