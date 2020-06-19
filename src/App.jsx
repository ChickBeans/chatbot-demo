import React from "react";
import defaultDataset from "./dataset";
import "./assets/styles/style.css";
import { AnswersList, Chats, FormDialog } from "./components/index";
import { db } from "./firebase/index";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [],
      chats: [],
      currentId: "init",
      dataset: {},
      open: false,
    };
    this.selectAnswer = this.selectAnswer.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
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

      // お問合せフォーム
      case nextQuestionId === "contact":
        this.handleClickOpen();
        break;

      // nextQuestionIdがhttpsで始まる場合
      case /^https:*/.test(nextQuestionId):
        const a = document.createElement("a");
        a.href = nextQuestionId;
        // 別タブで開く
        a.target = "_blank";
        // リンクをクリックする
        a.click();
        break;

      default:
        const chat = {
          text: selectedAnswer,
          type: "answer",
        };
        const chats = this.state.chats;
        // 破壊的…
        chats.push(chat);

        // 初期値の取得
        this.setState({
          // 新たな要素が追加された配列に置き換わる
          chats: chats,
          // setStateを用いてないのでエラーが出てしまう
          // chats: this.state.chats.push(chat)
        });

        // チャットの遅延表示
        setTimeout(() => {
          this.displayNextQuestion(nextQuestionId);
        }, 500);
        break;
    }
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  initDataset = (dataset) => {
    this.setState({ dataset: dataset });
  };

  // render後に1度だけ呼ばれる
  componentDidMount() {
    // asyncの即時関数
    (async () => {
      const dataset = this.state.dataset;

      // collection内のquestionsを取得
      await db
        .collection("questions")
        .get()
        // 取得後の処理、documentから要素一つずつ取り出し処理をする
        .then((snapshots) => {
          snapshots.forEach((doc) => {
            const id = doc.id;
            const data = doc.data();
            dataset[id] = data;
          });
        });

      this.initDataset(dataset);
      const initAnswer = "";
      // 回答選択画面の表示
      this.selectAnswer(initAnswer, this.state.currentId);
    })();
  }

  componentDidUpdate() {
    // 最新のチャットが見えるようにスクロール位置の頂点をスクロール領域の最下部に設定する
    const scrollArea = document.getElementById("scroll-area");
    if (scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
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
          <FormDialog open={this.state.open} handleClose={this.handleClose} />
        </div>
      </section>
    );
  }
}
