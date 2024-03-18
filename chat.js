const chatButton = document.getElementById('chat_button');
const inputChat = document.getElementById('chat_input');
const div_chat = document.getElementById('chat_text_answers');
const closeButton = document.getElementById('close_btn');
const chatWindow = document.getElementById('chat_div');
const chatSection = document.getElementById('chat_section');


function generateNewBubble(text, side){
  let newDiv = document.createElement('div');
  newDiv.classList.add(side);
  div_chat.appendChild(newDiv);

  let newBubble = document.createElement('div');
  newBubble.classList.add("bubble");
  newBubble.classList.add(`bubble_${side}`);
  newDiv.appendChild(newBubble);

  newBubble.innerText = text; 
}

let nouns_arr = ["men", "women", "cats", "dogs", "words", "people", "children", "books", "hamburgers"];
let verbs_arr = ["like", "eat", "walk", "live", "read", "sing", "scream", "cry"];
let adj_arr = ["green", "read", "blue", "loud", "lovely", "interesting", "crazy", "fast", "sleepy"]

function rnd(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomString(){
  let sentence = []; 
  let sentenceLength = rnd(3, 5); // Рандомная длина предложения

  for(let j = 0; j < sentenceLength; j++){
      let partOfSpeech = rnd(1, 3)

      if (partOfSpeech === 1) { //Определяем, какую часть речи добавить. 1-глагол, 2- сущ., 3-прил.
          word = verbs_arr[rnd(0, nouns_arr.length - 1)];
      }
      else if(partOfSpeech === 2) {
          word = nouns_arr[rnd(0, nouns_arr.length - 1)];
      }
      else{
          word = adj_arr[rnd(0, adj_arr.length - 1)];
      }
      
      sentence.push(word);
  }

  sentence = sentence.join(' ') + '. '; // Объединяем слова через пробел

  return sentence;

}

  // Реализация отправки готового ответа, если сообщение содержит ключевое слово
  function generateAnswer() {
    const inputChatTemp = document.getElementById('chat_input').value.toLowerCase();

    if (inputChatTemp.includes('кот') || inputChatTemp.includes('кошк') || inputChatTemp.includes('мот')) {
      generateNewBubble('Коты - это хорошо!', 'left');
    } else if (inputChatTemp.includes('никит') || inputChatTemp.includes('nikit')) {
      generateNewBubble('Nikita is the best!', 'left');
    } else{
      if  (inputChatTemp.includes('привет') || inputChatTemp.includes('здравствуй')|| inputChatTemp.includes('здрас')) {
        generateNewBubble('Привет-привет! Спроси меня про кота или Никиту', 'left');
      } else{
        generateNewBubble(randomString(), 'left');
      }
    }
}

  //Реализация фиктивного чата с автором страницы
window.onload = function(){ 

  // Функции для отправки сообщений в чат
  chatButton.onclick = function() {

    // trim() - обрезает пробелы в начале и в конце строки, 
    // чтобы не отправлять строки с пробелами
    if(inputChat.value.trim()){
      generateNewBubble(inputChat.value, 'right');
      generateAnswer(inputChat.value);

      inputChat.value = "";
    }
  }

  // Реализация возможности закрытия окна с чатом
  is_closed = false;

  closeButton.onclick = function() {
    if (!is_closed) {
      closeButton.classList.add("fa-arrow-up-right-from-square");
      closeButton.classList.remove("fa-circle-xmark");
      div_chat.classList.add("chat_closed");
      chatWindow.classList.add("chat_window_closed");
      inputChat.classList.add("hidden");
      mic_btn.classList.add("hidden");
      chatButton.classList.add("hidden");
      chatSection.classList.add("chat_section_closed");
      is_closed = !is_closed;
    }else{
      closeButton.classList.remove("fa-arrow-up-right-from-square");
      closeButton.classList.add("fa-circle-xmark");
      div_chat.classList.remove("chat_closed");
      chatWindow.classList.remove("chat_window_closed");
      inputChat.classList.remove("hidden");
      mic_btn.classList.remove("hidden");
      chatButton.classList.remove("hidden");
      chatSection.classList.remove("chat_section_closed");
      is_closed = !is_closed;
    }
  }


};

 // АУДИО сообщение
const controllerWrapper = document.querySelector('.controllers');
const mic_btn = document.querySelector('#mic');

const State = ['Initial', 'Record', 'Download'];
let stateIndex = 0;
let mediaRecorder, chunks = [], audioURL = '';

if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
    console.log('mediaDevices поддерживаются вашим браузером...');

    navigator.mediaDevices.getUserMedia({
        audio: true
    }).then(stream => {
        mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.ondataavailable = (e) => {
            chunks.push(e.data);
        }

        mediaRecorder.onstop = () => {
            const blob = new Blob(chunks, {'type': 'audio/ogg; codecs=opus'});
            chunks = [];
            audioURL = window.URL.createObjectURL(blob);
            document.querySelector('audio:last-of-type').src = audioURL;

        }
    }).catch(error => {
        console.log('Following error has occured : ',error);
    })
}else{
    stateIndex = '';
    application(stateIndex);
}


const record = () => {
    stateIndex = 1;
    mediaRecorder.start();
    mic_btn.classList.add("is_recording");
    application(stateIndex);
}

const stopRecording = () => {
    stateIndex = 2;
    mediaRecorder.stop();
    mic_btn.classList.remove("is_recording");
    application(stateIndex);
}

const addMessage = (text) => {
  let voice_msg = document.createElement('div');
  mic_btn.classList.add("voice_msg");
  div_chat.append(voice_msg);
}

const addAudio = () => {
    const audio = document.createElement('audio');
    audio.controls = true;
    audio.src = audioURL;
    div_chat.append(audio);
}

const application = (index) => {
    switch (State[index]) {
        case 'Initial':
            mic_btn.onclick= function() {
              record();
            }
            break;

        case 'Record':
            addMessage('Recording...');
            mic_btn.onclick = function() {
              stopRecording();
            }
            break;

        case 'Download':
            addAudio();
            mic_btn.onclick = function() {
              record();
            }
            break;

        default:
            addMessage('Your browser does not support mediaDevices');
            break;
    }

}

application(stateIndex);




