var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

//Variable de la raquette
var widthPaddle = 20;
var heightPaddle = 180;
var paddleY = (canvas.height - heightPaddle) / 2;
var paddleY2 = (canvas.height - heightPaddle) / 2;

//Variable des commandes de la  raquette 
var upPressed = false;
var downPressed = false;
var spacePressed = false;


//Variable de la balle
var ballX = canvas.width / 2;
var ballY = canvas.height / 2;
var ballRadius = 15;
var vit = 0;
var colorBall = "rgba(255, 255, 255, 0.5)";

//Vitesse de la balle 
var dx = 3;
var dy = 1.5;

//variable du score du joueur1 et du joueur 2; 
var scorePlayerOne = 0;
var scorePlayerTwo = 0;
var scorePoint = 1;

var playerTwoIsScored = false;
var playerOneIsScored = false;


var playerOne = document.querySelector('.playerOne');

var playerTwo = document.querySelector('.playerTwo');

var interval;

//creation du message quand le joueur appuie sur espace au bon moment
var perfectOne = document.querySelector('.perfectPlayerOne');
var perfectOneX = canvas.width / 4;
var perfectOneY = paddleY;
perfectOne.style.left = perfectOneX + "px";
perfectOne.style.top = perfectOneY + "px";

var perfectTwo = document.querySelector('.perfectPlayerTwo');


document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("keydown",keySpace, false);
playerOne.addEventListener("click", function() {
    document.location.reload();
    })
    playerTwo.addEventListener("click", function () {
        document.location.reload();
    })


function keySpace(e) {
    if (e.keyCode == 32 && !spacePressed)
    { 
        perfectOne.style.top = perfectOneY + "px";              
        spacePressed = true;
        keySpaceTimeout = setTimeout(function() {
            spacePressed = false;
        },200)
    }
}

function keyDownHandler(e) {
    if (e.keyCode == 38)
    {
        upPressed = true;
    }
    else if (e.keyCode == 40)
    {
        downPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.keyCode == 38)
    {
        upPressed = false;
    }
    else if (e.keyCode == 40)
    {
        downPressed = false;
    }
}

function mouvmentsPaddle()
{
    if (upPressed && paddleY > 0)
    {
        paddleY -= 6 + vit;
    }
    else if (downPressed && paddleY < canvas.height - heightPaddle) {
        paddleY += 6 + vit;
    }
}

//gestion de collision de la balle et du score

function collisionBall()
{
    //gestion des scores du joueur 1 et du joueur 2 
    scored(playerTwoIsScored, scorePlayerTwo);
    scored (playerOneIsScored, scorePlayerOne);

    //on gere le cote gauche  de l'axe X de la zone du jeu 
    if(ballX + dx < ballRadius + widthPaddle) // si la balle est inferieure  au rayon de la balle  + la hauteur de la raquette on rentre dans la condition
    {
        if (ballY > paddleY2 - 40 && ballY < paddleY2 + heightPaddle + 40) // si la balle touche la raquette du joueur 2 on fait rebondir la balle dans le sens inverse
        {
            if (spacePressed && vit < 1.6)
            {
                vit += 0.2;
                if (dx >= 0 && dy >= 0)
                {
                    dx += vit;
                    dy += vit;
                }
                else if (dx < 0 && dy >= 0)
                {
                    dx -= vit;
                    dy += vit;
                }
                else if (dx >= 0 && dy < 0)
                {
                    dx += vit;
                    dy -= vit;
                }
                else
                {
                    dx -= vit;
                    dy -= vit;
                }
            }

            dx = -dx;
        }
        else // si la balle ne touche pas la raquette on remet les position a 0 et on incremente le score du joueur 1 
        {
            resetPosition();
            playerOneIsScored = true;
        }
                    
    }
    //on gere le cote droit de l' axe X de la zone du jeu 
        else if (ballX + dx > canvas.width - ballRadius - widthPaddle) // si la balle est superieur a la largeur du canvas - le rayon de la balle et l'epaisseur de la raquette on rentre dans la condition
        {
            if (ballY > paddleY - 40 && ballY < paddleY + heightPaddle + 40) // si la balle touche la raquette du joueur 1 on fait rebondir la ball dans le sens inverse
            {
                if (spacePressed && vit < 1.6)
                {
                    vit += 0.2;
                    perfectOne.style.display= 'flex';
                    setTimeout(() => {
                        perfectOne.style.display = 'none'
                    }, 1000);
                    if (dx >= 0 && dy >= 0)
                    {
                        dx += vit;
                        dy += vit;
                    }
                    else if (dx < 0 && dy >= 0)
                    {
                        dx -= vit;
                        dy += vit;
                    }
                    else if (dx >= 0 && dy < 0)
                    {
                        dx += vit;
                        dy -= vit;
                    }
                    else
                    {
                        dx -= vit;
                        dy -= vit;
                    }
                }
                dx = -dx;
            } else  // si la balle ne touche pas la raquette on remet les position a 0 et on increment le score du joueur 2 
            {
                resetPosition();
                playerTwoIsScored = true;                  
            }                                       
        }
        // on gere les colisions inferieure et superieure de la zone du jeu 
        if (ballY + dy > canvas.height - ballRadius || ballY + dy < ballRadius) // on fait rebondir la balle dans le sens inverse de l'axe y quand elle sort des limites en ajoutant le rayon de la balle
        {
            dy = -dy;
        }
}


