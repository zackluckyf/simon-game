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
    var i = 0;
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
        (sounds[0]).play(); 
        return moves[0];
    }
    
    function redPushed(){
        red.fadeOut(200).fadeIn(200);
        (sounds[1]).play();
        return moves[1];
    }
    
    function bluePushed(){
        blue.fadeOut(200).fadeIn(200);
        (sounds[2]).play(); 
        return moves[2];
    }
    
    function yellowPushed(){
        yellow.fadeOut(200).fadeIn(200);
        (sounds[3]).play();
        return moves[3];
    }
    
    function gameMoves(simon, i){
        if(i < simon.length)
                    {
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
                           }, 1000); 
                    }
        j = 0;
    }
    
    
    function newMove(player, j){
        console.log("a new move was made by simon");
        num = Math.floor(4*Math.random());
        simon.push(moves[num]);
        simonSounds.push(sounds[num]);
        i = 0;
        gameMoves(simon, i);
        buttons(simon, j, player);
    }
    
    function repeatMoves(player){
        i = 0;
        setTimeout(function()
        {
           //failureSound.play();    
        }, 1000);
        setTimeout(function()
        {
           //waits for failute sound to finish    
        }, 4000);
        gameMoves(simon, i);
        buttons(simon, j, player); 
    }
    
    function playerInput(simon, player, j){
        while (j < simon.length)  
            {
                console.log(j);
                console.log(player);
                console.log(simon);
                if(simon[j] === player[j] && j != simon.length-1)
                {
                    console.log("player pressed the correct button");
                    j++;
                    buttons(simon, j, player);
                }
                else if(simon[j] === player[j] && simon.length < 20)
                    {
                        console.log("player pressed the correct button and it was the last in the chain");
                        j = 0;
                        player.length = 0;
                        newMove(player, j);
                    }
                else
                {
                    if(strict === true)
                    {
                        reset();
                        return; 
                    }
                    else
                    {
                        console.log("player pressed the wrong button");
                        player.length = 0;
                        repeatMoves(player);
                        return;
                    }
                }
            }
        if(simon.length > 20)
        {
            alert("You win!!!");
            successSound.play();
            reset();
        }   
    }
    
    function buttons(simon, j, player){
        console.log("function buttons was entered");
        green.css('cursor', 'pointer');
        red.css('cursor', 'pointer');
        blue.css('cursor', 'pointer');
        yellow.css('cursor', 'pointer');
        $(".simon-button").off();
        $(".simon-button").click(function(){
            alert("player pressed a button");
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
                count++;
                if(count < 10)
                    {
                        count = "0" + count;
                    }
                $("p").text(count);
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