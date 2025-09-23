import express from "express";
const app = express();

// expose the folder directly at /mockdata
app.use("/mockdata", express.static("mockdata"));

app.listen(3000, () => console.log("Serving on http://localhost:3000"));
