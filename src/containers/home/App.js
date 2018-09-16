import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';

import { TagItem } from '../../shared/components/TagItem';
import { FileItem } from '../../shared/components/FileItem';
import { actionUpdateFiles } from '../../store/Files';

import './App.css';

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
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative'
    }
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    paddingTop: theme.spacing.unit * 3
  },
  tagTitle: {
    margin: '0 auto'
  }
});

class App extends Component {
  state = {
    mobileOpen: false,
    tags: [],
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  componentDidMount() {
    fetch('http://tim.uardev.com/trial-project/api/tags', {
      method: 'GET'
    }).then(response => {
      return response.json();
    }).then(tags => {
      this.setState({ tags });
    });

    fetch('http://tim.uardev.com/trial-project/api/files?page=1', {
      method: 'GET'
    }).then(response => {
      return response.json();
    }).then(({ files, total_files }) => {
      this.props.updateFiles(files, total_files);
    });
  }

  render() {
    const { classes, theme, Files } = this.props;
    const tagList = this.state.tags.map(tag => <TagItem key={tag.tag} tag={tag.tag} files={tag.files} />);
    const drawer = (
      <div>
        <div className={classes.toolbar}>
          <Typography
            className={classes.tagTitle}
            variant="title"
            color="inherit"
            noWrap
          >
            Tags
          </Typography>
        </div>
        <Divider />
        <List>
          {tagList}
        </List>
      </div>
    );
    const fileList = Files.files.map(f => <FileItem key={f.id} id={f.id} name={f.name} link={`/file/${f.id}`} />);
    return (
      <div className="App">
        <div className={classes.root}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerToggle}
                className={classes.navIconHide}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="title" color="inherit" noWrap>
                Search Results
              </Typography>
            </Toolbar>
          </AppBar>
          <Hidden mdUp>
            <Drawer
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper
              }}
              ModalProps={{
                keepMounted: true // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden smDown implementation="css">
            <Drawer
              variant="permanent"
              open
              classes={{
                paper: classes.drawerPaper
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            {fileList}
          </main>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

const mapStateToProps = ({ Files }) => ({ Files });

const mapDispatchToProps = dispatch => ({
  updateFiles(files, total) {
    dispatch(actionUpdateFiles(files, total));
  },
});

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(App));
