import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { NavLink } from 'react-router-dom';

import { actionSelectFile } from '../../store/Files';

import './style.css';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 440,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%'
  },
  appBar: {
    position: 'absolute',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  toolbar: {
    ...theme.mixins.toolbar,
    display: 'flex',
    alignItems: 'center'
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    paddingTop: theme.spacing.unit * 3
  },
  button: {
    margin: theme.spacing.unit
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  }
});

class File extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.Files.selected.name
    };
    // @TODO fetch item from API when .selected doesn't exists.
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  renameFile = () => {
    fetch(
      `http://tim.uardev.com/trial-project/api/file/${
        this.props.Files.selected.id
      }/rename`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({ filename: this.state.name })
      }
    );
  };

  render() {
    const { classes, selectFile, history } = this.props;
    return (
      <div className="App">
        <div className={classes.root}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <Typography variant="title" color="inherit" noWrap>
                Rename File
              </Typography>
            </Toolbar>
          </AppBar>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <TextField
              id="file"
              label="Filename"
              className={classes.textField}
              value={this.state.name}
              onChange={this.handleChange('name')}
              margin="normal"
            />
            <div>
              <Button
                variant="extendedFab"
                aria-label="Delete"
                className={classes.button}
                onClick={() => {
                  history.goBack();
                  selectFile(undefined);
                }}
              >
                <ArrowBack className={classes.extendedIcon} />
                Back to File List
              </Button>
              <Button
                variant="extendedFab"
                color="primary"
                className={classes.button}
                onClick={this.renameFile}
              >
                Save
              </Button>
            </div>
          </main>
        </div>
      </div>
    );
  }
}

File.propTypes = {};

const mapStateToProps = ({ Files }) => ({ Files });

const mapDispatchToProps = dispatch => ({
  selectFile(file) {
    dispatch(actionSelectFile(file));
  }
});

export default withStyles(styles, { withTheme: true })(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(File)
);
