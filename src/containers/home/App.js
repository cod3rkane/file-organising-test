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
import { actionUpdateFiles, actionSelectFile } from '../../store/Files';
import Paginate from '../../shared/components/Paginate';

import './App.css';

const drawerWidth = 240;
const MAX_ITEMS = 10;

const styles = theme => ({
  root: {
    flexGrow: 1,
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
    paddingTop: theme.spacing.unit * 3,
    paddingLeft: theme.spacing.unit * 3,
  },
  tagTitle: {
    margin: '0 auto'
  }
});

class App extends Component {
  state = {
    mobileOpen: false, // @TODO the better approuch for this it's create a new component to manage it.
    tags: [],
    selected: {
      page: undefined,
      tag: undefined
    }
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  componentDidMount() {
    const {
      match: { params }
    } = this.props;
    fetch('http://tim.uardev.com/trial-project/api/tags', {
      method: 'GET'
    })
      .then(response => {
        return response.json();
      })
      .then(tags => {
        this.setState({ tags, selected: { ...params } });
      });
    const page = params.page || 1;
    const tagname = params.tag || '';
    fetch(
      `http://tim.uardev.com/trial-project/api/files?page=${page}&tag=${tagname}`,
      {
        method: 'GET'
      }
    )
      .then(response => {
        return response.json();
      })
      .then(({ files, total_files }) => {
        this.props.updateFiles(files, total_files);
        this.setState({ selected: { ...params } });
      });
  }

  componentDidUpdate(prevProps, prevState, snp) {
    const {
      match: { params }
    } = this.props;
    const isTheSameSelected = (sel, sel2) => {
      if (sel.page === sel2.page && sel.tag === sel2.tag) {
        return true;
      }

      return false;
    };
    if (
      Object.getOwnPropertyNames(params).length !== 0 &&
      !isTheSameSelected(params, this.state.selected)
    ) {
      const page = params.page || 1;
      const tagname = params.tag || '';
      fetch(
        `http://tim.uardev.com/trial-project/api/files?page=${page}&tag=${tagname}`,
        {
          method: 'GET'
        }
      )
        .then(response => {
          return response.json();
        })
        .then(({ files, total_files }) => {
          this.props.updateFiles(files, total_files);
        });

      this.setState({ selected: { ...params } });
    }
  }

  render() {
    const {
      classes,
      theme,
      Files,
      selectFile,
      match: { params }
    } = this.props;
    let num = (Files.total / MAX_ITEMS).toString().split('.');
    num = num[1] > 0 ? parseInt(num[0]) + 1 : num[0];
    const maxItems = isNaN(num) ? 0 : num;
    const tagList = this.state.tags.map(tag => (
      <TagItem key={tag.tag} tag={tag.tag} files={tag.files} />
    ));
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
        <List>{tagList}</List>
      </div>
    );
    const fileList = Files.files.map(f => (
      <FileItem
        key={f.id}
        file={f}
        link={`/file/${f.id}`}
        onClick={selectFile}
      />
    ));
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
            <div className="content">
              {fileList}
            </div>
            <Paginate
              min={1}
              max={parseInt(maxItems)}
              selected={2}
              tag={params.tag || ''}
            />
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
  selectFile(file) {
    dispatch(actionSelectFile(file));
  }
});

export default withStyles(styles, { withTheme: true })(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
