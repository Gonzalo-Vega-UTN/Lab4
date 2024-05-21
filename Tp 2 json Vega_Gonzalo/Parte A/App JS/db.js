// db.js
const sqlite3 = require('sqlite3').verbose();

// Función para inicializar y configurar la base de datos SQLite en memoria
function initializeDatabase() {
  const db = new sqlite3.Database(':memory:');
  
  db.serialize(() => {
    db.run(`CREATE TABLE pais (
      codigo_pais INTEGER PRIMARY KEY,
      nombre_pais VARCHAR(255),
      capital_pais VARCHAR(255),
      region VARCHAR(255),
      poblacion BIGINT,
      latitud DOUBLE,
      longitud DOUBLE
  );
  `);
    
  });

  return db;
}

function insertIntoDatabase(db, data){
  db.run("INSERT INTO pais VALUES ($codigo, $nombre, $capital, $region, $poblacion, $latitud, $longitud)", data, (err) => {
    if (err) {
        console.error('Error al insertar datos en la tabla pais:', err.message);
    } else {
        console.log(`Pais con id: ${data.$codigo} insertdo correctamente`);
    }
});
}
module.exports = { initializeDatabase, insertIntoDatabase };
