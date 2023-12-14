import React, { useEffect } from 'react';
import './customize.css';

export function Customize () {
    var pants = document.querySelectorAll(".pant");
    var shirts = document.querySelectorAll(".shirt");
    var shoes = document.querySelectorAll(".shoe");
    var skins = document.querySelectorAll(".character");
    var faces = document.querySelectorAll(".face");
    var hairs = document.querySelectorAll(".hair");
    var colors = ["Blonde", "Blue", "Brown", "DarkBrown", "LightBrown", "Red"];
    var playerNameEl = document.getElementById("playerName")
    
    var pants_picker = new ImageSwitcher(pants);
    var shoes_picker = new ImageSwitcher(shoes);
    var skin_picker = new ImageSwitcher(skins);
    var face_picker = new ImageSwitcher(faces);
    var hairs_picker = new ImageSwitcher(hairs);
    var colors_picker = new ColorSwitcher(colors);
    var shirt_picker = new ImageSwitcher(shirts);

    useEffect(() => {
        
        document.getElementById("shirt_button").onclick = function () {
          shirt_picker.Next();
        };
    
        document.getElementById("pant_button").onclick = function () {
          pants_picker.Next();
        };
    
        document.getElementById("shoes_button").onclick = function () {
          shoes_picker.Next();
        };
    
        document.getElementById("skin_button").onclick = function () {
          skin_picker.Next();
        };
    
        document.getElementById("face_button").onclick = function () {
          face_picker.Next();
        };
    
        document.getElementById("hair_button").onclick = function () {
          hairs_picker.Next();
        };
    
        document.getElementById("hairs_obj").onclick = function () {
          colors_picker.Next();
        };
    
        playerNameEl.textContent = getPlayerName();
        configureWebSocket();
    
        document.getElementById("submit_button").onclick = function () {
          saveOutfit();
        };
    
        loadCoins();
        setGirly();
    }, []);

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
                while (!checkUnlocked(choices[i])) {
                    i += 1;
                    i = i % choices.length;
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

    function checkUnlocked(choice) {
        const source = choice.src;
        var coins = Number(localStorage.getItem('coins'));

        if (coins >= 40) {
            return true
        }
        else if (coins >= 35) {
            return !source.includes("ComputerScienceShirt");
        }
        else if (coins >= 30) {
            return !source.includes("ComputerScienceShirt") && !source.includes("PinkShirt");
        }
        else if (coins >= 25) {
            return !source.includes("ComputerScienceShirt") && !source.includes("PinkShirt") &&
                !source.includes("BYUSweatShirt");
        }
        else if (coins >= 20) {
            return !source.includes("ComputerScienceShirt") && !source.includes("PinkShirt") &&
                !source.includes("BYUSweatShirt") && !source.includes("Overalls") &&
                !source.includes("ShortSkirt") && !source.includes("BlackShoes");
        }
        else if (coins >= 15) {
            return !source.includes("ComputerScienceShirt") && !source.includes("PinkShirt") &&
                !source.includes("BYUSweatShirt") && !source.includes("Overalls") &&
                !source.includes("ShortSkirt") && !source.includes("BlackShoes") &&
                !source.includes("SkullShirt") && !source.includes("GreenShorts") &&
                !source.includes("Boots");
        }
        else if (coins >= 10) {
            return !source.includes("ComputerScienceShirt") && !source.includes("PinkShirt") &&
                !source.includes("BYUSweatShirt") && !source.includes("Overalls") &&
                !source.includes("ShortSkirt") && !source.includes("BlackShoes") &&
                !source.includes("SkullShirt") && !source.includes("GreenShorts") &&
                !source.includes("Boots") && !source.includes("GreenStripeShirt") &&
                !source.includes("DarkBluePants") && !source.includes("Converse");
        }
        else if (coins >= 5) {
            return !source.includes("ComputerScienceShirt") && !source.includes("PinkShirt") &&
                !source.includes("BYUSweatShirt") && !source.includes("Overalls") &&
                !source.includes("ShortSkirt") && !source.includes("BlackShoes") &&
                !source.includes("SkullShirt") && !source.includes("GreenShorts") &&
                !source.includes("Boots") && !source.includes("GreenStripeShirt") &&
                !source.includes("DarkBluePants") && !source.includes("Converse") &&
                !source.includes("TurtleNeck") && !source.includes("LightBluePants") &&
                !source.includes("YellowShoes");
        }
        else {
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

    const loadCoins = async () => {
        let userCoins = '0';
        const userName = localStorage.getItem('userName');

        if (userName) {
            const user = await getUser(userName);
            if (user && user.authenticated) {
                userCoins = user.coin;
                localStorage.setItem('coins', JSON.stringify(userCoins));
            }

            userCoins = localStorage.getItem('coins');
            if (!userCoins) {
                userCoins = '0';
            }
        }

        document.querySelector('#coins').innerHTML = userCoins;
    };

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
            `<div className="event"><span className="${cls}-event">${from}</span> ${msg}</div>` + chatText.innerHTML;
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
        if (choices) {
            var itr = 0;
            var currChoice = choices[itr];
            while (currChoice.style.visibility != "visible") {
                itr += 1;
                currChoice = choices[itr];
            }
            return currChoice.src;
        }
    }

    const saveOutfit = async () => {
        const currHair = getCurr(hairs);
        const currSkin = getCurr(skins);
        const currFace = getCurr(faces);
        const currShirt = getCurr(shirts);
        const currPants = getCurr(pants);
        const currShoes = getCurr(shoes);
        const currColor = currHair.substring(80, currHair.length - 4);

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

        if (userName) {
            const response = await fetch('/api/girly/create', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ username: userName, outfit: outfit }),
            });

            if (response.ok) {
                broadcastEvent(userName, 'girlySubmit', {});
                localStorage.setItem('outfit', JSON.stringify(outfit));
            }
        } else {
            displayMsg('Error:', 'You', `need to be logged in to submit an outfit`);
        }
    };


    const getUser = async (username) => {
        const response = await fetch(`/api/user/${username}`);
        if (response.status === 200) {
            return response.json();
        }

        return null;
    };

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

        var next = pants_picker.Next().src;
        while (!next.includes(pants)) {
            next = pants_picker.Next().src;
        }
        next = shirt_picker.Next().src;
        while (!next.includes(shirt)) {
            next = shirt_picker.Next().src;
        }
        next = shoes_picker.Next().src;
        while (!next.includes(shoes)) {
            next = shoes_picker.Next().src;
        }
        next = skin_picker.Next().src;
        while (!next.includes(skin)) {
            next = skin_picker.Next().src;
        }
        next = face_picker.Next().src;
        while (!next.includes(face)) {
            next = face_picker.Next().src;
        }
        next = colors_picker.Next();
        while (next != color) {
            next = colors_picker.Next();
        }
        next = hairs_picker.Next().src;
        while (!next.includes(hair)) {
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

        if (userName) {
            var girly = await getOutfit(userName);
            if (girly) {
                localStorage.setItem('outfit', JSON.stringify(girly.outfit));
            }
            var outfit = localStorage.getItem('outfit');
            if (outfit) {
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

    // Helper functions (getCurr, broadcastEvent, etc.)...

    return (
        <div>
            <div className="players">
                Player
                <span className="player-name"></span>
                <div id="player-messages"></div>
            </div>

            <div className="top">
                <div className="score">
                    <span id="coins">0</span>
                    <span><img id="girlCoin"
                        src="https://raw.githubusercontent.com/soph1e-mart1n/startup/main/public/assets/Coin.png" /></span>
                </div>
                <div className="submit">
                    <button className="btn btn-lg" id="submit_button" type="button">Submit</button>
                </div>
            </div>

            <div className="buttons">
                <ul>
                    <li><button className="btn btn-lg" id="skin_button" type="button">Skin</button></li>
                    <li><button className="btn btn-lg" id="hair_button" type="button">Hair</button></li>
                    <li><button className="btn btn-lg" id="face_button" type="button">Face</button></li>
                    <li><button className="btn btn-lg" id="shirt_button" type="button">Top</button></li>
                    <li><button className="btn btn-lg" id="pant_button" type="button">Bottom</button></li>
                    <li><button className="btn btn-lg" id="shoes_button" type="button">Shoes</button></li>
                </ul>
            </div>

            <div className="hairs" id="hairs_obj">
                <img id="hair1" className="hair"
                    src="https://raw.githubusercontent.com/soph1e-mart1n/startup/main/public/assets/Hair1Brown.png" />
                <img id="hair2" className="hair"
                    src="https://raw.githubusercontent.com/soph1e-mart1n/startup/main/public/assets/Hair2Brown.png" />
                <img id="hair3" className="hair"
                    src="https://raw.githubusercontent.com/soph1e-mart1n/startup/main/public/assets/Hair3Brown.png" />
                <img id="hair4" className="hair"
                    src="https://raw.githubusercontent.com/soph1e-mart1n/startup/main/public/assets/Hair4Brown.png" />
                <img id="hair5" className="hair"
                    src="https://raw.githubusercontent.com/soph1e-mart1n/startup/main/public/assets/Hair5Brown.png" />

            </div>

            <div className="girly">

                <div className="skin">
                    <img className="character"
                        src="https://raw.githubusercontent.com/soph1e-mart1n/startup/main/public/assets/Fem1.png" />
                    <img className="character"
                        src="https://raw.githubusercontent.com/soph1e-mart1n/startup/main/public/assets/Fem2.png" />
                    <img className="character"
                        src="https://raw.githubusercontent.com/soph1e-mart1n/startup/main/public/assets/Fem3.png" />
                    <img className="character"
                        src="https://raw.githubusercontent.com/soph1e-mart1n/startup/main/public/assets/Fem4.png" />
                    <img className="character"
                        src="https://raw.githubusercontent.com/soph1e-mart1n/startup/main/public/assets/Fem5.png" />
                </div>

                <div className="faces">
                    <img className="face" src="https://raw.githubusercontent.com/soph1e-mart1n/startup/main/public/assets/Face1.png" />
                    <img className="face" src="https://raw.githubusercontent.com/soph1e-mart1n/startup/main/public/assets/Face2.png" />
                    <img className="face" src="https://raw.githubusercontent.com/soph1e-mart1n/startup/main/public/assets/Face3.png" />
                    <img className="face" src="https://raw.githubusercontent.com/soph1e-mart1n/startup/main/public/assets/Face4.png" />
                    <img className="face" src="https://raw.githubusercontent.com/soph1e-mart1n/startup/main/public/assets/Face5.png" />
                </div>

                <div className="clothes">
                    <div className="tops">
                        <img id="top1" className="shirt"
                            src="https://raw.githubusercontent.com/soph1e-mart1n/startup/main/public/assets/BYUSweatShirt.png" />
                        <img id="top2" className="shirt"
                            src="https://raw.githubusercontent.com/soph1e-mart1n/startup/main/public/assets/ComputerScienceShirt.png" />
                        <img id="top3" className="shirt"
                            src="https://raw.githubusercontent.com/soph1e-mart1n/startup/main/public/assets/GreenStripeShirt.png" />
                        <img id="top4" className="shirt"
                            src="https://raw.githubusercontent.com/soph1e-mart1n/startup/main/public/assets/Overalls.png" />
                        <img id="top5" className="shirt"
                            src="https://raw.githubusercontent.com/soph1e-mart1n/startup/main/public/assets/PinkShirt.png" />
                        <img id="top6" className="shirt"
                            src="https://raw.githubusercontent.com/soph1e-mart1n/startup/main/public/assets/PinkShirt2.png" />
                        <img id="top7" className="shirt"
                            src="https://raw.githubusercontent.com/soph1e-mart1n/startup/main/public/assets/SkullShirt.png" />
                        <img id="top8" className="shirt"
                            src="https://raw.githubusercontent.com/soph1e-mart1n/startup/main/public/assets/TurtleNeck.png" />
                        <img id="top9" className="shirt"
                            src="https://raw.githubusercontent.com/soph1e-mart1n/startup/main/public/assets/WhiteShirt.png" />
                    </div>

                    <div className="pants">
                        <img id="bottom1" className="pant"
                            src="https://raw.githubusercontent.com/soph1e-mart1n/startup/main/public/assets/DarkBluePants.png" />
                        <img id="bottom2" className="pant"
                            src="https://raw.githubusercontent.com/soph1e-mart1n/startup/main/public/assets/GreenShorts.png" />
                        <img id="bottom3" className="pant"
                            src="https://raw.githubusercontent.com/soph1e-mart1n/startup/main/public/assets/Jeans.png" />
                        <img id="bottom4" className="pant"
                            src="https://raw.githubusercontent.com/soph1e-mart1n/startup/main/public/assets/LightBluePants.png" />
                        <img id="bottom5" className="pant"
                            src="https://raw.githubusercontent.com/soph1e-mart1n/startup/main/public/assets/PurpleSkirt.png" />
                        <img id="bottom6" className="pant"
                            src="https://raw.githubusercontent.com/soph1e-mart1n/startup/main/public/assets/ShortSkirt.png" />
                    </div>

                    <div className="shoes">
                        <img id="shoe1" className="shoe"
                            src="https://raw.githubusercontent.com/soph1e-mart1n/startup/main/public/assets/BlackShoes.png" />
                        <img id="shoe2" className="shoe"
                            src="https://raw.githubusercontent.com/soph1e-mart1n/startup/main/public/assets/Boots.png" />
                        <img id="shoe3" className="shoe"
                            src="https://raw.githubusercontent.com/soph1e-mart1n/startup/main/public/assets/Converse.png" />
                        <img id="shoe4" className="shoe"
                            src="https://raw.githubusercontent.com/soph1e-mart1n/startup/main/public/assets/RedShoes.png" />
                        <img id="shoe5" className="shoe"
                            src="https://raw.githubusercontent.com/soph1e-mart1n/startup/main/public/assets/Socks.png" />
                        <img id="shoe6" className="shoe"
                            src="https://raw.githubusercontent.com/soph1e-mart1n/startup/main/public/assets/YellowShoes.png" />
                    </div>
                </div>
            </div>
            <div className="footer">
                <a href="https://github.com/soph1e-mart1n/startup.git">GitHub</a>
            </div>
        </div>
    );
}