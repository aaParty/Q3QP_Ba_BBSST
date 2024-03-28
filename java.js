// * variables * //
var Health, enemyHealth, coin, coinSelect, round, randomAction, endMessage;
var id, object1, object2, object3, object4, object5, object6, object7, move, scale, blur1, blur2, blur3, blur4;
var message = "", messageLog = "";
var mcHearts, enemyHearts;

id = null;
Health = 100;
enemyHealth = 100;

function delay (ms)
{
    return new Promise (resolve => setTimeout (resolve, ms));
}

//* the heads or tails buttons *//
function heads ()
{
    coinSelect = 0;
    tossCoin ();
}

function tails ()
{
    coinSelect = 1;
    tossCoin ();
}

//* function that will toss the coin *//
function tossCoin ()
{
    coin = Math.round(Math.random() * 2) % 2;
    switch (coin)
    {
        case 0:
            if (coinSelect == coin)
            {
                document.getElementById ("coin").innerHTML = ("You go first");
                round = 1;
            }
            else
            {
                document.getElementById ("coin").innerHTML = ("Enemy goes first");
                round = 0;
            }

            image.src = 'images/heads.png';
            break;
            
        case 1:
            if (coinSelect == coin)
            {
                document.getElementById ("coin").innerHTML = ("You go first");
                round = 1;
            }
            else
            {
                document.getElementById ("coin").innerHTML = ("Enemy goes first");
                round = 0;
            }

            image.src='images/tails.png';
            break;
    }

    if (round == 1)
    {
        document.getElementById ("defend").disabled = true;
        blur2 = document.getElementById ("defend");
        blur2.style.backgroundColor = 'grey';
    }
    else if (round == 0)
    {
        let z = calculateDamage ();
        let z1 = z.toString();

        message = message + "The opponent dealt " + z1 + " damage. <br>";
        mchurt.src='images/mc_hurt.png';
        enemyhurt.src='images/enemy_idle.png';
        enemyhurt.style.width='200px';
        mchurt.style.width='140px';
        Health = Health - z;
        barMove ();

        messageLog = document.getElementById ("output")
        messageLog.innerHTML = (message);
        messageLog.scrollTop = messageLog.scrollHeight;
    }
}

//* function that will calculate the values for attacks and defends *//
function calculateDamage ()
{
    return Math.floor(Math.random() * 5) % 5 + 1;
}

//* function that randomly chooses the opponents action *//
function opponentAction ()
{
    let x = Math.round(Math.random() * 2) % 2;
    let y;
    switch (x)
    {
        case 1:
            y = calculateDamage ();
            break;
        
        case 0:
            y = -(calculateDamage ());
            break;
    }
    return y;
}

//* function to calculate the player's damage *//
function playerAttack ()
{
    message = message + "You will attack. " + "<br>";
    let x = calculateDamage ();
    let y = opponentAction ();
    let z, z1, z2;
    z = 0;
    if (round == 1)
    {
        z1 = x.toString()
        message = message + "You've dealt " + z1 + " damage. " + "<br>";
        mchurt.src='images/mc_idle.png';
        enemyhurt.src='images/enemy_hurt.png';
        enemyhurt.style.width='155px';
        enemyHealth = enemyHealth - x;
        round = 0;
    }
    else
    {
        z = x;
        if (y < 0)
        {
            z = y + x;
            if (z > 0)
            {
                z1 = z.toString();
                message = message + "You've dealt " + z1 + " damage. <br>";
                mchurt.src='images/mc_idle.png';
                enemyhurt.src='images/enemy_hurt.png';
                enemyhurt.style.width='155px';
                mchurt.style.width='160px';
                enemyHealth = enemyHealth - z;
            }
            else
            {
                message = message + "The opponent completely blocked the attack. <br>";
                mchurt.src='images/mc_hurt.png';
                enemyhurt.src='images/enemy_idle.png';
                enemyhurt.style.width='200px';
                mchurt.style.width='140px';
            }
        }
        else
        {
            z1 = z.toString();
            z2 = y.toString();
            message = message + "You've dealt " + z1 + " damage, while the opponent dealt " + z2 + " damage. <br>";
            mchurt.src='images/mc_hurt.png';
            enemyhurt.src='images/enemy_hurt.png';
            enemyhurt.style.width='155px';
            mchurt.style.width='140px';
            enemyHealth = enemyHealth - z;
            Health = Health - y;
        }
        
    }
    
    document.getElementById ("defend").disabled = false;
    blur2 = document.getElementById ("defend");
    blur2.style.backgroundColor = 'rgb(255, 227, 249)';
    barMove ();

    messageLog = document.getElementById ("output");
    messageLog.innerHTML = (message);
    messageLog.scrollTop = messageLog.scrollHeight;

    if (enemyHealth <= 0 || Health <= 0)
    {
        endGame ();
    }
}

