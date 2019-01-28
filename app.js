const express = require("express");
const app = express();
const router = require("./route/router");

app.use(router)

app.get("/", (req, res) => {
    res.send("server aktif")
});

app.listen(3315, () => {
    console.log("server berjalan di port 3315")
})