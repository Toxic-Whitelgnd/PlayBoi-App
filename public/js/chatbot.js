var sendbtn1 = document.getElementById("sendbtn");
var text = document.getElementById("textbox");
var chatcont = document.getElementById("chatContainer");


var user = { message: "" }



// Array of possible message that can be asked and the bot can be reply
// this will be changed to nlp train after some times of development
var arrayOfPossibleMessage = [
    { message: "hi", response: "hello" },
    { message: "how are you?", response: "I'm good" },
    { message: "what is your name?", response: "I'm a chatbot!" },
    { message: "what's your name?", response: "I'm a chatbot" },
    { message: "what is your name?", response: "I'm a chatbot" },
    { message: "how old are you?", response: "I'm ageless" },
    { message: "do you have kids?", response: "No I don't!" },
    { message: "do you sleep early?", response: "No I don't!" },
    { message: "do you have a car?", response: "I travel th, rough space :)" },
    { message: "can you dance?", response: "yes, tango." },
    { message: "what's your fav food?", response: "Pizza" },
    { message: "what is your fav food?", response: "fish" },
    { message: "do you have a job?", response: "yes" },
    { message: "where do you live?", response: "in the web" },
    { message: "where were you born?", response: "on mars" },
    { message: "do you have siblings?", response: "Yes, I have got 3" }
]

// INPUTING THE USERS MSG IN THE CONTAINER
function sendMsg(userMsg) {
    var msgelement = document.createElement("div");
    msgelement.style.textAlign = "right";
    msgelement.style.margin = "10px";

    msgelement.innerHTML = "<span>You:</span>" + "<span>" + userMsg + "</span>";
    chatcont.appendChild(msgelement);
}

// CREATING THE CHATBOT RESPONSE TO THE SERVER
function chatbotResponse(userMsg) {

    var chatbotres = ""

    if (userMsg.length > 5 || userMsg == "hi") {
        var result = arrayOfPossibleMessage.filter(val => val.message.includes(userMsg.toLowerCase()))
        // it will return an result
        if (result.length > 0) {
            chatbotres = result[0].response;
        }
        else {
            chatbotres = "Sorry I can't understand!";
        }
    }
    else {
        chatbotres = "Sorry I can't understand!";
    }

    var msgelement = document.createElement("div");
    msgelement.style.textAlign = "left";
    msgelement.style.margin = "10px";

    msgelement.innerHTML = "<span>She:</span>" + "<span>" + chatbotres + "</span>";

    // reducing the spped to reply time
    setTimeout(() => {
        msgelement.animate([{ easing: "ease-in", opacity: 0.4 }, { opacity: 1 }], { duration: 1000 })
        chatcont.appendChild(msgelement);
        chatcont.scrollTop = chatcont.scrollHeight;
    }, 1000);

}

text.addEventListener("keydown", function (event) {
    if (event.key == 'Enter') {
        console.log("enter pressed");
        var usertextmsg = text.value;


        if (usertextmsg == "") {
            alert("Please Enter a valid text");
        }
        else {
            let usermsg = usertextmsg.trim();
            user.message = usermsg;
            text.value = "";
            sendMsg(usermsg);
            chatbotResponse(usermsg);
            sendTheDataToServer(usermsg);
        }
    }

    
})

function sendTheDataToServer(userMsg) {
    fetch('/chat',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body:JSON.stringify({userMsg}),
    }).then((res) => {
        return res.json();
    })
    .then((data) => console.log("fk from"+data));
}

sendbtn1.addEventListener('click', (e) => {
    var usertextmsg = text.value;


    if (usertextmsg == "") {
        alert("Please Enter a valid text");
    }
    else {
        let usermsg = usertextmsg.trim();
        user.message = usermsg;
        text.value = "";
        sendMsg(usermsg);
        chatbotResponse(usermsg);
        sendTheDataToServer(usermsg);
    }

})