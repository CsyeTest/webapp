const config = require("./config/config.js");
const express = require('express');
const db = require('./models');
const routes = require("./routes/index");


const app = express();
const PORT = config.PORT;
const HOSTNAME = config.HOSTNAME;
app.use(express.json());
app.use("/", routes.health);
app.use("/v1", routes.user);

app.use('*',(req,res)=>{
res.status(404).send();
});

app.listen(PORT, async () => {
    try {
        await db.sequelize.authenticate();
        await db.sequelize.sync()
        console.log('Database connected successfully.');
        console.log(`Server is running on http://${HOSTNAME}:${PORT}`);
    } catch (error) {
        console.error('Error during server startup:', error);
    }
})
