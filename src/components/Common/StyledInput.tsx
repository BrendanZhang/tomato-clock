import React, {
  InputHTMLAttributes,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import {
  Edit,
  SubdirectoryArrowLeft,
  Close,
  Delete,
  Check,
} from "@material-ui/icons";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  onSubmitValue: (value: string) => void;
  placeholder: string;
  onPressClear?: () => void;
  ref?: React.RefObject<any>;
  tomato?: boolean;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "6px 6px",
      display: "flex",
      alignItems: "center",
      // width: 400,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    icon: {
      margin: "0 5px",
    },
    iconButton: {
      padding: 5,
    },
    divider: {
      height: 28,
      margin: "2px 4px",
    },
    dividerRight: {
      height: 28,
      margin: 2,
    },
  })
);

const StyledInput = forwardRef((props: Props, ref) => {
  const { onSubmitValue, placeholder, onPressClear, tomato } = props;
  const [value, setValue] = useState<string>("");
  const classes = useStyles();

  const pressEnter: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.keyCode === 13 && value !== "") {
      submitDescription();
    }
  };
  const submitDescription = () => {
    if (value !== "") {
      onSubmitValue(value);
      setValue("");
    }
  };
  useImperativeHandle(ref, () => ({
    tempChange: (value: string) => {
      setValue(value);
    },
  }));

  const dontReload = (e: any) => {
    e.preventDefault();
  };
  return (
    <Paper className={classes.root}>
      {tomato ? (
        <IconButton
          className={classes.iconButton}
          aria-label="clear"
          onClick={onPressClear}
        >
          <Delete color="primary" />
        </IconButton>
      ) : (
        <Edit color="primary" className={classes.icon} />
      )}
      <Divider className={classes.divider} orientation="vertical" />
      <InputBase
        className={classes.input}
        placeholder={placeholder}
        inputProps={{ "aria-label": placeholder }}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyUp={pressEnter}
        onSubmit={dontReload}
      />
      <IconButton
        className={classes.iconButton}
        aria-label="clear"
        onClick={() => setValue("")}
      >
        <Close />
      </IconButton>
      <Divider className={classes.dividerRight} orientation="vertical" />
      <IconButton
        className={classes.iconButton}
        aria-label="enter"
        onClick={submitDescription}
      >
        {tomato ? <Check color="primary" /> : <SubdirectoryArrowLeft />}
      </IconButton>
    </Paper>
  );
});
export default StyledInput;
