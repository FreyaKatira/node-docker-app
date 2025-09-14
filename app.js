const express = require('express');
const app = express();
const port = process.env.PORT || 8888;

app.get('/', (req, res) => res.send('Hello from Node in Docker!'));

app.listen(port, () => console.log(`App listening on port ${port}`));
