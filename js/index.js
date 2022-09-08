if(localStorage.getItem('isUserLogin')) window.location.href = '/html/toDoList.html';

const arr_en = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const arr_ru = ['а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ы', 'ь', 'ъ' , 'ш', 'щ', 'э', 'ю', 'я'];
const arr_num = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

const title = document.getElementById("title");
const loginInp = document.getElementById("login");
const nameInp = document.getElementById("name");
const groupSelect = document.getElementById("group");
const passwordInp = document.getElementById("password");
const submit = document.getElementById("submit");
const change = document.getElementById("change");
const message = document.getElementById("message");

let isLoginForm = false;
let canClickSubmit = true;

change.addEventListener("click", (e) => {
  e.preventDefault();
  changeFormType();
});

function changeFormType() {
  isLoginForm = !isLoginForm;
  nameInp.classList.toggle("hidden");
  groupSelect.classList.toggle("hidden");
  if (isLoginForm) {
    title.innerHTML = "Авторизация";
    submit.innerHTML = "Войти";
    change.innerHTML = "Нет аккаунта? Зарегистрироваться";
    return;
  }
  title.innerHTML = "Регистрация";
  submit.innerHTML = "Зарегистрироваться";
  change.innerHTML = "Есть аккаунт? Войти";
}

submit.addEventListener("click", async (e) => {
  e.preventDefault();
  if(!canClickSubmit) return;
  canClickSubmit = false;
  if( !checkInput(loginInp) || !checkInput(passwordInp) ) return;
  if (isLoginForm) {
    const answer = await login();
    if (answer.status) {
      window.location.href = '/html/toDoList.html';
      localStorage.setItem("isUserLogin", "true");
      localStorage.setItem("userName", answer.data.name);
      localStorage.setItem("group_id", answer.data.group);
    }
    canClickSubmit = true;
    return;
  }
  if( !checkInput(nameInp) ) return;
  const answer = await registration();
  if (answer.status) {
    changeFormType();
  }
  canClickSubmit = true;
});

function checkInput(input){
    if (input.value === "" || input.value.length <= 5 || input.value.length > 30 ) {
      showError("Длина полей должна быть не менее 6 символов и не более 30 символов");
      return false;
    }
    const loginInputValidate = checkContain(loginInp);
    const nameInputValidate = checkContain(nameInp, true);
    const passwordInputValidate = checkContain(passwordInp);
    if(loginInputValidate !== true) {
      showError('В поле ввода логина ' + loginInputValidate);
      return false;
    }
    if(nameInputValidate !== true) {
      showError('В поле ввода имени ' + nameInputValidate);
      return false;
    }
    if(passwordInputValidate !== true) {
      showError('В поле ввода пароля ' + passwordInputValidate);
      return false;
    }
    return true;
}

function checkContain(inp, canUseRu) {
  for(let i = 0; i < inp.value.length; i++){
    if(!arr_en.includes(inp.value[i]) && !arr_num.includes(inp.value[i])) {
      if(!canUseRu) return 'допустимы только английские буквы и цифры';
      if(!arr_ru.includes(inp.value[i])) return 'допустимы только английские, русские буквы и цифры';
    }
  }
  return true;
}

function showError(err){
  message.classList.remove("hiddenMessage");
  message.innerHTML = err;
  setTimeout(() => {
    message.classList.add("hiddenMessage");
    canClickSubmit = true;
  }, 3000);
}

async function login() {
  const answer = await fetch(
    `http://dashboard/api/index.php/?method=login&login=${loginInp.value}&password=${passwordInp.value}`
  );
  const result = await answer.json();
  return result;
}

async function registration() {
  const answer = await fetch(
    `http://dashboard/api/index.php/?method=registration&login=${loginInp.value}&password=${passwordInp.value}&name=${nameInp.value}&group=${groupSelect.value}`
  );
  const result = await answer.json();
  return result;
}
