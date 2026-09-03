import express from "express";
import cors from "cors";

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));

app.get("/", (_req, res) => {
  res.sendFile(import.meta.dirname + "/views/index.html");
});

// Do not change code above this line
app.get("/api", (req, res) => {
  const dateObj = new Date();
  res.json({
    unix: dateObj.getTime(),
    utc: dateObj.toUTCString()
  })
})

app.get("/api/:date", (req, res) => {

  const date = req.params?.date || "";
  const dateAsNumber = Number(date);
  const dateIsNaN = isNaN(dateAsNumber);

  try {
    if (dateIsNaN && isNaN(Date.parse(date))) throw new Error("Invalid Date");

    const dateObj = !dateIsNaN ? new Date (dateAsNumber): new Date(date);

    res.json({
      unix: dateObj.getTime(),
      utc: dateObj.toUTCString()
    });
  } catch (error) {
    res.json({ error: error.message })
  }
})
// Do not change code below this line

const PORT = 8000;
const listener = app.listen(PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
