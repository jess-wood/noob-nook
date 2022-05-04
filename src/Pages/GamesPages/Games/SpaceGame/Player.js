import img from './utils/rocket.png';
import API from "../../../../API_Interface/API_Interface";
import bg from './utils/space.jpg';

let hs=0;
let today = new Date();
let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
let dateTime = date+' '+time;

export class Player{

    getCurrHS = () => {
        const api = new API();

        async function getUserHS() {
            const gameHSJSONString = await api.getSpaceHS(window.currentUserLoggedIn);
            console.log(`routes from the DB ${JSON.stringify(gameHSJSONString[0]['HS_SpaceGame'])}`);
            hs = gameHSJSONString.data[0]['HS_SpaceGame'];
            //return gameHSJSONString.data[0]['HS_SpaceGame'];

        }
        getUserHS();
    }

    dead = false;
    health = 100;
    ammo = 100;
    score = 0;
    speed = 25;
    firebullets = [];
    lastFireAt = Date.now();
    highScore = this.getCurrHS;


    constructor(posX,posY){
        this.posX = posX;
        this.posY = posY;
    }

    deductHealth = () => {
        this.health -= 10
    }

    increaseScore = () =>{
        this.score += 10
    }

    update = (firecb) =>{
        document.onkeydown = (e) =>{
            if(e.keyCode === 39){
                this.posX += this.speed
            }
            if(e.keyCode === 37){
                this.posX -= this.speed
            }
            document.addEventListener("keypress",(e) => {
                if(e.keyCode === 32){
                    if(Date.now() - this.lastFireAt > 250){
                        firecb(this.posX + 32,this.posY);
                        this.lastFireAt = Date.now();
                    }
                }
            })
        }
        if(this.posX < -10 || this.posX > 890){
            this.highScore();
            const api = new API();

            async function getUserHS() {
                const gameHSJSONString = await api.getSpaceHS(window.currentUserLoggedIn);
                console.log(`routes from the DB ${JSON.stringify(gameHSJSONString[0]['HS_SpaceGame'])}`);
                hs = gameHSJSONString.data[0]['HS_SpaceGame'];
                //return gameHSJSONString.data[0]['HS_SpaceGame'];

            }
            getUserHS();
            this.dead = true;
            let currScore= this.score;
            if (this.score > hs){
                const api = new API();

                async function makeNewScore() {
                    const gameHSJSONString = await api.postNewHighScoreSpace(currScore, window.currentUserLoggedIn);
                    console.log(`routes from the DB ${JSON.stringify(gameHSJSONString)}`);
                }
                async function newHSPost() {
                    const gameHSJSONString = await api.postNewGameStatus( window.currentUserLoggedIn, `scored ${currScore} points in Meteor Killers and beat their high score!`, dateTime);
                    console.log(`routes from the DB ${JSON.stringify(gameHSJSONString)}`);
                }
                async function deletePost() {
                    const gameHSJSONString = await api.deleteUserPost( window.currentUserLoggedIn, "is playing Meteor Killers!");
                    console.log(`routes from the DB ${JSON.stringify(gameHSJSONString)}`);
                }
                deletePost();
                newHSPost();
                makeNewScore();
            }
            else {
                const api = new API();
                async function newHSPost() {
                    const gameHSJSONString = await api.postNewGameStatus( window.currentUserLoggedIn, `scored ${currScore} points in Meteor Killers but didn't beat their high score :(`, dateTime);
                    console.log(`routes from the DB ${JSON.stringify(gameHSJSONString)}`);
                }
                async function deletePost() {
                    const gameHSJSONString = await api.deleteUserPost( window.currentUserLoggedIn, "is playing Meteor Killers!");
                    console.log(`routes from the DB ${JSON.stringify(gameHSJSONString)}`);
                }
                deletePost();
                newHSPost();
            }
            //gameOver(this.score);
            alert("GameOver");
        }
        if (this.health <= 0) {
            this.highScore();
            const api = new API();

            async function getUserHS() {
                const gameHSJSONString = await api.getSpaceHS(window.currentUserLoggedIn);
                hs = gameHSJSONString.data[0]['HS_SpaceGame'];
                //return gameHSJSONString.data[0]['HS_SpaceGame'];

            }
            getUserHS();
            this.dead = true;
            let currScore= this.score;
            let today = new Date();
            let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            let dateTime = date+' '+time;
            if (this.score > hs){
                const api = new API();

                async function makeNewScore() {
                    const gameHSJSONString = await api.postNewHighScoreSpace(currScore, window.currentUserLoggedIn);
                    console.log(`routes from the DB ${JSON.stringify(gameHSJSONString)}`);
                    //setCurrHighScore(gameHSJSONString.data);

                }

                async function newHSPost() {
                    const gameHSJSONString = await api.postNewGameStatus( window.currentUserLoggedIn, `scored ${currScore} points in Meteor Killers and beat their high score  (¬‿¬)`, dateTime);
                    console.log(`routes from the DB ${JSON.stringify(gameHSJSONString)}`);
                }
                async function deletePost() {
                    const gameHSJSONString = await api.deleteUserPost( window.currentUserLoggedIn, "is playing Meteor Killers!");
                    console.log(`routes from the DB ${JSON.stringify(gameHSJSONString)}`);
                }
                deletePost();
                newHSPost();
                makeNewScore();
            }
            else {
                const api = new API();
                async function newHSPost() {
                    const gameHSJSONString = await api.postNewGameStatus( window.currentUserLoggedIn, `scored ${currScore} points in Meteor Killers but didn't beat their high score  (⊙︿⊙)`, dateTime);
                    console.log(`routes from the DB ${JSON.stringify(gameHSJSONString)}`);
                }
                async function deletePost() {
                    const gameHSJSONString = await api.deleteUserPost( window.currentUserLoggedIn, "is playing Meteor Killers!");
                    console.log(`routes from the DB ${JSON.stringify(gameHSJSONString)}`);
                }
                deletePost();
                if (currScore !== 0)
                    newHSPost();
            }
            alert("GameOver");
            //gameOver(this.score);
            this.dead = true;
            this.health = 100;
            this.ammo = 100;
            this.score = 0;

            //gameOver(this.score);
        }
    }

    draw = (ctx) => {
        if (this.dead){
            return;
        }
        const image = new Image();
        image.src = img;
        ctx.drawImage(image,this.posX,this.posY,65,90);

        ctx.font = '16px Obitron';
        ctx.fillStyle = "white";
        ctx.fillText(`Health: ${this.health}`, 950 - 95, 550 - 15);

        ctx.font = '16px Obitron';
        ctx.fillStyle = "lightgreen";
        ctx.fillText(`Score: ${this.score}`, 15, 25);
    }
}


function gameOver(score) {
    document.body.innerHTML = `
    <center>
        <div style={{
            backgroundImage: \`url(${bg})\`, display:'flex',justifyContent:'center',alignItems:'center',height:'100vh',flexDirection:'column'
        }}>
            <Typography sx={{fontFamily: "Orbitron", fontWeight: 'bold', fontSize: '40px', color: 'lightgreen'}}>Meteror Killers</Typography>
    <br/>
    <h2>Game Over!</h2>
    <p>Your Score: ${score}</p>
    <button class="btn btn-danger mt-2" onClick="location.reload()">Again</button>
    </div>
    </center>
    `
}

export default Player;

//NEED TO FIX HIGHSCORES