//fonction changant la couleur de la balle et augmentant le score si la vitesse est de plus en plus rapide !

function ballColor()
{
    if (vit >= 0.6)
    {
        colorBall = "rgba(255, 128, 0, 0.5)";
        scorePoint = 2;
    }
    else if (vit >= 1.2)
    {
        colorBall = "rgba(0, 128, 255, 0.5)";
        scorePoint = 3;
    }
}
        


       

//fonction permettant de remmetre a zero la position des joueurs et de la balle;

function resetPosition()
{
    setTimeout(function() {

        //reinitialisation de la position de la raquette
        paddleY = (canvas.height - heightPaddle) / 2;

         //reinitialisation de la balle 
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;

        //on reinitialise la vitesse de base de la balle;
        //on reinitialise la couleur de la balle ainsi que le point attribue;

        Math.floor(Math.random() * 2) ? dy = 1.5: dy = -1.5;
        vit = 0;
        colorBall = "rgba(255, 255, 255, 0.5)";
        scorePoint = 1;

    }, 500);
}

function scored(isScored, score) {
if (isScored) {
    setTimeout(function () {
        score += scorePoint;
        isScored = false;
        if (playerTwoIsScored) {
            scorePlayerTwo = score;
            playerTwoIsScored = false;
            dx = 3;
        } else if (playerOneIsScored) {
            scorePlayerOne = score;
            playerOneIsScored = false;
            dx = -3;
            }
        }, 250);
    }
}
    //Fonction affichant le resultat a la fin de partie 
function results()
{
    if (scorePlayerOne > 10)
    {
        playerOne.style.display = 'flex';
        clearInterval(interval);
        return;
    }           
    else if (scorePlayerTwo > 10)
    {
        playerTwo.style.display = 'flex';
        clearInterval(interval);
        return;
    }
                
}

 /*Fonction permettant de dessiner les raquettes avec leurs position, leurs longueur et leur couleur(texture)*/

function drawPaddle(posX, posY, width, height, radius, color)
{
    ctx.beginPath();
    ctx.roundRect(posX, posY, width, height, radius);
    ctx.fillStyle = color;


    ctx.fill();
    ctx.closePath();
}

// Fonction dessinant la balle 


function drawBall()
{
    ctx.beginPath();
    ctx.lineWidth='2';
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = colorBall;
    ctx.fill();
    ctx.stroke
    ctx.closePath();
}

//Fonction dessinant le cercle au centre du jeu

function drawCircle()
{
    ctx.beginPath() 
    ctx.arc(canvas.width / 2, canvas.height / 2, 100, 0, Math.PI*2, true);
    ctx.fillStyle = "rgb(224, 224, 224)";
    ctx.fill();
    ctx.closePath();
}

//fonction dessinant la barre coupant en deux le jeu

function drawLign()
{
    ctx.beginPath();
    ctx.rect(canvas.width / 2 - 5, 0, 10, canvas.height);
    ctx.fillStyle = "rgb(224, 224, 224)";
    ctx.fill();
    ctx.closePath();
}

//fonction dessinant le score

function drawScore(score, posX, posY)
{
    ctx.font = "120px Colibri";
    ctx.fillStyle = "whitesmoke";
    ctx.fillText(score, posX, posY);
}

function draw()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawLign();
    drawCircle();
    drawScore(scorePlayerOne, canvas.width / 2 + 70, 100);
    drawScore(scorePlayerTwo, canvas.width / 2 - 130, 100);

    drawPaddle(canvas.width - widthPaddle, paddleY, widthPaddle, heightPaddle, 20, "red");

    paddleY2 = paddleY;
    drawPaddle(-20 + widthPaddle, paddleY2, widthPaddle, heightPaddle, 20, "blue");
    drawBall();
            

    collisionBall();
    ballColor();
    mouvmentsPaddle();
    results();

    ballX += dx;
    ballY += dy;
}        
interval = setInterval(draw, 1000 / 120);