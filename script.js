
// Создаем нужные переменные
const formInput = document.querySelector('.form_input');
const radioButtons = document.querySelectorAll('.rating_round');
const button = document.querySelector('.button');
const form = document.querySelector('.form_field');

const alertText = document.createElement('h4'); // создание текста
const doneText = document.createElement('h4'); // создание текста

alertText.classList.add('alert');
alertText.classList.add('hidden');
alertText.textContent = "Форма заполнена неверно!";

doneText.classList.add('good');
doneText.classList.add('hidden');
doneText.textContent = "Отзыв успешно отправлен!";



// Функция для обработки радио-кнопки

radioButtons.forEach(radio => {

    radio.addEventListener('change', function(e){
  
      const checkedNumber = document.querySelector('.rating_round:checked').value || undefined;
  
      radioButtons.forEach(item => {
        
        const currentLabel = item.previousElementSibling;
  
        if (item.value <= checkedNumber){
          currentLabel.classList.add('check');
        
        }else{
          currentLabel.classList.remove('check');
  
        }
      });
    })
  });
  
  form.addEventListener('submit', function e(event) {
    const checked = document.querySelectorAll('.check');
    event.preventDefault();
  
  
    if (checked == null || formInput.value.length < 10) {
      doneText.classList.add('hidden'); //Появляется надпись
      form.appendChild(alertText);
      alertText.classList.remove('hidden'); //Появляется надпись
      button.classList.add('empty'); //кнопку обводим красной рамкой
  
    }else{
      form.appendChild(doneText);
      doneText.classList.remove('hidden'); //Появляется надпись
      alertText.classList.add('hidden'); //Появляется надпись
      button.classList.remove('empty'); //кнопку обводим красной рамкой
    
  
      const result = {
        rating: checked.length,
        comment: formInput.value,
      }
      console.log(result);
    }
  });
  


