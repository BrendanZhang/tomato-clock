import React, { useState } from "react";
import {
  makeStyles,
  Theme,
  createStyles,
  Card,
  CardContent,
  Typography,
  Checkbox,
  TextField,
  IconButton,
} from "@material-ui/core";
import "./todoItem.scss";
import { Check, Delete } from "@material-ui/icons";
import axios from "src/config/axios";
import { useStores } from "src/hooks/use-stores";
import { observer } from "mobx-react";

interface Props {
  description: string;
  completed: boolean;
  deleted: boolean;
  id: number;
  editing?: boolean;
}

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      borderRadius: "none",
      margin: "5px 0",
    },
    details: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    content: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "15px",
    },
    iconButton: {
      padding: 10,
    },
    textCompleted: {
      textDecoration: "line-through",
      color: "#a9a9a9",
    },
  }),
);

const TodoItem: React.FunctionComponent<Props> = observer((props) => {
  const [editText, setEditText] = useState(props.description);
  const { store } = useStores();

  const update = async (payload: any) => {
    const response = await axios.put(`todos/${props.id}`, payload);
    store.updateTodos(response.data.resource);
  };

  const classes = useStyle();
  const toggleEditMode: React.MouseEventHandler<HTMLDivElement> = (e) => {
    store.toggleEditing(props.id);
  };
  const keyUpHandler: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.keyCode === 13 && props.description !== "") {
      update({ description: editText });
    }
  };
  const Editing = (
    <div className="todoItem-editing">
      <IconButton color="primary" className={classes.iconButton} onClick={(e) => update({ description: editText })}>
        <Check />
      </IconButton>
      <TextField
        className="todoItem-editing-input"
        style={{ paddingLeft: 8, width: "100%" }}
        placeholder={props.description}
        value={editText}
        onChange={(e) => setEditText(e.target.value)}
        onKeyUp={keyUpHandler}
      />
      <IconButton className={classes.iconButton} onClick={(e) => update({ deleted: true })}>
        <Delete />
      </IconButton>
    </div>
  );
  const ListItem = (
    <Card className={classes.root} variant="outlined" onDoubleClick={toggleEditMode}>
      <Checkbox checked={props.completed} onChange={(e) => update({ completed: e.target.checked })} color="primary" />
      <div className={classes.details}>
        <CardContent className={classes.content} style={{ padding: "8px" }}>
          <Typography className={props.completed ? classes.textCompleted : ""} variant="inherit" color="textPrimary">
            {props.description}
          </Typography>
        </CardContent>
      </div>
    </Card>
  );
  return <div className="todoItem">{props.editing ? Editing : ListItem}</div>;
});

export default TodoItem;
