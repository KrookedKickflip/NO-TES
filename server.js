const express = require('express');

const apiRoutes = require('./routes/routes-api');
const htmlRoutes = require('./routes/routes-html');

const PORT = process.env.PORT || 3001;

const app = express();

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);