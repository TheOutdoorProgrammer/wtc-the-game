import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import reportWebVitals from './reportWebVitals';

import App from './App';
import {Map, TowerDirectory, ElevatorMap} from './Map';
import Game, {loader as gameLoader} from './Game';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/map",
        element: <Map />,
    },
    {
        path: "/map/directory/tower1",
        element: <TowerDirectory tower="tower_1" />,
    },
    {
        path: "/map/directory/tower2",
        element: <TowerDirectory tower="tower_2" />,
    },
    {
        path: "/map/elevators",
        element: <ElevatorMap />,
    },
    {
        path: '/game/:tower',
        element: <Game />,
        loader: gameLoader,
    },
    {
        path: '/game/:tower/:floor',
        element: <Game />,
        loader: gameLoader,
    }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <div className="App">
          <RouterProvider router={router} />
      </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
