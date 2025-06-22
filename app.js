const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const generateRoute = require('./routes/generate');

const app = express();
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/api', generateRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
