const app = require('./server/server');

const PORT = process.env.PORT || 7777;
app.listen(PORT, () => {
  console.log('Listening on port ' + PORT);
});
