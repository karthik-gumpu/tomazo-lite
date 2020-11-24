import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import SortIcon from "@material-ui/icons/Sort";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Typography from "@material-ui/core/Typography";
import CheckIcon from "@material-ui/icons/Check";

const menuItems = [
  [
    { key: "cost", name: "Cost", type: "sort" },
    { key: "rate", name: "Rating", type: "sort" },
  ],
  [
    { key: "asc", name: "ASC", type: "order" },
    { key: "desc", name: "DESC", type: "order" },
  ],
];

const SortingMenu = ({ selectedData, ...props }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (key, value) => {
    props.onSortChange(key, value);
    handleClose();
  };

  return (
    <>
      <Button
        aria-controls="sort-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <SortIcon />
      </Button>
      <Menu
        id="sort-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {menuItems.map((items) => (
          <span>
            {items.map((item) => (
              <MenuItem
                onClick={() => handleSelect(item.type, item.key)}
                key={item.name}
              >
                <ListItemIcon>
                  {selectedData[item.type] === item.key && (
                    <CheckIcon fontSize="small" />
                  )}
                </ListItemIcon>
                <Typography variant="inherit">{item.name}</Typography>
              </MenuItem>
            ))}
            <Divider />
          </span>
        ))}
      </Menu>
    </>
  );
};

export default SortingMenu;
