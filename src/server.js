const app = require('./main');
const { db } = require('./database/db.connection');

const PORT = process.env.PORT || 7000;

db.authenticate().then(() => {
  console.log('conectado a la base de datos 😛');
});

db.sync().then(() => {
  console.log('sincronizando con la base de datos 🤩');
});

app.listen(PORT, () => {
  console.log(`server runnign on port ${PORT} 😎`);
});
