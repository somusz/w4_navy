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


const newFirst = process.argv[2];
const newLast = process.argv[3];
const newDate = process.argv[4];

knex.insert( [ {first_name: newFirst, last_name: newLast, birthdate: newDate} ], 'id' ).into('famous_people').asCallback( (err) => {
  if (err) console.log(err);
}).then(console.log('New entry submitted')).then(process.exit);




// knex.select('*').from('famous_people').where('first_name', lookupValue).orWhere('last_name', lookupValue).asCallback( (err, rows) => {
//   if (err) console.log(err);

//   print(rows);

// }).then(process.exit);





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
