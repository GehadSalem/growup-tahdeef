const axios = require("axios");

const getCurrency = async (req: { headers: { [x: string]: any; }; connection: { remoteAddress: any; }; userCurrency: string; }, res: any, next: () => void) => {
  try {
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    const response = await axios.get(`https://ipapi.co/${ip}/json/`);
    req.userCurrency = response.data.currency || "USD";
    next();
  } catch (err) {
    if (err instanceof Error) {
      console.error("Currency detection failed:", err.message);
    } else {
      console.error("Currency detection failed:", err);
    }
    req.userCurrency = "USD";
    next();
  }
};

module.exports = getCurrency;
