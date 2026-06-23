import express from 'express';
import mongoose from 'mongoose';
import router from './router.js';
import fileUpload from 'express-fileupload';
import swaggerDocument from './swagger.js';

const port = 5000;
const DB_URL = 'mongodb://admin:mongo721887@192.168.0.62/phones?authSource=admin';
const app = express();

app.use(express.json());
app.use(express.static('static'));
app.use(fileUpload({}));

app.get('/api-docs.json', (req, res) => res.json(swaggerDocument));
app.get('/api-docs', (req, res) => {
  res.send(`
<!doctype html>
<html lang="ru">
<head>
  <meta charset="utf-8" />
  <title>Telephones API Docs</title>
  <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5.17.14/swagger-ui.css" />
</head>
<body>
  <div id="swagger-ui"></div>
  <script src="https://unpkg.com/swagger-ui-dist@5.17.14/swagger-ui-bundle.js"></script>
  <script>
    SwaggerUIBundle({
      url: '/api-docs.json',
      dom_id: '#swagger-ui'
    });
  </script>
</body>
</html>
  `);
});

app.use('/api', router);

async function startapp() {
  try {
    await mongoose.connect(DB_URL);
    app.listen(port, () => console.log(`Server started on port ${port}`));
  } catch (e) {
    console.log(e);
  }
}

startapp();
