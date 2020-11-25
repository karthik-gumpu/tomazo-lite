import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  search: {
    height: 60,
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "rgb(227 227 227)",
    "&:hover": {
      backgroundColor: "rgb(212 212 212)",
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
        freeSolo
        options={props.options}
        filterOptions={(items) => items} // Just a hack to return all items given as options
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
