import * as path from 'path';
import * as express from 'express';
import * as request from 'request';
const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/views'));
app.get('/', function (req, res) {
  request('https://pokeapi.co/api/v2/pokemon/', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.render('index', {
        message: 'Pokemon List',
        pokemon: JSON.parse(body).results
      });
    }
  });
});
app.use(express.urlencoded());
app.post('/details', function (req, res) {
  request(req.body["url"], function (error, response, body) {
    if (!error && response.statusCode == 200) {
      let json= JSON.parse(body);
      res.render('index', {
        message: 'Details',
        name: json.name,
        image: json.sprites.front_default,
        types:json.types,
        weight: `Weight: ${json.weight/10} kg`,
        height: `Height: ${json.height/10} m`,
        functions: json.abilities
      });
    }
  });
});
app.get('/bootstrap.css', function(req, res) {
  res.sendFile(__dirname + "/" + "bootstrap.css");
});

app.listen(8080, () => console.log('API is listening on port 8080'));
