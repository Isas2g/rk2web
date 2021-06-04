let cardContainer = document.getElementById('app');
let createCard = document.getElementsByClassName('create-card');
let createPlus = document.getElementsByClassName('create');
let counters = {
  count0: 1,
  count1: 1,
  count2: 1
}

function getElements() {
  createCard = document.getElementsByClassName('create-card');
  createPlus = document.getElementsByClassName('create');
}

let app = new Vue({
  el: '#app',
  data: {
    cards0: [{num: 0, id: 0, title: 'Суп «Харчо»', text: 'Суп харчо, рецепт с курицей. Вкусный, ароматный, острый. Вообще-то это суп из говядины, но грузины довольно часто готовят суп харчо и из курицы.'}, {num: 0, id: 1, title: 'Куриный суп с плавленым сыром', text: 'Очень сытный, нежный и ароматный куриный суп, не требующий много времени для приготовления. Рецепт супа с плавленым сыром очень прост, но замечательный вкус супчика оценят даже злостные «нелюбители» первых блюд. Отличный вариант для ужина всей семьей.'}],
    cards1: [{num: 1, id: 0, title: 'Хачапури по-аджарски', text: 'Хачапури по-аджарски Давно ходил вокруг рецепта хачапури по-аджарски, не решался. Сегодня попробовал - я в полном восторге! Тесто замечательное, интересный процесс приготовления, а вкус - не передать, просто сказка! Кавказ, прости, что так долго тянул с этим рецептом. Много потерял. Вся семья оценила аджарские хачапури на 5 баллов! Готовится просто, повторяйте на здоровье!'}, {num: 1, id: 1, title: 'Пышные пончики в духовке', text: 'Быстро и без жарки! Нежнейшие пончики (англ. donuts) в духовке - без фритюра! Очень-очень воздушные, мягкие и пышные пончики, без начинки. Просто объедение!'}],
    cards2: [{num: 2, id: 0, title: 'Закуска "Рафаэлки"', text: 'Закуска "Рафаэлло" - вкусное и красивое блюдо из яиц, сыра и чеснока - обязательно порадует ваших гостей.'}, {num: 2, id: 1, title: 'Домашние сырные палочки', text: 'Простой, но очень вкусный рецепт домашних сырных палочек. Пальчики оближешь! Минимум продуктов и максимум удовольствия, а с приготовлением справится даже ребёнок.'}],
    darkMode: false
  },
  methods: {
    addData: function(num, title, text) {
      let id = counters['count'+num] ;
      this['cards'+num].push({id, num, title, text});
      counters['count'+num]++;
    },
    removeData: function(num, id) {
      for(let i = 0; i < this['cards'+num].length; i++) {
        if (this['cards'+num][i].id === id) {
          this['cards'+num].splice(i, 1);
          counters['count'+num]--;
        }
      }
    }
  }
});


for (let i = 0; i < createPlus.length; i++) {
  createPlus[i].addEventListener('click', _ => {
    createPlus[i].style.display = 'none';
    
    createCard[i].insertAdjacentHTML('afterbegin', `<form id="form${i}" class="create-form">
    <label for="title${i}">Название</label>
    <input v-model="card-title${i}" placeholder="Название" type="text" id="title${i}">
    <label for="text${i}">Текст</label>
    <textarea v-model="card-text${i}" placeholder="Текст" type="text" id="text${i}"></textarea>
    <button id="create${i}">Создать</button>
  </form>`);
    
    let form = document.getElementById('form'+i);
    let createBtn = document.getElementById('create'+i);
    let title = document.getElementById('title'+i);
    let text = document.getElementById('text'+i);
    
    form.addEventListener('submit', e => e.preventDefault());
    
    createBtn.addEventListener('click', _ => {
      app.addData(i, title.value, text.value);
      form.remove();
      createPlus[i].style.display = 'block';
    });
  });
}


let dark = document.getElementById('dark-mode');
let light = document.getElementById('light-mode');
let body = document.getElementsByTagName('body')[0];
let footer = document.getElementsByTagName('footer')[0];
let apps = document.getElementsByClassName('app');
let cards = document.getElementsByClassName('card');
let createSigns = document.getElementsByClassName('create');

dark.addEventListener('click', _ => {
  body.classList.add('dark');
  footer.classList.add('dark');
  for (let i = 0; i < apps.length; i++) {
    apps[i].classList.add('dark');
  }
  for (let i = 0; i < cards.length; i++) {
    cards[i].classList.add('dark');
  }
  for (let i = 0; i < createSigns.length; i++) {
    createSigns[i].classList.add('dark');
  }
  dark.style.display = 'none';
  light.style.display = 'inline';
  app.darkMode = true;
});
light.addEventListener('click', _ => {
  body.classList.remove('dark');
  footer.classList.remove('dark');
  for (let i = 0; i < apps.length; i++) {
    apps[i].classList.remove('dark');
  }
  for (let i = 0; i < cards.length; i++) {
    cards[i].classList.remove('dark');
  }
  for (let i = 0; i < createSigns.length; i++) {
    createSigns[i].classList.remove('dark');
  }
  light.style.display = 'none';
  dark.style.display = 'inline';
  app.darkMode = false;
});