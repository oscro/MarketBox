import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Link from '@material-ui/core/Link';

class SimpleMenu extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;

    return (
      <div>
        <Button
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
          color="inherit"
        >
          Login
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
        
        
        <MenuItem onClick={this.handleClose}>
        <Link
        color="inherit"
        href="/signin">
        User Login
        </Link>
        </MenuItem>
        

        <MenuItem onClick={this.handleClose}>
        <Link
        color="inherit"
        href="/signincompany">
        Business Login
        </Link>
        </MenuItem>

        </Menu>
      </div>
    );
  }
}

export default SimpleMenu;