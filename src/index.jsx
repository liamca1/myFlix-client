import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import ReactDOM from 'react-dom';
import MainView from './components/main-view/main-view';
import Container from 'react-bootstrap/Container';


// Import statement to indicate that you need to bundle `./index.scss`
import './index.css';

// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
  render() {
    return (
      <Container fluid id="main-view">
         <MainView />
      </Container>
    );
  }
}

// const rootElement = document.getElementById("root");
// const root = createRoot(rootElement);

// root.render(
//   <StrictMode>
//     <MainView />
//   </StrictMode>
// );

// // Finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

// // Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);