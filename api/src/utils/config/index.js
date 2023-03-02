require('dotenv').config(); //esto siempre es asi.

module.exports = {
    dbUser : process.env.DB_USER || 'postgres',
    dbPort : process.env.DB_PORT || '5432',
    dbPassword : process.env.DB_PASSWORD || '1234',
    dbName : process.env.DB_NAME || 'pokemon',
    dbHost : process.env.DBHOST || 'localhost',
    host : process.env.HOST ||'localhost',
    PORT : process.env.PORT || '3001'
}