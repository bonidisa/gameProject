let express = require('express');
let bodyparser = require('body-parser');
let app = express();
let port = 3000;

//Préparation du serveur
app.set('view engine', 'ejs');

app.use('/', express.static(__dirname + '/www')); // redirect root

app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));      // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));            // redirect JS jQuery
app.use('/js', express.static(__dirname + '/node_modules/popper.js/dist/umd'));     // redirect popper
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));    // redirect bootstrap CSS
app.use('/views', express.static(__dirname + '/views'));                            // redirect ejs

// Body parser
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

app.listen(port, () => {
    console.log('Le serveur est en route');
    console.log(`Serveur listening at http://localhost:${port}`);
});

//let body = document.getElementsById("playerTabList");

class Player 
{
    constructor(name) {
        this.name = name;
        this.score = 0;
    }
}

let playerList = [];

function Addplayer(player)
{
    playerList[playerList.length] = player;
};

app.get('/', (req, res, next) => {
    res.render('index.ejs', {playerList: playerList});
})

app.post('/', (req, res, next) => {
    Addplayer(new Player(req.body.name));   // Ajoute un joueur
    console.log(playerList);                // Affiche le tableau dans VS

    res.redirect('/');                      // Actualise la page 
});

app.use((req, res, next) => {       // Implémentation page 404
    res.status(404).render('error.ejs');
});