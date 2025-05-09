const fs = require('fs');
const express = require('express');
const app = express();
const port = 3000;

const helmet = require('helmet');

app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'", "http://localhost:3000"],
            scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "blob:"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", "data:", "http://localhost:3000"],
            workerSrc: ["'self'", "blob:"]
        },
    },
}));

const cors = require('cors');
app.use(cors());

const path = require('path');


// Serve static files properly
app.use(express.static(path.join(__dirname)));

app.use(express.json());

// Load player data from file
function loadGameData() {
    try {
        let rawData = fs.readFileSync('playerData.json', 'utf8');
        return JSON.parse(rawData);
    } catch (err) {
        console.error("Error loading JSON:", err);
        return { players: [] }; // Return empty array if file missing
    }
}

// Load all existing players
app.get('/getPlayers', (req, res) => {
    let gameData = loadGameData(); // Load existing player data
    res.json(gameData); // Send the player data back
});

// Save new player
app.post('/addPlayer', (req, res) => {
    let gameData = loadGameData(); 
    let newPlayer = req.body; 

    gameData.players.push(newPlayer); 
    fs.writeFileSync('playerData.json', JSON.stringify(gameData, null, 2)); 

    res.json({ message: "New player saved!", player: newPlayer });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});