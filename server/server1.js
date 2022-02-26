const express = require('express');
const app = express();
const ApartmentRoutes = require('./routes/ApartmentRoutes');
const port = 3000
const CORS = require('cors');
const bodyParser = require('body-parser');

app.use(CORS());
app.use(bodyParser.json());
app.use(ApartmentRoutes);

app.listen(port, () => {
    console.log(`SGV server listening at http://localhost:${port}`)
});