import React, { Component } from "react";
import {
  Collapse,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
} from "@material-ui/core";
import { ExpandLess, ExpandMore, Delete, Edit } from "@material-ui/icons";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    const { note, deleteNote } = this.props;
    const { open } = this.state;

    return (
      <>
        <ListItem>
          <ListItemIcon onClick={this.handleClick}>
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemIcon>
          <ListItemText primary={note.title} />
          <ListItemIcon>
            <Link
              to={{
                pathname: "/edit",
                search: `?id=${note.id}`,
                state: { title: note.title, text: note.text, id: note.id },
              }}
            >
              <Button>
                <Edit />
              </Button>
            </Link>
          </ListItemIcon>
          <ListItemIcon>
            <Button onClick={() => deleteNote(note)}>
              <Delete />
            </Button>
          </ListItemIcon>
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemText
              secondary={
                <ReactMarkdown
                  children={note.text}
                  remarkPlugins={[remarkGfm]}
                />
              }
            />
          </List>
        </Collapse>
      </>
    );
  }
}

export default Note;
