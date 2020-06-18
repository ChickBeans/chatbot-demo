import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Warumono from "../assets/img/warumono.png";
import Hiyoko from "../assets/img/hiyoko.png";

const Chat = (props) => {
  // 真偽判定
  const isQuestion = (props.type === "question");
  const classes = isQuestion ? "p-chat__row" : "p-chat__reverse";

  return (
    <ListItem className={classes}>
      <ListItemAvatar>
        {isQuestion ? (
          <Avatar alt="icon" src={Hiyoko} />
        ) : (
          <Avatar alt="icon" src={Warumono} />
        )}
      </ListItemAvatar>
      <div className="p-chat__bubble">{props.text}</div>
    </ListItem>
  );
};
export default Chat;
