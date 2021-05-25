
const http = require("http");
const websocketServer = require("websocket").server;
const httpServer = http.createServer();
const port = process.env.PORT || 5000;
httpServer.listen(port, ()=> console.log("Server Listening on Port " + port))
const clients = {};
var count = 0;
var index = 0; 
var word = "word";
var hint = "hint";
const words = [
    {
        "word" : "newton",
        "hint" : "Physics person"
    }, 
    {
        "word" : "china",
        "hint" : "yellow river"
    }, 
    {
        "word" : "christmas",
        "hint" : " 'X'oliday "
    }, 
    {
        "word" : "water",
        "hint" : "blue-plain-need"
    }, 
    {
        "word" : "elbow",
        "hint" : "Anatomy"
    }, 
    {
        "word" : "Football",
        "hint" : "Messi"
    }, 
    {
        "word" : "mobile",
        "hint" : "remote"
    }, 
    {
        "word" : "chair",
        "hint" : "sit"
    }, 
    {
        "word" : "medicine",
        "hint" : "heal"
    }, 
    {
        "word" : "lemon",
        "hint" : "sour"
    }, 
    {
        "word" : "door",
        "hint" : "close"
    },
    {
        "word" : "hello",
        "hint" : "conversation"
    }, 
    {
        "word" : "blue",
        "hint" : "color"
    }, 
    {
        "word" : "dark",
        "hint" : "I can't see"
    }, 
    {
        "word" : "potato",
        "hint" : "frenchfries"
    }, 
    {
        "word" : "cupcake",
        "hint" : "food"
    }, 
    {
        "word" : "laptop",
        "hint" : "Mine is a Mac"
    }, 
    {
        "word" : "alphabet",
        "hint" : "ABCD"
    }, 
    {
        "word" : "school",
        "hint" : "I think I am sick"
    }, 
    {
        "word" : "pillow",
        "hint" : "sleep"
    }, 
    {
        "word" : "blanket",
        "hint" : "sleep"
    }, 
    {
        "word" : "orange",
        "hint" : "fruit"
    }, 
    {
        "word" : "watch",
        "hint" : "time"
    }, 
    {
        "word" : "diamond",
        "hint" : "precious"
    }, 
    {
        "word" : "chocolate",
        "hint" : "sweet"
    }, 
    {
        "word" : "game",
        "hint" : "play"
    }, 
    {
        "word" : "basketball",
        "hint" : "game"
    }, 
    {
        "word" : "elephant",
        "hint" : "animal"
    }, 
    {
        "word" : "ant",
        "hint" : "tiny"
    }, 
    {
        "word" : "photo",
        "hint" : "picture"
    }
    

];
const wsServer = new websocketServer({
    "httpServer" : httpServer
})

wsServer.on("request", request =>{

    const connection = request.accept(null, request.origin);
    connection.on("open", ()=> console.log("Connection Opened!"))
    connection.on("close", ()=> console.log("Connection Closed!"))
    connection.on("message", message => {
        console.log(message)
    var text = message.utf8Data
    text = text.toLowerCase()
    text = text.replace(/\n|\r/g, "");
    //text.replace(/[\n\r]+|[\s]{2,}/g, "")
    /*var text = ""
    for(var i=0;i<text1.length;i++)
    {
        if(text1[i]==="\\")
        {break
        }
        else
        {
            text = text + text1[i]

        }

    }*/
    console.log(text)
    console.log(word)
        count=count+1;
        if (text === word)
        {connection.send("Woohoo! Smart! You guessed it right. It is : " + word +"\nConnect again to guess another word!")
        count=0
        connection.close()
    }
        else if(text!= word && count>=3)
        {
            connection.send("Oops! Game Over! Better Luck Next Time! The word is : "+ word+ "\nConnect again to try again!")
            count=0
        connection.close()
        }
        else
        {
            connection.send("Sorry! You have "+(3-count)+" more chances. You can do this!")
        }

    })
    const clientId = guid();
    clients[clientId] = {
        "connection" : connection
    }
    index= Math.floor(Math.random() *  words.length)
    word = words[index].word
    word = word.toLowerCase()
    hint = words[index].hint
    const payLoad = {
        "Number of letters" : word.length, 
        "Hint" : hint,
        "Number of chances" : 3
    }
console.log(clientId)
    connection.send(JSON.stringify(payLoad))
})


  
function S4() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
}
const guid = () => (S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();


