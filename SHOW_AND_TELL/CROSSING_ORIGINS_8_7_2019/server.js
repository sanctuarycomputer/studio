const express = require('express');
const cors = require('cors');
const app = express();
const port = 3003;
const inventory = {
  '1001': {
    type: 'hoodie',
    color: 'blue',
    count: 3,
    sku: 'ABC1234'
  },
  '1002': {
    type: 'poster',
    color: 'many',
    count: 77,
    sku: 'XYZ567',
  },
};
const secretValue = 'SECRET_SAUCE';

// app.use(cors());
app.use(
  cors({
    origin: 'http://localhost:8000',
    credentials: true,
    exposedHeaders: ['X-Sanctu-Compu']
  })
);

// app.options('/api/products', cors()) // enable pre-flight request


app.get('/', (req, res) => res.send('Hello World!'));
app.get('/api/products', (req, res) => {
  res.json({ data: inventory });
});
app.put('/api/products/1001', (req, res) => {
  if (req.get('X-Sanctu-Compu') !== secretValue) {
    res.status(400);
    res.send('Not Allowed');
  } else {
    inventory['1001'].color = "yellow";
    res.status(200);
    res.json({ data: inventory });
  }
});

app.listen(port, () => console.log(`Now listening on port ${port}!`));
