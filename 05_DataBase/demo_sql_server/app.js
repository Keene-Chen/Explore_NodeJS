const sql = require('mssql');

async () => {
  try {
    // make sure that any items are correctly URL encoded in the connection string
    await sql.connect(
      'Server=localhost,1433;Database=chen;User Id=sa;Password=2555;Encrypt=true'
    );
    const result = await sql.query`select * from test`;
    console.dir(result);
  } catch (err) {
    // ... error checks
  }
};
