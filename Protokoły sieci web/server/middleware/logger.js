const { v4: uuid } = require("uuid");
const { format } = require("date-fns");
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const eventsLogger = async (msg, logFile) => {
  const nowDateTime = format(new Date(), "ddddMMyyyy\tHH:mm:ss");
  const logItem = `${nowDateTime}\t${uuid()}\t${msg}\n`;

  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
    }
    await fsPromises.appendFile(
      path.join(__dirname, "..", "logs", logFile),
      logItem
    );
  } catch (err) {
    console.log(err);
  }
};

const logger = (req, res, next) => {
  eventsLogger(
    `${req.method}\t${req.url}\t${req.headers.origin}`,
    "reqLog.log"
  );
  console.log(`${req.method} ${req.path}`);
  next();
};

module.exports = { eventsLogger, logger };