//* function that determines how much the player will reduce the opponent's damage by *//
function playerDefend ()
{
    message = message + "You will defend. " + "<br>";
    let x = -(calculateDamage ());
    let y = opponentAction ();
    let z, z1;
    z = 0;
    if (y > 0)
    {
        z = y + x;
        if (z > 0)
        {
            z1 = z.toString()
            message = message + "The opponent dealt " + z1 + " damage. <br>";
            mchurt.src='images/mc_hurt.png';
            enemyhurt.src='images/enemy_idle.png';
            enemyhurt.style.width='200px';
            mchurt.style.width='140px';
            Health = Health - z;
        }
        else
        {
            message = message + "You completely blocked the attack. <br>";
            mchurt.src='images/mc_idle.png';
            enemyhurt.src='images/enemy_hurt.png';
            enemyhurt.style.width='155px';
            mchurt.style.width='160px';
        }
    }
    else
    {
        message = message + "You both defended. <br>";
        mchurt.src='images/mc_idle.png';
        enemyhurt.src='images/enemy_idle.png';
        enemyhurt.style.width='200px';
        mchurt.style.width='160px';
    }

    barMove ();

    messageLog = document.getElementById ("output");
    messageLog.innerHTML = (message);
    messageLog.scrollTop = messageLog.scrollHeight;
    
    if (enemyHealth <= 0 || Health <= 0)
    {
        endGame ();
    }
}

//* these are for animations *// 
function frame1 ()
{
    if (move == 750)
    {
        clearInterval(id);
    }
    else
    {
        move += 25;
        object1.style.left = -move + 'px';
        object2.style.right = -move + 'px';
    }
}

function frame2 ()
{
    if (scale >= 1)
    {
        clearInterval(id);
    }
    else
    {
        scale += .1;
        object3.style.transform = 'scale(' + scale + ')';
    }
}

function frame3 ()
{
    if (scale <= 0)
    {
        object3.style.opacity = 0;
        clearInterval(id);
    }
    else
    {
        scale -= .1;
        object3.style.transform = 'scale(' + scale + ')';
    }
}

function frame4 ()
{
    if (move >= 2)
    {
        clearInterval(id);
    }
    else
    {
        move += 2;
        object4.style.bottom = move + 1 + '%';
        object5.style.top = move + '%';
    }
}

function frame5 ()
{
    if (move >= 16)
    {
        clearInterval(id);
    }
    else
    {
        move += 2;
        object6.style.left = move + '%';
        object7.style.right = move + '%';
    }
}

function frame6 ()
{
    if (scale >= 2)
    {
        clearInterval(id);
    }
    else
    {
        scale += .1;
        object8.style.transform = 'scale(' + scale + ')';
    }
}

async function animation1 ()
{
    object1 = document.getElementById ("right");
    object2 = document.getElementById ("left");
    move = 0;
    clearInterval (id);
    id = setInterval (frame1, 10);
    await delay (750);
    id = null;
    animation2 ();
}

async function animation2 ()
{
    object3 = document.getElementById ("finalCoin");
    scale = 0;
    clearInterval (id);
    id = setInterval (frame2, 30);
    await delay (2250);
    id = null;
    animation3 ();
}

async function animation3 ()
{
    scale = 1;
    clearInterval (id);
    id = setInterval (frame3, 30);
    await delay (500);
    id = null;
    animation4 ();
}

async function animation4 ()
{
    object4 = document.getElementById ("gui1");
    object5 = document.getElementById ("gui2");
    move = -34;
    clearInterval (id);
    id = setInterval (frame4, 29);
    await delay (250);
    id = null;
    animation5 ();
}

async function animation5 ()
{
    object6 = document.getElementById ("mc");
    object7 = document.getElementById ("enemy");
    move = -20;
    clearInterval (id);
    id = setInterval (frame5, 40);
    id = null;
}

async function animation6 ()
{
    object8 = document.getElementById ("ending");
    scale = 0;
    clearInterval (id);
    id = setInterval (frame6, 20);
    id = null;
}
//* animations end here *//

//* this is for the hpbar to move depending on hp value *//
function barMove ()
{
    if (enemyHealth < 0)
    {
        enemyHealth = 0;
    }

    if (Health < 0)
    {
        Health = 0;
    }

    mcHearts = document.getElementById ("goodHearts")
    mcHearts.style.width = (Health * 5) + 'px';
    enemyHearts = document.getElementById ("badHearts")
    enemyHearts.style.width = (enemyHealth * 5) + 'px';
}

//* this is the reset button (self explanatory) *//
function resetBtn ()
{
    location.reload();
}

//* this occurs when the game ends and disables all of the buttons before sending you back to the title page *//
async function endGame ()
{
    document.getElementById ("attack").disabled = true;
    document.getElementById ("defend").disabled = true;
    document.getElementById ("reset").disabled = true;
    blur1 = document.getElementById ("attack");
    blur2 = document.getElementById ("defend");
    blur3 = document.getElementById ("reset");
    blur4 = document.getElementById ("output");
    blur1.style.backgroundColor = 'grey';
    blur2.style.backgroundColor = 'grey';
    blur3.style.backgroundColor = 'grey';
    blur4.style.backgroundColor = 'grey';

    if (enemyHealth == 0)
    {
        endMessage = "Win";
    }
    else if (Health == 0)
    {
        endMessage = "Lose";
    }

    await delay (1000);
    document.getElementById ("ending").innerHTML = (endMessage);
    animation6 ();
    await delay (2500);
    window.location.assign("index.html");
}
