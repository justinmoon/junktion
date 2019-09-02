import React from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

import { Button, OverlayTrigger, Tooltip, ButtonToolbar, Nav, Container, Col, Row } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import Settings from './Settings'
import History from './History'
import Sign from './Sign'
import WalletBanner from './WalletBanner'

// global bootstrap import
import 'bootstrap/dist/css/bootstrap.css';

import './App.css'

class EnumerateDevices extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch("http://localhost:5000/enumerate")
      .then(res => res.json())
      .then(
        (result) => {
          console.log('result', result)
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }
  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          {items.map(item => (
            <li key={item.name}>
              {item.type} {item.fingerprint}
            </li>
          ))}
        </ul>
      );
    }
  }
}

function Send() {
  return <h2>Send</h2>;
}

function AppRouter() {
  return (
    <Router>
      <Container>
        <Row>
          <Col xs={2}>
            <Nav defaultActiveKey="/home" className="flex-column">
              <h3>Junction</h3>
              <LinkContainer to="/send/">
                <Link>Send</Link>
              </LinkContainer>
              <LinkContainer to="/sign/">
                <Link>Sign</Link>
              </LinkContainer>
              <LinkContainer to="/history/">
                <Link>History</Link>
              </LinkContainer>
              <LinkContainer to="/settings/">
                <Link>Settings</Link>
              </LinkContainer>
            </Nav>
          </Col>
          <Col xs={10}>
            <WalletBanner/>
            <Route path="/send/" exact component={EnumerateDevices} />
            <Route path="/sign/" component={Sign} />
            <Route path="/history/" component={History} />
            <Route path="/settings/" component={Settings} />
          </Col>
        </Row>
      </Container>
    </Router>
  );
}

//export default EnumerateDevices;
export default AppRouter;
