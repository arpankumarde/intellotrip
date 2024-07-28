const UserAgent = require("user-agents");
const Prettier = require("../utils/prettify.js");

exports.trains = async (req, res) => {
  const { from } = req?.query;

  //   validate the query params
  if (!from) {
    return res.status(400).json({ message: "Please provide the from station" });
  }

  const BetweenStation = new Prettier().BetweenStation;

  const URL_Trains = `https://erail.in/rail/getTrains.aspx?Station_From=${from}
    &Station_To=HWH
    &DataSource=0&Language=0&Cache=true`;
  try {
    // const userAgent = new uUerAgent();
    const response = await fetch(URL_Trains, {
      method: "GET",
      headers: { "User-Agent": UserAgent.toString() },
    });
    const data = await response.text();
    const json = BetweenStation(data);
    res.json(json);
  } catch (error) {
    console.log(error.message);
  }
};
