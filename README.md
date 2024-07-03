# Hangman

## Task

### Project's Description

[Hangman](<https://en.wikipedia.org/wiki/Hangman_(game)>) is a classic word game in which you must find the correct answer by guessing letters one at a time.

### Game rules

1. The game is represented by two main parts: **the gallows part** and **the quiz part**.
2. At the beginning of the game, the gallows **is empty**.
3. The quiz part includes:

- a question,
- a secret word (the answer to the question), represented by underscores **for each** letter in the word _(for example, if the secret word is 'address' it will be written like '\_ \_ \_ \_ \_ \_ \_')_,
- an incorrect guesses counter,
- a virtual keyboard,

4. The user must be able to use **both virtual** _(by clicking letter keys on the screen)_ and **physical keyboards** _(by pressing letter keys on their keyboard)_ to play the game.
5. When the user starts guessing the letters:

- whenever the letter is guessed correctly, this letter appears **instead of the corresponding underscore(s)** _(for the example mentioned above, if the user clicks or presses the 'd' letter, both 'd's must appear on the screen: '\_ d d \_ \_ \_ \_')_;
- if the letter is not in the word, **one body part** must be added to the gallows and the incorrect guesses counter **must be updated** accordingly;
- the clicked/pressed letter **must be disabled** and it must be reflected in the UI _(for example, by using a different color on the disabled button)_;

6. The body parts appear on the gallows in the **following order**: head, body, left arm, right arm, left leg, right leg. It means that the user has **6 attempts** to guess the word.
7. The player will continue guessing letters until either **the word is solved** or **all six body parts** are on the gallows.
8. At the end of the game, a **modal window** must appear. It must:

- include the **message** that either congratulates the user on winning the game or informs them that they failed to win;
- the **secret word** (even if it was guessed correctly);
- a **"play again"** button.

9. When the user clicks on "play again", the game **starts over**:

- the gallows is **empty**;
- the question is **changed**;
- the underscores are **updated** according to the new secret word _(the same secret word can't be used as an answer to more than one question)_;
- an incorrect guesses counter is **set to 0**.
