import React from "react";
import defaultDataset from "./dataset";
import "./assets/styles/style.css";
import { AnswersList, Chats } from "./components/index";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [],
      chats: [],
      currentId: "init",
      dataset: defaultDataset,
      open: false,
    };
    this.selectAnswer = this.selectAnswer.bind(this);
  }

  // 選択した回答に対する質問の表示
  displayNextQuestion = (nextQuestionId) => {
    const chats = this.state.chats;
    chats.push({
      text: this.state.dataset[nextQuestionId].question,
      type: "question",
    });
    this.setState({
      answers: this.state.dataset[nextQuestionId].answers,
      chats: chats,
      currentId: nextQuestionId,
    });
  };

  // 回答一覧表示
  selectAnswer = (selectedAnswer, nextQuestionId) => {
    switch (true) {
      // 初期値
      case nextQuestionId === "init":
        this.displayNextQuestion(nextQuestionId);
        break;
      default:
        const chat = {
          text: selectedAnswer,
          type: 'answer',
        }
        const chats = this.state.chats;
        // 破壊的…
        chats.push(chat)

        // 初期値の取得
        this.setState({
          // 新たな要素が追加された配列に置き換わる
          chats: chats,
          // setStateを用いてないのでエラーが出てしまう
          // chats: this.state.chats.push(chat)
        });

        this.displayNextQuestion(nextQuestionId);
        break;
    }
  };

  componentDidMount() {
    const initAnswer = "";
    // 回答選択画面の表示
    this.selectAnswer(initAnswer, this.state.currentId);
  }

  render() {
    return (
      <section className="c-section">
        <div className="c-box">
          <Chats chats={this.state.chats} />
          <AnswersList
            answers={this.state.answers}
            select={this.selectAnswer}
          />
        </div>
      </section>
    );
  }
}
