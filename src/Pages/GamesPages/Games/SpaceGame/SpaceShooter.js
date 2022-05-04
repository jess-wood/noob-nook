import React, { useEffect } from 'react';
import { Player } from './Player';
import bg from './utils/space.jpg';
import { Meteor } from './Meteor'
import { Bullet } from './Bullet';
import Typography from "@mui/material/Typography";
import './utils/spaceShooter.css';
import API from "../../../../API_Interface/API_Interface";

function SpaceShooter() {
    let canvas;
    let ctx;
    let maxMeteorCount = 10;
    let lastMeteorSpawnAt = Date.now();
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date+' '+time;

    const player = new Player(950 / 2,550 / 1.5)
    const randomNumber = (min,max) => Math.random() * max + min;

    useEffect(() => {
        const api = new API();

        async function makeNewPost() {
            const gameHSJSONString = await api.postNewGameStatus(window.currentUserLoggedIn, "is playing Meteor Killers!", dateTime);
            console.log(`routes from the DB ${JSON.stringify(gameHSJSONString)}`);
        }
        makeNewPost();
    }, [])

    useEffect(() => {
        if (player.dead) {
            clearInterval(interval)
            return;
        }

            // eslint-disable-next-line react-hooks/exhaustive-deps
            canvas = document.getElementById("myCanvas");

            let meteors = []
            let bullets = []
            const fireBulletcb = (xpos, ypos) => bullets.push(new Bullet(xpos, ypos));

            let interval = setInterval(() => {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                ctx = canvas.getContext("2d");
                ctx.clearRect(0, 0, 950, 550);

                player.update(fireBulletcb);
                player.draw(ctx);

                const random = randomNumber(0, 700);
                if (meteors.length < maxMeteorCount && (Date.now() - lastMeteorSpawnAt) > 1500) {
                    meteors.push(new Meteor(random, -200));
                    lastMeteorSpawnAt = Date.now();
                }

                meteors = meteors.filter((enemy) => !enemy.dead);
                meteors.forEach(meteor => {
                    meteor.update(player, bullets);
                    meteor.draw(ctx);
                });

                bullets = bullets.filter((bullet) => !bullet.dead);
                bullets.forEach(bullet => {
                    bullet.update();
                    bullet.draw(ctx);
                });


            }, 1000 / 30);

    }, [player.dead]);




    return (
        <div style={{
            backgroundImage: `url(${bg})`, display:'flex',justifyContent:'center',alignItems:'center',height:'100vh',flexDirection:'column'
        }}>
            <Typography sx={{fontFamily: "Orbitron", fontWeight: 'bold', fontSize: '40px', color: 'lightgreen'}}>Meteror Killers</Typography>
            <canvas id="myCanvas" width="950" height="550" style={{backgroundImage: `url(${bg})`,backgroundSize:"cover" ,border:'2px solid #000000',marginTop:'28px'}}/>
        </div>

    );
}

export default SpaceShooter;

//need to fix game over screen