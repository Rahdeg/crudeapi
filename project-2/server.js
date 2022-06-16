const express = require('express');
const cors = require('cors');
const app = express();
const userRoutes = require('./src/routes/user');
const taskRoutes = require('./src/routes/task');

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

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/task', taskRoutes);


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Running on PORT ${port}`);
});