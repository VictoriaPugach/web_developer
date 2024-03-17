  /*
const div_chat = document.getElementById('chat_text_answers');
const chatButton = document.getElementById('chat_button');


// Необходимые массивы и переменные
const nouns_arr = ["men", "women", "cats", "dogs", "words", "people", "children", "books", "hamburgers"];
const verbs_arr = ["like", "eat", "walk", "live", "read", "sing", "scream", "cry"];
const adj_arr = ["green", "read", "blue", "loud", "lovely", "interesting", "crazy", "fast", "sleepy"]

const changeTime = setInterval(generatePhrase, 1500);//setInterval - позволяет вызывать функцию регулярно. Каждые 1,5 секунды

// Функция генерации случайных чисел из примера
function rnd(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}


// Функция генерирует предложение из рандомного числа слов, а затем добавляет элемент ызфт
function generatePhrase() {
  let sentence = []; 
  let sentenceLength = rnd(3, 12); // Рандомная длина предложения
  let randomClass = `cl${rnd(1, 5)}`; // Рандомный стиль предложения
  
    for(let j = 0; j < sentenceLength; j++){
      const partOfSpeech = rnd(1, 3)

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

    const span = document.createElement('span');
    span.classList.add(randomClass);
    span.textContent = sentence.join(' ') + '. '; // Объединяем слова через пробел
    div_chat.appendChild(span);

    sentence = []
}


// Функция, которая будет останавливать генерацию по клику
function stopGenerating() { // Остановка генерации по клику
    clearInterval(changeTime);
}
  
chatButton.onclick = function() {
    stopGenerating();
}
*/


  //Реализация фиктивного чата с автором страницы
window.onload = function(){ 

  // функции для записи аудио-сообщения
  const mic_btn = document.querySelector('#mic');
  const playback = document.querySelector('.playback');

  mic_btn.addEventListener('click', ToggleMic);

  let can_record = false;
  let is_recording = false;
  let recorder = null;
  let chuncks = [];

  function SetupAudio(){
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
      .getUserMedia({
        audio: true,
      })
      .then(SetupStream)
      .catch(err => {
        console.error(err)
      });
    }

  }
  SetupAudio();

  function SetupStream(stream) {
    recorder = new MediaRecorder(stream);

    recorder.ondataavailable = e => {
      chuncks.push(e.data);
    }

    recorder.onstop = e =>{
      let blob = new Blob(chuncks, {type: "audio/webm; codecs=opus"});
      chuncks = [];
      let audioURL = window.URL.createObjectURL(blob);
      playback.src = audioURL;
    }
    can_record = true;
    
  }


  function ToggleMic(){
    if(!can_record){
      return
    }

    is_recording = !is_recording;

    if (is_recording) {
      recorder.start();
      mic_btn.classList.add("is-recording");
    } else{
      recorder.stop();
      mic_btn.classList.remove("is-recording");
    }

  }


  // Функции для отправки сообщений в чат

  const chatButton = document.getElementById('chat_button');
  const inputChat = document.getElementById('chat_input');
  const div_chat = document.getElementById('chat_text_answers');

  chatButton.onclick = function() {

    // trim() - обрезает пробелы в начале и в конце строки, 
    // чтобы не отправлять строки с пробелами
    if(inputChat.value.trim()){

      let newDiv = document.createElement('div');
      newDiv.classList.add("right");
      div_chat.appendChild(newDiv);

      console.log("btn");

      let newBubble = document.createElement('div');
      newBubble.classList.add("bubble");
      newBubble.classList.add("bubble_right");
      newDiv.appendChild(newBubble);

      newBubble.innerText = inputChat.value; // Объединяем слова через пробел

      inputChat.value = "";


    }
    
  }

  const closeButton = document.getElementById('close_btn');
  const chatWindow = document.getElementById('chat_div');

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


      is_closed = !is_closed;
    }else{
      closeButton.classList.remove("fa-arrow-up-right-from-square");
      closeButton.classList.add("fa-circle-xmark");
      div_chat.classList.remove("chat_closed");
      chatWindow.classList.remove("chat_window_closed");
      inputChat.classList.remove("hidden");
      mic_btn.classList.remove("hidden");
      chatButton.classList.remove("hidden");
      is_closed = !is_closed;
    }
  }




};




