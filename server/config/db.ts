import mysql from 'mysql2'

const connection = mysql.createConnection({
    host: '34.95.160.17',
    user: 'root',
    password: '2Kh=Jq$Jdxv5h10)',
    port: 3306,
    database: 'orray-system-db'
})

export {connection}