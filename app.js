const express = require('express');

var app = express();

app.use(express.static(__dirname + '/public'));
app.get('/', (req, res) => {
 
    res.send(`<h1>Excited to play the game ? </h1>
            
            <h2>Just append "/HomePage.html" in the url and enjoy `);
});

app.listen(3000, () => {
    console.log('Server is running')
});