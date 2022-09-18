import {browser} from "$app/env"
import {possible, answers} from "$lib/js/wordleWords";

function command(name: string, func: (arg: any) => any, props?: any) {
    if (!browser) return
    Object.defineProperty(window, name, {
        get: function() {
            return func(props)
        }
    })
}

if (browser) console.log(`%c
  ______ _      _____  _____   ______          ___ 
 |  ____| |    |  __ \\|  __ \\ / __ \\ \\        / / |
 | |__  | |    | |  | | |__) | |  | \\ \\  /\\  / /| |
 |  __| | |    | |  | |  _  /| |  | |\\ \\/  \\/ / | |
 | |____| |____| |__| | | \\ \\| |__| | \\  /\\  /  |_|
 |______|______|_____/|_|  \\_\\\\____/   \\/  \\/   (_)
 
                        
`, "color: #39ff14; font-weight: bold;")

let guesses = 0
let solved = false

const x = new Date().setHours(0, 0, 0, 0) -
    new Date(2021, 5, 19, 0, 0, 0, 0).getTime()
let e = Math.round(x / 86400000)
e %= answers.length
const correct = answers[e]

if (browser) {
    let solvedDate = localStorage.getItem("wordleSolvedDate")
    if (solvedDate !== new Date().setHours(0, 0, 0, 0).toString()) {
        solved = false
    } else {
        solved = localStorage.getItem("wordleSolved") === "true"
    }
}

if (browser) {
    if (solved)
        console.log("%cYou've already played today's game. Come back tomorrow!", "color: orange")
    else
        console.log("%cPlay Wordle in the console! Just type any five-letter word below.", "color: orange")

}

const yellow = "background-color: yellow; color: black; font-weight: bold; font-size: 2em"
const green = "background-color: green; color: white; font-weight: bold; font-size: 2em"
const black = "background-color: black; color: white; font-weight: bold; font-size: 2em"

function wordleCheck({word}: {word: string}) {

    if (solved) {
        console.log(`%cYou've already guessed the word for today!`, "color: orange")
        return
    }

    let result = ""
    let colors = []
    let correctlyGuessed: {[key: string]: number} = {}
    let greens = []
    for (let i = 0; i < word.length; i++) {
        if (correctlyGuessed[word[i]] == undefined) {
            correctlyGuessed[word[i]] = 0
        }
        result += `%c ${word[i].toUpperCase()} `
        if (correct[i] === word[i]) {
            colors[i] = green
            correctlyGuessed[word[i]] += 1
            greens[i] = true
        }
    }
    for (let i = 0; i < word.length; i++) {
        if (!greens[i]) {
            let isYellow = false
            for (let j = 0; j < correct.length; j++) {
                let correctLetters = 0
                if (word[i] === correct[j]) {
                    correctLetters += 1
                }
                if (correctlyGuessed[word[i]] < correctLetters) {
                    colors[i] = yellow
                    isYellow = true
                    correctlyGuessed[word[i]] += 1
                }
            }
            if (!isYellow) {
                colors[i] = black
            }
        }
    }

    console.log(result, ...colors)
    guesses += 1
    if (correct == word) {
        console.log(`%cCongratulations! You've solved the daily puzzle.`, "color: orange")
        solved = true
        localStorage.setItem("wordleSolved", "true")
        localStorage.setItem("wordleSolvedDate", new Date().setHours(0, 0, 0, 0).toString())
        return
    } else if (guesses >= 6) {
        console.log(`%cSorry. you've used all your guesses. The word was ${correct.toUpperCase()}.`, "color: orange")
        solved = true
        return
    }

        return
}

for (let i = 0; i < possible.length; i++) {
    command(possible[i], wordleCheck, {word: possible[i]})
}
for (let i = 0; i < answers.length; i++) {
    command(answers[i], wordleCheck, {word: answers[i]})
}