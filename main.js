const msgerForm = get(".msger-inputarea");
const msgerInput = get(".msger-input");
const msgerChat = get(".msger-chat");
const BOT_IMG = "https://i.postimg.cc/yWw4jPtX/bot.png";
const PERSON_IMG = "https://i.postimg.cc/pmvNbd2m/user.png";
const BOT_NAME = "BOT";
const PERSON_NAME = "Consumer";







msgerForm.addEventListener("submit", event => {
  event.preventDefault();
  const msgText = msgerInput.value;
  console.log(msgerInput.value)

  if (!msgText) return;
  msgerInput.value = "";
  addChat(PERSON_NAME, PERSON_IMG, "right", msgText);
  output(msgText);

});

let chat_history = []


async function output(input) {

  let product;
  

  const inputs = {
    input: {
      question: input,
      chat_history: chat_history
    }
  };

  try {
    const response = await fetch("http://localhost:8000/invoke", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(inputs)
    });
    const data = await response.json();
    product = data.output

    chat_history.push([input,product])
    
    
  } catch (error) {
    console.error("Error:", error);
  }



  
  addChat(BOT_NAME, BOT_IMG, "left", product);


}

 

function addChat(name, img, side, text) {
  const msgHTML = `
    <div class="msg ${side}-msg">
      <div class="msg-img" style="background-image: url(${img})"></div>
      <div class="msg-bubble">
        <div class="msg-info">
          <div class="msg-info-name">${name}</div>
          <div class="msg-info-time">${formatDate(new Date())}</div>
        </div>
        <div class="msg-text">${text}</div>
      </div>
    </div>
  `;
  msgerChat.insertAdjacentHTML("beforeend", msgHTML);
  msgerChat.scrollTop += 500;

  console.log(chat_history)
}
function get(selector, root = document) {
  return root.querySelector(selector);
}

function formatDate(date) {
  let hours = date.getHours();
  const amPm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const minutes = "0" + date.getMinutes();
  return `${hours}:${minutes.slice(-2)} ${amPm}`;
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}



function updateTime() {
  var timeDiv = document.querySelector('.msg-info-time');
  timeDiv.textContent = formatDate(new Date())
}

updateTime()

function toggleChatbot() {
  const chatbot = document.getElementById('chatbot');
  chatbot.classList.toggle('open');
}
