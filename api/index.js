const app = require('./src/app.js');
const { conn } = require('./src/db.js');
const {PORT} = require ('./src/utils/config');

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  console.log('Base de datos conectada')
  app.listen(PORT, () => {
    console.log(`Estas escuchando el puerto ${PORT}`); // eslint-disable-line no-console
  });
});
