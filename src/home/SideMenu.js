import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import BusinessIcon from "@material-ui/icons/Business";
import SchoolIcon from "@material-ui/icons/School";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import Link from "@material-ui/core/Link";
import { withRouter, useLocation } from "react-router-dom";
import { useAuth } from "../Auth";
import * as permissions from "../utils/Permissions";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  userIcon: {
    marginRight: 10,
  },
  userInfo: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    right: 20,
  },
}));

const SideMenu = (props) => {
  const location = useLocation();

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    switch (location.pathname) {
      case "/login":
        setHidden(true);
        break;
      case "/logout":
        setHidden(true);
        break;
      default:
        setHidden(false);
        break;
    }
  }, [location]);

  const auth = useAuth();

  return (
    <>
      {!hidden && (
        <>
          <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
              [classes.appBarShift]: open,
            })}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
              <Link
                color="inherit"
                href="/home"
                onClick={() => props.history.push("/home")}
              >
                <Typography variant="h6" noWrap>
                  Institucional
                </Typography>
              </Link>
              <div className={classes.userInfo}>
                <AccountCircleIcon className={classes.userIcon} />
                <Typography variant="h6" noWrap>
                  <Link
                    color="inherit"
                    href="#"
                    onClick={() => props.history.push("/me")}
                  >
                    {auth.user
                      ? `${auth.user.nome} ${auth.user.sobrenome}, ${auth.user.cargo}    `
                      : ""}
                  </Link>
                </Typography>
                <Button className={classes.logoutButton} color="inherit">
                  <LogoutIcon
                    onClick={() => {
                      props.history.push("/logout");
                    }}
                  />
                </Button>
              </div>
            </Toolbar>
          </AppBar>
          <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.drawerHeader}>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "ltr" ? (
                  <ChevronLeftIcon />
                ) : (
                  <ChevronRightIcon />
                )}
              </IconButton>
            </div>
            <Divider />
            <List>
              {auth.user && permissions.canManageUsers(auth.user) && (
                <ListItem
                  button
                  key="users"
                  onClick={() => props.history.push("/users")}
                >
                  <ListItemIcon>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Usuários" />
                </ListItem>
              )}
              {permissions.canQueryInstitutions(auth.user) && (
                <ListItem
                  button
                  key="institutions"
                  onClick={() => props.history.push("/institutions")}
                >
                  <ListItemIcon>
                    <BusinessIcon />
                  </ListItemIcon>
                  <ListItemText primary="Instituições" />
                </ListItem>
              )}
            </List>
            <ListItem
              button
              key="courses"
              onClick={() => props.history.push("/courses")}
            >
              <ListItemIcon>
                <SchoolIcon />
              </ListItemIcon>
              <ListItemText primary="Cursos" />
            </ListItem>
            <Divider />
            <List>
              <ListItem
                button
                key="logout"
                onClick={() => props.history.push("/logout")}
              >
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>
            </List>
          </Drawer>
        </>
      )}
    </>
  );
};

export default withRouter(SideMenu);
