import React, { useEffect, useState } from 'react';
import './game.css';

export function Game() {
    const [card1, setCard1] = useState("");
    const [card2, setCard2] = useState("");
    const [setCard1Parent] = useState(null);
    const [setCard2Parent] = useState(null);
    const [ready, setReady] = useState(true);
    const [stopTimer, setStopTimer] = useState(false);
    const [cardCounter, setCardCounter] = useState(0);
    const [moves, setMoves] = useState(0);

    useEffect(() => {
        // Add event listeners on component mount
        document.querySelector(".restart").addEventListener("click", restart);
        document.querySelector(".deck").addEventListener("click", () => {
            setStopTimer(false);
            timerStart();
        });
        document.querySelector(".deck").addEventListener("click", cardOpen);
        document.querySelector(".playAgain").addEventListener("click", () => {
            document.querySelector(".winPage").className = "winPage closed";
            restart();
        });

        // Cleanup event listeners on component unmount
        return () => {
            document.querySelector(".restart").removeEventListener("click", restart);
            document.querySelector(".deck").removeEventListener("click", () => {
                setStopTimer(false);
                timerStart();
            });
            document.querySelector(".deck").removeEventListener("click", cardOpen);
            document.querySelector(".playAgain").removeEventListener("click", () => {
                document.querySelector(".winPage").className = "winPage closed";
                restart();
            });
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const cardOpen = (evt) => {
        if (evt.target.className === "card" && cardCounter !== 2) {
            evt.target.className += " open show";

            if (!card1) {
                setCard1(evt.target.firstElementChild.className);
                setCard1Parent(evt.target);
                setCardCounter(1);
            } else {
                setMoves(moves + 1);

                if (moves === 16 || moves === 22 || moves === 28 || moves === 30) {
                    document
                        .querySelector(".fa-star")
                        .parentNode.removeChild(document.querySelector(".fa-star"));
                }

                setCard2(evt.target.firstElementChild.className);
                setCard2Parent(evt.target);
                setCardCounter(2);

                if (card1 === card2) {
                    setCard1Parent((prev) => {
                        prev.className = "card open show match";
                        return prev;
                    });
                    setCard2Parent((prev) => {
                        prev.className = "card open show match";
                        return prev;
                    });
                    setCard1("");
                    setCard2("");
                    setCardCounter(0);
                    win();
                } else {
                    setTimeout(() => {
                        evt.target.className = "card close";
                        setCard1Parent((prev) => {
                            prev.className = "card close";
                            return prev;
                        });
                    }, 700);
                    setTimeout(() => {
                        evt.target.className = "card";
                        setCard1Parent((prev) => {
                            prev.className = "card";
                            return prev;
                        });
                        setCard1("");
                        setCard2("");
                        setCardCounter(0);
                    }, 900);
                }
            }

            setReady(false);
        }
    };

    const returnStars = () => {
        while (document.getElementsByClassName("fa-star").length !== 5) {
            const newStar = document.createElement("li");
            newStar.className = "fa fa-star";
            document.querySelector(".stars").appendChild(newStar);
        }
    };

    const restart = () => {
        setCard1("");
        setCard2("");
        setMoves(0);
        returnStars();
        document.querySelector(".winPage").className = "winPage closed";

        let cards = Array.prototype.slice.call(document.querySelectorAll(".card"));
        cards = shuffle(cards);
        const deck = document.querySelector(".deck");

        for (let i = 0; i < cards.length; i++) {
            deck.appendChild(cards[i]);
            cards[i].className = "card";
        }

        setReady(true);
        setStopTimer(true);

        timerStart();
    };

    const shuffle = (array) => {
        let currentIndex = array.length,
            temporaryValue,
            randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    };

    const timerStart = () => {
        if (ready === true) {
            let timer = 0;
            let hour = 0;
            let minute = 0;
            let second = 0;
            window.setInterval(() => {
                ++timer;
                hour = Math.floor(timer / 3600);
                minute = Math.floor((timer - hour * 3600) / 60);
                second = timer - hour * 3600 - minute * 60;
                if (hour < 10) hour = "0" + hour;
                if (minute < 10) minute = "0" + minute;
                if (second < 10) second = "0" + second;
                document.querySelector("#timer").innerHTML =
                    hour + ":" + minute + ":" + second;
                if (stopTimer) {
                    document.querySelector("#timer").innerHTML = "00:00:00";
                    timer = 0;
                    hour = 0;
                    minute = 0;
                    second = 0;
                    return;
                }
            }, 1000);
        }
    };

    const win = () => {
        document.querySelector(".movesCount").innerText = moves;
        document.querySelector(
            ".starsCount"
        ).innerText = document.getElementsByClassName("fa-star").length;
        document.querySelector(
            ".coinsCount"
        ).innerText = document.getElementsByClassName("fa-star").length * 2;
        document.querySelector(".finalTime").innerText = document.querySelector(
            "#timer"
        ).innerHTML;

        let matchingCards = document.getElementsByClassName("card match open show");
        if (matchingCards.length === 16) {
            setTimeout(() => {
                document.querySelector(".winPage").className = "winPage";
            }, 1000);
            setStopTimer(true);
            saveCoin(document.getElementsByClassName("fa-star").length * 2);
        }
    };

    const saveCoin = async (coin) => {
        const userName = localStorage.getItem('userName');

        try {
            const response = await fetch('/api/coin/add', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ username: userName, coin: coin }),
            });
            const coins = await response.json();
            localStorage.setItem('coin', JSON.stringify(coins.coin));
        } catch {
            updateScoreLocal(coin);
        }
    };

    const updateScoreLocal = (newCoin) => {
        let coin;
        const coinText = localStorage.getItem('coin');
        if (coinText) {
            coin = JSON.parse(coinText);
        } else {
            coin = 0;
        }

        coin += newCoin;

        localStorage.setItem('coin', JSON.stringify(coin));
    };

    return (
        <div>
            <div className="container">
                <header>
                    <h1>Memory Game</h1>
                </header>

                <section className="score-panel">
                    <ul className="stars">
                        <li><i className="fa fa-star"></i></li>
                        <li><i className="fa fa-star"></i></li>
                        <li><i className="fa fa-star"></i></li>
                        <li><i className="fa fa-star"></i></li>
                        <li><i className="fa fa-star"></i></li>
                    </ul>

                    <span className="moves">0</span> Moves

                    <div id="timer">00:00:00</div>

                    <div className="restart">
                        <button type="button" className="btn btn-info btn-sm">
                            <i className="fa fa-repeat"></i>
                        </button>
                    </div>
                </section>

                <ul className="deck">
                    <li className="card">
                        <i className="fa fa-gem"></i>
                    </li>
                    <li className="card">
                        <i className="fa-regular fa-face-smile-beam"></i>
                    </li>
                    <li className="card">
                        <i className="fa fa-gamepad"></i>
                    </li>
                    <li className="card">
                        <i className="fa fa-person-dress"></i>
                    </li>
                    <li className="card">
                        <i className="fa fa-face-kiss-wink-heart"></i>
                    </li>
                    <li className="card">
                        <i className="fa fa-gamepad"></i>
                    </li>
                    <li className="card">
                        <i className="fa fa-laptop-code"></i>
                    </li>
                    <li className="card">
                        <i className="fa fa-piggy-bank"></i>
                    </li>
                    <li className="card">
                        <i className="fa fa-gem"></i>
                    </li>
                    <li className="card">
                        <i className="fa fa-ice-cream"></i>
                    </li>
                    <li className="card">
                        <i className="fa fa-laptop-code"></i>
                    </li>
                    <li className="card">
                        <i className="fa fa-ice-cream"></i>
                    </li>
                    <li className="card">
                        <i className="fa fa-person-dress"></i>
                    </li>
                    <li className="card">
                        <i className="fa fa-piggy-bank"></i>
                    </li>
                    <li className="card">
                        <i className="fa-regular fa-face-smile-beam"></i>
                    </li>
                    <li className="card">
                        <i className="fa fa-face-kiss-wink-heart"></i>
                    </li>
                </ul>
            </div>
            <div className="winPage closed">
                <h1>Congratulations!</h1>
                <p>You have finished the game with <span className="movesCount">0</span> Moves and <span className="starsCount">0</span>
                    Stars.</p>
                <p>Your time: <span className="finalTime"></span></p>
                <p>You have earned <span className="coinsCount">0</span> Coins. </p>
                <p>Wanna play again?</p>
                <button type="button" role="button" className="playAgain btn btn-info">Play again!</button>
            </div>

            <div className="footer">
                <a href="https://github.com/soph1e-mart1n/startup.git">GitHub</a>
            </div>
        </div>
    );
}

export default Game;