This project bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

![Image](https://i.imgur.com/IHHWxOq.png)

## Kayles: Game rule

> Kayles is played with a row of tokens, which represent bowling pins. The row may be of any length. The two players alternate; each player, on his or her turn, may remove either any one pin (a ball bowled directly at that pin), or two adjacent pins (a ball bowled to strike both). Under the normal play convention, a player loses when he or she has no legal move (that is, when all the pins are gone). The game can also be played using misère rules; in this case, the player who cannot move wins.

For this specific implementation of Kayles:
- Let's use misère rules: the player who cannot make a legal move wins.
- There should be 10 tokens in a row, but this should be easy to change.
- If a player removes two pins in a single turn, the pins must be adjacent.


## The Challenge

* Build a [single-elimination tournament](https://en.wikipedia.org/wiki/Single-elimination_tournament) layer on top of the existing Kayles implementation. You can assume that only 2^X players will be in a given tournament, but the specific number should be easy to change in your code. The app should select the players that play next, and each player should play once in each round. Note that we're not looking for a complicated tournament structure here -- a straightforward solution is preferred.
* When a tournament is over, display who won in an `alert`.


## Available Scripts
``` bash
# instal the module
npm install

# Runs the app in the development mode.
npm start

```