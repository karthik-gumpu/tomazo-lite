import React from "react";
import TextField from "@material-ui/core/TextField";
import { fade, makeStyles } from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  search: {
    height: 60,
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.black, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "grey",
    marginLeft: 45,
    marginTop: 15,
    width: "90%",
  },
}));

const SearchBox = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.grow}>
      <Autocomplete
        id="searchbox"
        options={props.options}
        loading={props.loading}
        renderOption={props.renderOption}
        getOptionLabel={props.getOptionLabel}
        noOptionsText="Start typing..."
        renderInput={(params) => (
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <props.icon />
            </div>
            <TextField
              {...params}
              value={props.value}
              onChange={props.onChange}
              placeholder={props.placeholder}
              classes={{
                root: classes.inputRoot,
              }}
            />
          </div>
        )}
      />
    </div>
  );
};

export default SearchBox;
