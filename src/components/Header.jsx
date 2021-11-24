import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => setVisible(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Mail Delivery Service
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>

      <Drawer anchor="left" open={visible} onClose={() => setVisible(false)}>
        <List style={{ width: "300px", paddingTop: "3rem"}}>
          <Link to="/package" style={{color: "#000", textDecoration: "none"}} onClick={() => setVisible(false)}>
            <ListItem button>
              <ListItemText primary="Packages" />
            </ListItem>
          </Link>

          <Link to="/customer" style={{color: "#000", textDecoration: "none"}} onClick={() => setVisible(false)}>
            <ListItem button>
              <ListItemText primary="Customers" />
            </ListItem>
          </Link>

          <Link to="/invoices" style={{color: "#000", textDecoration: "none"}} onClick={() => setVisible(false)}>
            <ListItem button>
              <ListItemText primary="Invoices" />
            </ListItem>
          </Link>
        </List>
      </Drawer>
    </>
  );
}

export default Header;
