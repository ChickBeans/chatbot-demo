import React, { useState, useEffect, useCallback } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextInput from "./TextInput";

const FormDialog = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     name: "",
  //     email: "",
  //     description: "",
  //   };
  //   this.inputName = this.inputName.bind(this);
  //   this.inputEmail = this.inputEmail.bind(this);
  //   this.inputDescription = this.inputDescription.bind(this);
  //   this.submitForm = this.submitForm.bind(this);
  // }

  const inputName = useCallback(
    (event) => {
      setName(event.target.value);
    },
    [setName]
  );

  // inputName = (event) => {
  //   //  入力内容の保持
  //   this.setState({ name: event.target.value });
  // };
  // inputEmail = (event) => {
  //   //  入力内容の保持
  //   this.setState({ email: event.target.value });
  // };

  const inputEmail = useCallback(
    (event) => {
      setEmail(event.target.value);
    },
    [setEmail]
  );

  // inputDescription = (event) => {
  //   //  入力内容の保持
  //   this.setState({ description: event.target.value });
  // };

  const inputDescription = useCallback(
    (event) => {
      setDescription(event.target.value);
    },
    [setDescription]
  );

  function validateEmailFormat(email) {
    const regex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return regex.test(email);
  };

  function validateRequiredInput(...args) {
    let isBlank = false;
    for (let i = 0; i < args.length; i = (i + 1) | 0) {
      if (args[i] === "") {
        isBlank = true;
      }
    }
    return isBlank;
  };

  const submitForm = useCallback(() => {
    const name = name;
    const email = email;
    const description = description;

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
      // this.setState({
      //   name: "",
      //   email: "",
      //   description: "",
      // });
      setName("");
      setEmail("");
      setDescription("");

      return props.handleClose();
    });
  });
  // submitForm = () => {
  //   const name = name;
  //   const email = email;
  //   const description = description;

  //   // 送信されたデータをpayloadと呼ぶ
  //   const payload = {
  //     text:
  //       "お問い合わせがありました！\n" +
  //       "お名前：" +
  //       name +
  //       "\n" +
  //       "Email：" +
  //       email +
  //       "\n" +
  //       "問い合わせ内容：" +
  //       description +
  //       "\n",
  //   };
  //   const url =
  //     "https://hooks.slack.com/services/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";
  //   // fetchでデータを参照する
  //   fetch(url, {
  //     method: "POST",
  //     body: JSON.stringify(payload),
  //     // fetch処理が完了した後に行う処理
  //   }).then(() => {
  //     alert("送信完了しました。追ってご連絡します。");
  //   //   初期化
  //     // this.setState({
  //     //   name: "",
  //     //   email: "",
  //     //   description: "",
  //     // });
  //     setName("");
  //     setEmail("");
  //     setDescription("");

  //     return props.handleClose();
  //   });
  // };

  // render() {
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">お問合せフォーム</DialogTitle>
      <DialogContent>
        <TextInput
          label={"お名前"}
          multiline={false}
          rows={1}
          value={name}
          type={"text"}
          onChange={() => inputName}
        />
        <TextInput
          label={"メールアドレス（必須）"}
          multiline={false}
          rows={1}
          value={email}
          type={"text"}
          onChange={() => inputEmail}
        />
        <TextInput
          label={"お問い合わせ内容（必須）"}
          multiline={true}
          rows={5}
          value={description}
          type={"text"}
          onChange={() => inputDescription}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary">
          キャンセル
        </Button>
        <Button onClick={submitForm} color="primary" autoFocus>
          送信する
        </Button>
      </DialogActions>
    </Dialog>
  );
  // }
};

export default FormDialog;
