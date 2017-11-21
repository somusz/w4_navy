const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

const lookupValue = process.argv[2];


client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }

  client.query("select * from famous_people where last_name = $1", [lookupValue], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }

    toPrint = `Found ${result.rowCount} person(s) by the name '${lookupValue}':`
    people = `- ${result.rows[0].id}: ${result.rows[0].first_name} ${result.rows[0].last_name}, born ${result.rows[0].birthdate}`

    console.log(toPrint);
    result.rows.forEach( () => {
      console.log(people);
    }
    )

    client.end();
  });
});


