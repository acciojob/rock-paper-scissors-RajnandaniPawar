//your code here
document.addEventListener('DOMContentLoaded', function() {
    const playButton = document.getElementById('play-game');
    const rockButton = document.getElementById('rock');
    const paperButton = document.getElementById('paper');
    const scissorsButton = document.getElementById('scissors');
    const roundsLeftDisplay = document.getElementById('rounds-left');
    const userPointsDisplay = document.getElementById('user-points');
    const computerPointsDisplay = document.getElementById('computer-points');
    const computerChooseDisplay = document.getElementById('computer-choose');
    const roundResultDisplay = document.getElementById('round-result');
    const gameResultDisplay = document.getElementById('game-result');
    let roundsLeft = 0;
    let userPoints = 0;
    let computerPoints = 0;
    let totalRounds = 0;

    const choices = ["ROCK", "PAPER", "SCISSORS"];
    window.computerChoose = () => Math.floor(Math.random() * 3);

    playButton.addEventListener('click', function() {
        const gameNumberInput = document.getElementById('game-number').value;
        roundsLeft = parseInt(gameNumberInput, 10);
        if (isNaN(roundsLeft) || roundsLeft <= 0) {
            alert('Please enter a valid number of turns.');
            return;
        }
        totalRounds = roundsLeft;
        userPoints = 0;
        computerPoints = 0;
        updateDisplays();
        gameResultDisplay.textContent = '';
    });

    [rockButton, paperButton, scissorsButton].forEach(button => {
        button.addEventListener('click', function() {
            if (roundsLeft <= 0) {
                alert('No rounds left. Please start a new game.');
                return;
            }

            const userChoice = this.id.toUpperCase();
            const computerChoiceIndex = computerChoose();
            const computerChoice = choices[computerChoiceIndex];
            computerChooseDisplay.textContent = computerChoice;
            
            let roundResult = '';
            if (userChoice === computerChoice) {
                roundResult = 'TIE';
            } else if (
                (userChoice === 'ROCK' && computerChoice === 'SCISSORS') ||
                (userChoice === 'PAPER' && computerChoice === 'ROCK') ||
                (userChoice === 'SCISSORS' && computerChoice === 'PAPER')
            ) {
                roundResult = 'WON';
                userPoints++;
            } else {
                roundResult = 'LOSE';
                computerPoints++;
            }

            roundsLeft--;
            updateDisplays();
            roundResultDisplay.textContent = roundResult;

            if (roundsLeft === 0) {
                if (userPoints > computerPoints) {
                    gameResultDisplay.textContent = 'WON';
                } else if (userPoints < computerPoints) {
                    gameResultDisplay.textContent = 'LOSE';
                } else {
                    gameResultDisplay.textContent = 'TIE';
                }
            }
        });
    });

    function updateDisplays() {
        roundsLeftDisplay.textContent = roundsLeft;
        userPointsDisplay.textContent = userPoints;
        computerPointsDisplay.textContent = computerPoints;
    }
});

