$(document).ready(function () {
  function ImageSwitcher(choices, i) {
    i = Math.floor(Math.random() * choices.length);

    this.Next = function () {
      hide_current_image();
      return show_next_image();
    };

    var hide_current_image = function () {
      if (choices) {
        choices[i].style.visibility = "hidden";
        i += 1;
      }
    };
    var show_next_image = function () {
      if (choices) {
        if (i == choices.length) {
          i = 0;
        }
        while(!checkUnlocked(choices[i]))
        {
          i += 1;
          i = i%choices.length;
        }
        choices[i].style.visibility = "visible";
        return choices[i];
      }
    };
  }

  function ColorSwitcher(choices, i) {
    i = 0;

    this.Next = function () {
      return change_img_src();
    };

    var change_img_src = function () {
      if (choices) {
        i += 1;
        if (i == choices.length) {
          i = 0;
        }
        document.getElementById(
          "hair1"
        ).src = "https://raw.githubusercontent.com/soph1e-mart1n/startup/main/public/assets/Hair1"
          .concat(choices[i])
          .concat(".png");
        document.getElementById(
          "hair2"
        ).src = "https://raw.githubusercontent.com/soph1e-mart1n/startup/main/public/assets/Hair2"
          .concat(choices[i])
          .concat(".png");
        document.getElementById(
          "hair3"
        ).src = "https://raw.githubusercontent.com/soph1e-mart1n/startup/main/public/assets/Hair3"
          .concat(choices[i])
          .concat(".png");
        document.getElementById(
          "hair4"
        ).src = "https://raw.githubusercontent.com/soph1e-mart1n/startup/main/public/assets/Hair4"
          .concat(choices[i])
          .concat(".png");
        document.getElementById(
          "hair5"
        ).src = "https://raw.githubusercontent.com/soph1e-mart1n/startup/main/public/assets/Hair5"
          .concat(choices[i])
          .concat(".png");
      }
      return choices[i];
    };
  }

  function checkUnlocked(choice)
  {
    source = choice.src;
    coins = Number(localStorage.getItem('coins'));

    if(coins >= 40) {
      return true
    }
    else if(coins >= 35)
    {
      return !source.includes("ComputerScienceShirt");
    }
    else if(coins >= 30)
    {
      return !source.includes("ComputerScienceShirt") && !source.includes("PinkShirt");
    }
    else if(coins >= 25)
    {
      return !source.includes("ComputerScienceShirt") && !source.includes("PinkShirt") &&
      !source.includes("BYUSweatShirt");
    }
    else if(coins >= 20)
    {
      return !source.includes("ComputerScienceShirt") && !source.includes("PinkShirt") &&
      !source.includes("BYUSweatShirt") && !source.includes("Overalls") &&
      !source.includes("ShortSkirt") && !source.includes("BlackShoes");
    }
    else if(coins >= 15)
    {
      return !source.includes("ComputerScienceShirt") && !source.includes("PinkShirt") &&
      !source.includes("BYUSweatShirt") && !source.includes("Overalls") &&
      !source.includes("ShortSkirt") && !source.includes("BlackShoes") &&
      !source.includes("SkullShirt") && !source.includes("GreenShorts") &&
      !source.includes("Boots");
    }
    else if(coins >= 10)
    {
      return !source.includes("ComputerScienceShirt") && !source.includes("PinkShirt") &&
      !source.includes("BYUSweatShirt") && !source.includes("Overalls") &&
      !source.includes("ShortSkirt") && !source.includes("BlackShoes") &&
      !source.includes("SkullShirt") && !source.includes("GreenShorts") &&
      !source.includes("Boots") && !source.includes("GreenStripeShirt") &&
      !source.includes("DarkBluePants") && !source.includes("Converse");
    }
    else if(coins >= 5)
    {
      return !source.includes("ComputerScienceShirt") && !source.includes("PinkShirt") &&
      !source.includes("BYUSweatShirt") && !source.includes("Overalls") &&
      !source.includes("ShortSkirt") && !source.includes("BlackShoes") &&
      !source.includes("SkullShirt") && !source.includes("GreenShorts") &&
      !source.includes("Boots") && !source.includes("GreenStripeShirt") &&
      !source.includes("DarkBluePants") && !source.includes("Converse") &&
      !source.includes("TurtleNeck") && !source.includes("LightBluePants") &&
      !source.includes("YellowShoes");
    }
    else 
    {
      return !source.includes("ComputerScienceShirt") && !source.includes("PinkShirt") &&
      !source.includes("BYUSweatShirt") && !source.includes("Overalls") &&
      !source.includes("ShortSkirt") && !source.includes("BlackShoes") &&
      !source.includes("SkullShirt") && !source.includes("GreenShorts") &&
      !source.includes("Boots") && !source.includes("GreenStripeShirt") &&
      !source.includes("DarkBluePants") && !source.includes("Converse") &&
      !source.includes("TurtleNeck") && !source.includes("LightBluePants") &&
      !source.includes("YellowShoes") && !source.includes("PinkShirt2") &&
      !source.includes("PurpleSkirt") && !source.includes("RedShoes");
    }
  }

  var socket;

  function configureWebSocket() {
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
    socket.onmessage = async (event) => {
      const msg = JSON.parse(await event.data.text());
      if (msg.type === 'girlySubmit') {
        displayMsg('player', msg.from, `updated their Girly!`);
      }
    };
  }

  function displayMsg(cls, from, msg) {
    const chatText = document.querySelector('#player-messages');
    chatText.innerHTML =
      `<div class="event"><span class="${cls}-event">${from}</span> ${msg}</div>` + chatText.innerHTML;
  }

  function broadcastEvent(from, type, value) {
    const event = {
      from: from,
      type: type,
      value: value,
    };
    socket.send(JSON.stringify(event));
  }

  function getPlayerName() {
    return localStorage.getItem('userName') ?? 'Mystery player';
  }

  function getCurr(choices) {
    if(choices) {
      var itr = 0;
      var currChoice = choices[itr];
      while(currChoice.style.visibility != "visible")
      {
        itr += 1;
        currChoice = choices[itr];
      }
      return currChoice.src;
    }
  }

  async function saveOutfit() {
    currHair = getCurr($(".hair"));
    currSkin = getCurr($(".character"));
    currFace = getCurr($(".face"));
    currShirt = getCurr($(".shirt"));
    currPants = getCurr($(".pant"));
    currShoes = getCurr($(".shoe"));
    currColor = currHair.substring(80,currHair.length-4);

    const outfit = {
      hair: currHair,
      skin: currSkin,
      face: currFace,
      top: currShirt,
      pant: currPants,
      shoe: currShoes,
      color: currColor,
    };

    const userName = localStorage.getItem('userName');

    if(userName) {
      const response = await fetch('/api/girly/create', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ username: userName, outfit: outfit }),
      });
      if(response.ok) {
        broadcastEvent(userName, 'girlySubmit', {});
        localStorage.setItem('outfit', JSON.stringify(outfit));
      }
    }
    else {
      displayMsg('Error:', 'You', `need to be logged in to submit an outfit`);
    }
  }

  async function getUser(username) {
    const response = await fetch(`/api/user/${username}`);
    if (response.status === 200) {
      return response.json();
    }
  
    return null;
  }

  async function getOutfit(username) {
    const response = await fetch(`/api/outfit/${username}`);
    if (response.status === 200) {
      return response.json();
    }
  
    return null;
  }

  function setOutfit(outfit) {
    const pants = outfit.pant;
    const shirt = outfit.top;
    const shoes = outfit.shoe;
    const skin = outfit.skin;
    const face = outfit.face;
    const color = outfit.color;
    const hair = outfit.hair;

    next = pants_picker.Next().src;
    while(!next.includes(pants))
    {
      next = pants_picker.Next().src;
    }
    next = shirt_picker.Next().src;
    while(!next.includes(shirt))
    {
      next = shirt_picker.Next().src;
    }
    next = shoes_picker.Next().src;
    while(!next.includes(shoes))
    {
      next = shoes_picker.Next().src;
    }
    next = skin_picker.Next().src;
    while(!next.includes(skin))
    {
      next = skin_picker.Next().src;
    }
    next = face_picker.Next().src;
    while(!next.includes(face))
    {
      next = face_picker.Next().src;
    }
    next = colors_picker.Next();
    while(next != color)
    {
      next = colors_picker.Next();
    }
    next = hairs_picker.Next().src;
    while(!next.includes(hair))
    {
      next = hairs_picker.Next().src;
    }
  }

  function setRandomOutfit() {
    pants_picker.Next();
    shirt_picker.Next();
    shoes_picker.Next();
    skin_picker.Next();
    face_picker.Next();
    hairs_picker.Next();
  }

  async function setGirly() {
    const userName = localStorage.getItem('userName');

    if(userName) {
      var girly = await getOutfit(userName);
      if(girly) {
        localStorage.setItem('outfit', JSON.stringify(girly.outfit));
      }
      var outfit = localStorage.getItem('outfit');
      if(outfit) {
        outfit = JSON.parse(outfit);
        setOutfit(outfit);
      }
      else {
        setRandomOutfit();
      }
    }
    else {
      setRandomOutfit();
    }
  }

  async function loadCoins() {
    let coins = '0';
    const userName = localStorage.getItem('userName');

    if(userName) {
      const user = await getUser(userName);
      if(user.authenticated) {
        coins = user.coin;
        localStorage.setItem('coins', JSON.stringify(coins));
      }
      coins = localStorage.getItem('coins');
      if(!coins) {
        coins = '0';
      }
    }
    document.querySelector('#coins').innerHTML = coins;
  }

  loadCoins();

  var pants = $(".pant");
  var shirts = $(".shirt");
  var shoes = $(".shoe");
  var skins = $(".character");
  var faces = $(".face");
  var hairs = $(".hair");
  var colors = ["Blonde", "Blue", "Brown", "DarkBrown", "LightBrown", "Red"];

  var shirt_picker = new ImageSwitcher(shirts);
  document.getElementById("shirt_button").onclick = function () {
    shirt_picker.Next();
  };

  var pants_picker = new ImageSwitcher(pants);
  document.getElementById("pant_button").onclick = function () {
    pants_picker.Next();
  };

  var shoes_picker = new ImageSwitcher(shoes);
  document.getElementById("shoes_button").onclick = function () {
    shoes_picker.Next();
  };

  var skin_picker = new ImageSwitcher(skins);
  document.getElementById("skin_button").onclick = function () {
    skin_picker.Next();
  };

  var face_picker = new ImageSwitcher(faces);
  document.getElementById("face_button").onclick = function () {
    face_picker.Next();
  };

  var hairs_picker = new ImageSwitcher(hairs);
  document.getElementById("hair_button").onclick = function () {
    hairs_picker.Next();
  };

  var colors_picker = new ColorSwitcher(colors);
  document.getElementById("hairs_obj").onclick = function () {
    colors_picker.Next();
  };

  const playerNameEl = document.querySelector('.player-name');
  playerNameEl.textContent = getPlayerName();
  configureWebSocket();

  document.getElementById("submit_button").onclick = function () {
    saveOutfit();
  }

  setGirly();
});  