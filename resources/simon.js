$(document).ready(function(){
    // on/off button
    var power = false;
    var start = false;
    var strict = false;
    var simon = [];
    var player = [];
    var num;
    var green = $(".green-button");
    var red = $(".red-button");
    var blue = $(".blue-button");
    var yellow = $(".yellow-button");
    var moves = ["green", "red", "blue", "yellow"];
    var greenSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
    var redSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
    var blueSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
    var yellowSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
    var successSound = new Audio('http://k003.kiwi6.com/hotlink/b1e5pr49d7/Tada-Sound-Effect.mp3');
    var failureSound = new Audio('http://k003.kiwi6.com/hotlink/eowpjimfl9/Wrong-Buzzer-Sound-Effect.mp3');
    var sounds = [greenSound, redSound, blueSound, yellowSound];
    var simonSounds = [];
    var count = 0;
    // is number of moves
    var i = 0;
    // j just loops the moves from 1 to i
    var j = 0;
    
    // reset board function
    
    function reset(){
        count = "00"; 
        simon.length = 0;
        simonSounds.length = 0;
        player.length = 0;
        $("p").text(count);
        i = 0;
        j = 0;
    }
    
    function greenMove(){
        green.fadeOut(200).fadeIn(200);
        (sounds[0]).play(); 
    }
    
    function redMove(){
        red.fadeOut(200).fadeIn(200);
        (sounds[1]).play();
    }
    
    function blueMove(){
        blue.fadeOut(200).fadeIn(200);
        (sounds[2]).play(); 
    }
    
    function yellowMove(){
        yellow.fadeOut(200).fadeIn(200);
        (sounds[3]).play();
    }
    
    function greenPushed(){
        green.fadeOut(200).fadeIn(200);
        if(sounds[0].paused !== true)
            {
                sounds[0].currentTime = 0;
            }
        (sounds[0]).play(); 
        return moves[0];
    }
    
    function redPushed(){
        red.fadeOut(200).fadeIn(200);
        if(sounds[1].paused !== true)
            {
                sounds[1].currentTime = 0;
            }
        (sounds[1]).play();
        return moves[1];
    }
    
    function bluePushed(){
        blue.fadeOut(200).fadeIn(200);
        if(sounds[2].paused !== true)
            {
                sounds[2].currentTime = 0;
            }
        (sounds[2]).play(); 
        return moves[2];
    }
    
    function yellowPushed(){
        yellow.fadeOut(200).fadeIn(200);
        if(sounds[3].paused !== true)
            {
                sounds[3].currentTime = 0;
            }
        (sounds[3]).play();
        return moves[3];
    }
    
    function gameMoves(simon, i){
        if(i < simon.length)
                    {
                        green.css('pointer-events', 'none');
                        red.css('pointer-events', 'none');
                        blue.css('pointer-events', 'none');
                        yellow.css('pointer-events', 'none');
                        setTimeout(function(){
                            if(simon[i] === "green")
                                {
                                    greenMove();
                                }
                            else if(simon[i] === "red")
                                {
                                    redMove();
                                }
                            else if(simon[i] === "blue")
                                {
                                    blueMove();
                                }
                            else if(simon[i] === "yellow")
                                {
                                    yellowMove();
                                }
                            i++;
                            gameMoves(simon, i);
                           }, 700); 
                    }
        else
            {
                j = 0;
                green.css('pointer-events', 'auto');
                red.css('pointer-events', 'auto');
                blue.css('pointer-events', 'auto');
                yellow.css('pointer-events', 'auto');   
            }
    }
    
    
    function newMove(player, j){
        num = Math.floor(4*Math.random());
        simon.push(moves[num]);
        simonSounds.push(sounds[num]);
        i = 0;
        gameMoves(simon, i);
        count++;
                if(count < 10)
                    {
                        count = "0" + count;
                    }
        $("p").text(count);
        buttons(simon, j, player);
    }
    
    function repeatMoves(player){
        i = 0;
        setTimeout(function()
        {
            failureSound.play();    
        }, 10);
        setTimeout(function()
        {
            //waits for failure sound to finish
            gameMoves(simon, i);
            buttons(simon, j, player); 
        }, 2750);
    }
    
    function playerInput(simon, player, j){
        if (j < simon.length)  
            {
                if(simon[j] === player[j] && j != simon.length-1)
                {
                    j++;
                    buttons(simon, j, player);
                }
                else if(simon[j] === player[j] && simon.length < 20)
                    {
                        j = 0;
                        player.length = 0;
                        newMove(player, j);
                    }
                else if(simon[j] === player[j] && simon.length === 20)
                    {
                        successSound.play();
                        setTimeout(function()
                        {
                            reset();
                            newMove(player, j);
                        }, 1000);
                    }
                else
                {
                    if(strict === true)
                    {
                        green.css('pointer-events', 'none');
                        red.css('pointer-events', 'none');
                        blue.css('pointer-events', 'none');
                        yellow.css('pointer-events', 'none');
                        reset();
                        setTimeout(function()
                        {
                            failureSound.play();
                            count = "00"; 
                            $("p").text(count);
                        }, 250);
                        setTimeout(function()
                        {
                            //waits for failure sound to finish
                            j = 0;
                            newMove(player, j); 
                        }, 2750);
 
                    }
                    else
                    {
                        green.css('pointer-events', 'none');
                        red.css('pointer-events', 'none');
                        blue.css('pointer-events', 'none');
                        yellow.css('pointer-events', 'none');
                        player.length = 0;
                        repeatMoves(player);
                        return;
                    }
                }
            } 
    }
    
    function buttons(simon, j, player){
        green.css('pointer-events', 'auto');
        red.css('pointer-events', 'auto');
        blue.css('pointer-events', 'auto');
        yellow.css('pointer-events', 'auto');
        green.css('cursor', 'pointer');
        red.css('cursor', 'pointer');
        blue.css('cursor', 'pointer');
        yellow.css('cursor', 'pointer');
        $(".simon-button").off();
        $(".simon-button").click(function(){
            if($(this).hasClass("green-button"))
                {
                    player.push(greenPushed());
                    playerInput(simon, player, j);
                }
            else if($(this).hasClass("red-button"))
                {
                    player.push(redPushed());
                    playerInput(simon, player, j);
                }
            else if($(this).hasClass("blue-button"))
                {
                    player.push(bluePushed());
                    playerInput(simon, player, j);
                }
            else if($(this).hasClass("yellow-button"))
                {
                    player.push(yellowPushed());
                    playerInput(simon, player, j);
                }
        });
    }
    
    
    // turns simon board on
    
    $('#on-button').click(function(){
        $(this).toggleClass('on');
        if(power === true)
        {
            power = false;
            reset();
            if(start === true)
                {
                    start = false;
                    $('#start-button').toggleClass('on');
                }
            if(strict === true)
                {
                    strict = false;
                    $('#strict-button').toggleClass('on');
                }
        }
        else
        {
            power = true;
        }
    });
    
    $('#start-button').click(function(){
        
        if(power === true)
        {
            if(start === false)
            {
                $(this).toggleClass('on');
                reset();
                newMove(player, j);
                start = true;
            }
            else
            {
                $(this).toggleClass('on');
                reset();
                start = false;
            }
        }
    });
    
    $('#strict-button').click(function(){
        if(power === true)
        {
                $(this).toggleClass('on');
                if(strict === true)
                {
                    strict = false;
                }
                else
                {
                    strict = true;
                }
        }
    }); 
    
    
});