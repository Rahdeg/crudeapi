const express = require('express');
const cors = require('cors');
const {createDB, createTables} = require('./src/config/db.init');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.get('/', (req, res) => {
    res.status(200).send({
        status: "success",
        data: {
            message: "Todo API of the SideHustle Portfolio Bootcamp"
        }
    });
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Running on PORT ${PORT}`);
});