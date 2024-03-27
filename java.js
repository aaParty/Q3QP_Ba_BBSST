var Health, enemyHealth, coin, coinSelect, round, randomAction;
var id, object1, object2, object3, object4, move, scale;
var message = "", messageLog = "";
var mcHearts, enemyHearts;

id = null;
Health = 100;
enemyHealth = 100;

function delay (ms)
{
    return new Promise (resolve => setTimeout (resolve, ms));
}

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
        document.getElementById ("defend").disabled = true
    }
}

function calculateDamage ()
{
    return Math.floor(Math.random() * 5) % 5 + 1;
}

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
        message = message + "You've dealt " + z1 + " damage. ";
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
                enemyHealth = enemyHealth - z;
            }
            else
            {
                message = message + "The opponent completely blocked the attack. <br>";
            }
        }
        else
        {
            z1 = z.toString();
            z2 = y.toString();
            message = message + "You've dealt " + z1 + " damage, while the opponent dealt " + z2 + " damage. <br>";
            enemyHealth = enemyHealth - z;
            Health = Health - y;
        }
    }
    
    document.getElementById ("defend").disabled = false
    barMove ();

    messageLog = document.getElementById ("output")
    messageLog.innerHTML = (message);
    messageLog.scrollTop = messageLog.scrollHeight;
}

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
            z1 = y.toString()
            message = message + "The opponent dealt " + z1 + " damage. <br>";
            Health = Health - y;
        }
        else
        {
            message = message + "You completely blocked the attack. <br>";
        }
    }
    else
    {
        message = message + "You both defended. <br>";
    }

    barMove ();

    messageLog = document.getElementById ("output")
    messageLog.innerHTML = (message);
    messageLog.scrollTop = messageLog.scrollHeight;
}

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
    if (move == 300)
    {
        clearInterval(id);
    }
    else
    {
        move += 25;
        object4.style.top = -move + 'px';
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
    move = 0;
    clearInterval (id);
    id = setInterval (frame4, 25);
}

function barMove ()
{
    mcHearts = document.getElementById ("goodHearts")
    mcHearts.style.width = (Health * 5) + 'px';
    enemyHearts = document.getElementById ("badHearts")
    enemyHearts.style.width = (enemyHealth * 5) + 'px';
}