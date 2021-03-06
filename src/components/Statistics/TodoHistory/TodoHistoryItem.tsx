import React, { useMemo } from "react";
import { format } from "date-fns";
import axios from "src/config/axios";
import "./TodoHistoryItem.scss";
import { observer } from "mobx-react";
import { IconButton, makeStyles, createStyles, Theme } from "@material-ui/core";
import { Delete, SettingsBackupRestore } from "@material-ui/icons";
import { useStores } from "src/hooks/use-stores";

interface TodoHistoryItemProps {
  itemType: "finished" | "deleted";
  completed_at?: string;
  updated_at: string;
  description: string;
  id: number;
}

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      borderRadius: "none",
      margin: "5px 0",
    },
    iconButton: {
      padding: 0,
    },
  })
);

const TodoHistoryItem: React.FunctionComponent<TodoHistoryItemProps> = (props) => {
  const { completed_at: _completed_at, description, id, itemType, updated_at } = props;
  const { todoState } = useStores();

  const completed_at = useMemo(() => {
    return _completed_at ? _completed_at : updated_at;
  }, [_completed_at, updated_at]);

  const handleUpdateTodo = async (params: any) => {
    const response = await axios.put(`todos/${id}`, params);
    todoState.updateTodos(response.data);
  };

  const classes = useStyle();
  return (
    <div className="TodoHistory-todoItem">
      <div className="text">
        <span className="TodoHistory-todoItem-time">{format(new Date(completed_at), "HH:mm")}</span>
        <span className="TodoHistory-todoItem-description">{description}</span>
      </div>
      {itemType === "finished" ? (
        <div className="action">
          <IconButton
            className={classes.iconButton}
            color="primary"
            size="small"
            onClick={(e) => {
              handleUpdateTodo({ completed: false });
            }}>
            <SettingsBackupRestore />
          </IconButton>
          <IconButton
            className={classes.iconButton}
            size="small"
            onClick={(e) => {
              handleUpdateTodo({ deleted: true });
            }}>
            <Delete />
          </IconButton>
        </div>
      ) : (
        <div className="action">
          <IconButton
            className={classes.iconButton}
            color="primary"
            size="small"
            onClick={(e) => {
              handleUpdateTodo({ deleted: false });
            }}>
            <SettingsBackupRestore />
          </IconButton>
        </div>
      )}
    </div>
  );
};

export default observer(TodoHistoryItem);
