const express = require("express");
const path = require("node:path");
const indexRouter = require("./routes/indexRouter");
const app = express();
const cors = require("cors");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.use("/chat-token", cors({ origin: "https://olly-codes.github.io" }));

app.use("/", indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
    if (err) {
        throw err;
    }
    console.log(`Listening on port ${PORT}`);
});