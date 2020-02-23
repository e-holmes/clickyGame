import React, { Component } from "react";
import Gameboard from "../components/Gameboard";
import Picture from "../components/Picture";
import Scoreboard from "../components/Scoreboard";
import data from "../data.json";

class Game extends Component {
    state = {
        data,
        score: 0,
        highScore: 0
    };

    componentDidMount() {
        this.setState({ data: this.updateData(this.state.data) });
    }

    correct = newData => {
        const { highScore, score } = this.state;
        const newScore = score + 1;
        let scores = {
            newScore: newScore,
            highScore: highScore
        }

        const newHighScore = this.compare(scores);

        this.setState({
            data: this.updateData(newData),
            score: newScore,
            highScore: newHighScore
        });
    };

    compare = scores => {
        var newHighScore;

        if (scores.newScore > scores.highScore) {
            newHighScore = scores.newScore;
        } else {
            newHighScore = scores.highScore;
        }
        return newHighScore
    }

    incorrect = data => {
        this.setState({
            data: this.resetData(data),
            score: 0
        });
    };

    resetData = data => {
        const resetData = data.map(item => ({ ...item, clicked: false }));
        return this.updateData(resetData);
    };

    updateData = data => {
        let i = data.length - 1;
        while (i > 0) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = data[i];
            data[i] = data[j];
            data[j] = temp;
            i--;
        }
        return data;
    };

    handleItemClick = id => {
        let guessedCorrectly = false;
        const newData = this.state.data.map(item => {
            const newItem = { ...item };
            if (newItem.id === id) {
                if (!newItem.clicked) {
                    newItem.clicked = true;
                    guessedCorrectly = true;
                }
            }
            return newItem;
        });
        guessedCorrectly
            ? this.correct(newData)
            : this.incorrect(newData);
    };


    render() {
        return (
            <div>
                <Scoreboard score={this.state.score} highScore={this.state.highScore}></Scoreboard>
                <h2>Click on a picture to earn points, but don't click the same one twice!</h2>
                <Gameboard>
                    {this.state.data.map(item => (
                        <Picture
                            key={item.id}
                            id={item.id}
                            update={!this.state.score && this.state.topScore}
                            handleClick={this.handleItemClick}
                            image={item.image}
                        />
                    ))}
                </Gameboard>
            </div>
        )
    }
}

export default Game;
