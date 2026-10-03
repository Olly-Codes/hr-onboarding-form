const crypto = require("node:crypto");
const jwt = require("jsonwebtoken");
const db = require("../db/queries");

const isUuid = (value) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);

const chatTokenGet = async (req, res) => {
  const { rid } = req.query;

  if (!isUuid(rid) || !(await db.newHireExists(rid))) {
    return res.status(404).json({ error: "Unknown request." });
  }

  const now = Math.floor(Date.now() / 1000);
  const token = jwt.sign(
    {
      iat: now,
      iss: process.env.LIVECHAT_WIDGET_ID,
      jti: crypto.randomUUID(),
      ski: process.env.LIVECHAT_KEY_ID,
      stp: "externalPersonId",
      sub: rid,
      exp: now + 60,
    },
    Buffer.from(process.env.LIVECHAT_SECRET_KEY, "base64")
  );

  res.set("Cache-Control", "no-store");
  res.json({ token });
};

module.exports = { chatTokenGet };