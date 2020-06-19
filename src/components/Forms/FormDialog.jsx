import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextInput from "./TextInput";

export default class FormDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      description: "",
    };
    this.inputName = this.inputName.bind(this);
    this.inputEmail = this.inputEmail.bind(this);
    this.inputDescription = this.inputDescription.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  inputName = (event) => {
    //  入力内容の保持
    this.setState({ name: event.target.value });
  };
  inputEmail = (event) => {
    //  入力内容の保持
    this.setState({ email: event.target.value });
  };
  inputDescription = (event) => {
    //  入力内容の保持
    this.setState({ description: event.target.value });
  };

  validateEmailFormat = (email) => {
    const regex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return regex.test(email);
  };

  validateRequiredInput = (...args) => {
    let isBlank = false;
    for (let i = 0; i < args.length; i = (i + 1) | 0) {
      if (args[i] === "") {
        isBlank = true;
      }
    }
    return isBlank;
  };

  submitForm = () => {
    const name = this.state.name;
    const email = this.state.email;
    const description = this.state.description;

    // 送信されたデータをpayloadと呼ぶ
    const payload = {
      text:
        "お問い合わせがありました！\n" +
        "お名前：" +
        name +
        "\n" +
        "Email：" +
        email +
        "\n" +
        "問い合わせ内容：" +
        description +
        "\n",
    };
    const url =
      "https://hooks.slack.com/services/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";
    // fetchでデータを参照する
    fetch(url, {
      method: "POST",
      body: JSON.stringify(payload),
      // fetch処理が完了した後に行う処理
    }).then(() => {
      alert("送信完了しました。追ってご連絡します。");
    //   初期化
      this.setState({
        name: "",
        email: "",
        description: "",
      });
      return this.props.handleClose();
    });
  };

  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">お問合せフォーム</DialogTitle>
        <DialogContent>
          <TextInput
            label={"お名前"}
            multiline={false}
            rows={1}
            value={this.state.name}
            type={"text"}
            onChange={() => this.inputName}
          />
          <TextInput
            label={"メールアドレス（必須）"}
            multiline={false}
            rows={1}
            value={this.state.email}
            type={"text"}
            onChange={() => this.inputEmail}
          />
          <TextInput
            label={"お問い合わせ内容（必須）"}
            multiline={true}
            rows={5}
            value={this.state.description}
            type={"text"}
            onChange={() => this.inputDescription}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleClose} color="primary">
            キャンセル
          </Button>
          <Button onClick={this.submitForm} color="primary" autoFocus>
            送信する
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
