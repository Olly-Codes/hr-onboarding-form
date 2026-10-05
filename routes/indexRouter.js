const { Router } = require("express");
const formController = require("../controllers/formController");
const approvalController = require("../controllers/approvalController");
const chatController = require("../controllers/chatController");
const dashboardController = require("../controllers/dashboardController");

const indexRouter = Router();

indexRouter.get("/", (req, res) => res.redirect("/form"));

indexRouter.get("/form", formController.formGet);
indexRouter.post("/form", formController.formPost);

indexRouter.get("/approve/:id", approvalController.approveGet);
indexRouter.post("/approve/:id", approvalController.approvePost);

indexRouter.get("/chat-token", chatController.chatTokenGet);

indexRouter.get("/dashboard", dashboardController.dashboardGet);

module.exports = indexRouter;



