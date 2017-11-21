const pg = require("pg");
const settings = require("./settings"); // settings.json
const knex = require('knex') ({
  client: 'pg',
  connection: {
    user:     settings.user,
    password: settings.password,
    database: settings.database,
    host:     settings.hostname,
    port:     settings.port,
    ssl:      settings.ssl
    }
  });


const lookupValue = process.argv[2];

print = (rows) => {
  console.log(`Found ${rows.length} person(s) by the name '${lookupValue}':`)
  rows.forEach( (row) => {
    console.log(`- ${row.id}: ${row.first_name} ${row.last_name}, born ${row.birthdate.toString().slice(4,15)}`);
  })
}

knex.select('*').from('famous_people').where('first_name', lookupValue).orWhere('last_name', lookupValue).asCallback( function (err, rows) {
  if (err) console.log(err);

  print(rows);

}).then(process.exit);





// client.connect((err) => {
//   if (err) {
//     return console.error("Connection Error", err);
//   }

//   client.query("select * from famous_people where last_name = $1", [lookupValue], (err, result) => {
//     if (err) {
//       return console.error("error running query", err);
//     }
//   }
//     )

//     client.end();
//   });
// });
