const mssql = require('mssql');

const db = {};
const config = {
  user: 'sa',
  password: '123456',
  server: 'localhost',
  database: 'master',
  port: 1433,
  options: {
    encrypt: true, // Use this if you're on Windows Azure
  },
  pool: {
    min: 0,
    max: 10,
    idleTimeoutMillis: 3000,
  },
};

// 执行sql,返回数据.
db.sql = function (sql, callBack) {
  const connectionPool = new mssql.Connection(config, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    /* eslint-disable-next-line no-undef */
    const ps = new mssql.PreparedStatement(connection);
    ps.prepare(sql, (err) => {
      if (err) {
        console.log(err);
        return;
      }
      ps.execute('', (err, result) => {
        if (err) {
          console.log(err);
          return;
        }

        ps.unprepare((err) => {
          if (err) {
            console.log(err);
            /* eslint-disable-next-line no-undef */
            callback(err, null);
            return;
          }
          callBack(err, result);
        });
      });
    });
  });
};

module.exports = db;
