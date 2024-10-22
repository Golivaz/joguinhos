document.addEventListener('DOMContentLoaded', function () {
    // Jogo de Adivinhação
    if (document.getElementById('guessInput')) {
        let randomNumber = Math.floor(Math.random() * 100) + 1;
        let attempts = 0;

        const guessInput = document.getElementById('guessInput');
        const submitGuess = document.getElementById('submitGuess');
        const restartGame = document.getElementById('restartGame');
        const feedback = document.getElementById('feedback');
        const attemptsDisplay = document.getElementById('attempts');

        submitGuess.addEventListener('click', function () {
            const guess = Number(guessInput.value);
            attempts++;
            attemptsDisplay.textContent = `Tentativas: ${attempts}`;

            if (guess < 1 || guess > 100) {
                feedback.textContent = "Por favor, insira um número entre 1 e 100!";
            } else if (guess < randomNumber) {
                feedback.textContent = "Muito baixo! Tente novamente.";
            } else if (guess > randomNumber) {
                feedback.textContent = "Muito alto! Tente novamente.";
            } else {
                feedback.textContent = `Parabéns! Você acertou em ${attempts} tentativas.`;
            }
        });

        restartGame.addEventListener('click', function () {
            randomNumber = Math.floor(Math.random() * 100) + 1;
            attempts = 0;
            feedback.textContent = "";
            attemptsDisplay.textContent = "Tentativas: 0";
            guessInput.value = "";
        });
    }

    // Jogo de Pedra, Papel, Tesoura
    if (document.querySelector('.rps-game-container')) {
        let playerScore = 0;
        let computerScore = 0;
        let draws = 0;

        const rpsButtons = document.querySelectorAll('.rps-button');
        const rpsResult = document.getElementById('rps-result');
        const playerScoreDisplay = document.getElementById('player-score');
        const computerScoreDisplay = document.getElementById('computer-score');
        const drawsDisplay = document.getElementById('draws');

        rpsButtons.forEach(button => {
            button.addEventListener('click', function () {
                const userChoice = this.getAttribute('data-choice');
                const choices = ['pedra', 'papel', 'tesoura'];
                const computerChoice = choices[Math.floor(Math.random() * 3)];

                let result;
                if (userChoice === computerChoice) {
                    result = 'Empate!';
                    draws++;
                    drawsDisplay.textContent = draws;
                } else if (
                    (userChoice === 'pedra' && computerChoice === 'tesoura') ||
                    (userChoice === 'papel' && computerChoice === 'pedra') ||
                    (userChoice === 'tesoura' && computerChoice === 'papel')
                ) {
                    result = 'Você venceu!';
                    playerScore++;
                    playerScoreDisplay.textContent = playerScore;
                } else {
                    result = 'Você perdeu!';
                    computerScore++;
                    computerScoreDisplay.textContent = computerScore;
                }

                rpsResult.textContent = `Você escolheu ${userChoice}, o computador escolheu ${computerChoice}. ${result}`;
            });
        });
    }

    // Jogo de Caça ao Tesouro
    if (document.getElementById('map')) {
        const WIDTH = 400;
        const HEIGHT = 400;
        const treasureX = Math.floor(Math.random() * WIDTH);
        const treasureY = Math.floor(Math.random() * HEIGHT);

        const map = document.getElementById('map');
        const distanceDisplay = document.getElementById('distance');

        map.addEventListener('click', function (event) {
            const clickX = event.offsetX;
            const clickY = event.offsetY;
            const distance = getDistance(clickX, clickY, treasureX, treasureY);
            const distanceHint = getDistanceHint(distance);

            distanceDisplay.textContent = `Distância do tesouro: ${distanceHint}`;

            if (distance < 20) {
                alert('Parabéns! Você encontrou o tesouro!');
            }
        });

        function getDistance(x1, y1, x2, y2) {
            const diffX = x1 - x2;
            const diffY = y1 - y2;
            return Math.sqrt((diffX * diffX) + (diffY * diffY));
        }

        function getDistanceHint(distance) {
            if (distance < 20) {
                return "Muito quente!";
            } else if (distance < 50) {
                return "Quente";
            } else if (distance < 100) {
                return "Morno";
            } else if (distance < 200) {
                return "Frio";
            } else {
                return "Muito frio";
            }
        }
    }
});
