import React from "react";
import { makeStyles, withStyles, Theme, createStyles } from "@material-ui/core/styles";
import SwipeableViews from "react-swipeable-views";
import Tabs from "@material-ui/core/Tabs";
import { format } from "date-fns";
import Tab from "@material-ui/core/Tab";
import { Typography, Box, useTheme } from "@material-ui/core";
// import DatePickerDialog from "../../Common/DatePickerDialog";
import { observer } from "mobx-react";
// import { useStores } from "src/hooks/use-stores";
import StatisticsDetailItem from "./StatisticsDetail-tabs-item";
import { DateRange } from "@material-ui/pickers/DateRangePicker/RangeTypes";

interface StyledTabProps {
  label: string;
}

const AntTabs = withStyles({
  root: {},
  indicator: {
    backgroundColor: "rgba(255, 179, 113, 1)",
  },
})(Tabs);

const AntTab = withStyles((theme: Theme) =>
  createStyles({
    root: {
      textTransform: "none",
      minWidth: 72,
      fontWeight: theme.typography.fontWeightRegular,
      marginRight: theme.spacing(4),
      transition: "color 0.2s",
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
      "&:hover": {
        color: "rgba(255, 225, 143, 1)",
        opacity: 1,
      },
      "&$selected": {
        color: "rgba(255, 179, 113, 1)",
        fontWeight: theme.typography.fontWeightMedium,
      },
      "&:focus": {
        color: "rgba(255, 179, 113, 1)",
      },
    },
    selected: {},
  })
)((props: StyledTabProps) => <Tab disableRipple {...props} />);

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: 20,
    flexGrow: 1,
  },
  padding: {
    padding: theme.spacing(3),
  },
  wrapper: {
    backgroundColor: theme.palette.background.paper,
  },
  action: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #e8e8e8",
  },
  ifSort: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#666",
    fontSize: "12px",
    padding: "10px",
    paddingBottom: "0px",
  },
  panel: {
    padding: 0,
  },
}));

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}>
      {value === index && (
        <Box css={{ padding: "12px 0" }} p={3}>
          {children}
        </Box>
      )}
    </Typography>
  );
}

const StatisticsDetailTabs: React.FunctionComponent<any> = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  // const { dateFilterState } = useStores();
  // const selectedDate = dateFilterState.dateRange;
  const selectedDate: DateRange<Date | null> = [null, null];

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index: number) => {
    setValue(index);
  };
  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <div className={classes.action}>
          <AntTabs value={value} onChange={handleChange} textColor="secondary" aria-label="tabs">
            <AntTab label="番茄统计" />
            <AntTab label="任务统计" />
          </AntTabs>
          {/* <DatePickerDialog /> */}
        </div>
        {selectedDate[0] !== null && selectedDate[1] !== null && (
          <div className={classes.ifSort}>
            仅显示{" "}
            {`${format(new Date(selectedDate[0]), "yyyy-MM-dd")} ~ ${format(
              new Date(selectedDate[1]),
              "yyyy-MM-dd"
            )} 的信息`}
          </div>
        )}
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}>
          <TabPanel value={value} index={0} dir={theme.direction}>
            <StatisticsDetailItem
              width={props.width}
              data={props.finishedTomatoes}
              selectedDate={selectedDate}
              isTomato={true}
            />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <StatisticsDetailItem
              width={props.width}
              data={props.finishedTodos}
              selectedDate={selectedDate}
              isTomato={false}
            />
          </TabPanel>
        </SwipeableViews>
      </div>
    </div>
  );
};

export default observer(StatisticsDetailTabs);
