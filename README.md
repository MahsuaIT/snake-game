# Snake Game

A classic Snake game implemented using HTML, CSS, and JavaScript. This version includes touch controls, sound effects, and a modal popup for game-over scenarios.

![snake game](https://github.com/MahsuaIT/snake-game/assets/164978927/43d38423-9460-408f-9d43-7c4ec2f37cff)

## Features

- **Responsive Design**: The game canvas adjusts to different screen sizes.
- **Color Scheme**: Uses a pink, blue, and green color combination.
- **Sound Effects**: Plays a sound effect when the snake eats food.
- **Touch Controls**: Buttons for up, down, left, and right controls.
- **Score Counter**: Displays the current score, which increments by 5 points for each food eaten.
- **Game Over Modal**: Shows the final score and provides a restart button when the game ends.

## How to Play

- Use the arrow keys on your keyboard or the touch control buttons to move the snake.
- Eat the green food to grow the snake and increase your score.
- Avoid colliding with the snake's own body.
- The game ends when the snake collides with itself, and a modal will display your final score with an option to restart the game.

## Live Demo

Check out the live demo [here](https://mahsuait.github.io/snake-game).

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/mahsuait/snake-game.git
    ```

2. Navigate to the project directory:
    ```bash
    cd snake-game
    ```

3. Open `index.html` in your web browser to start the game.

## File Structure

- `index.html`: The main HTML file containing the game structure.
- `style.css`: The CSS file for styling the game.
- `script.js`: The JavaScript file containing the game logic.
- `eat.mp3`: The sound effect played when the snake eats food.
- `up.png`, `down.png`, `left.png`, `right.png`: Icons for the control buttons.
