import React, { FC, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import RepositoriesContainer from "./RepositoriesContainer";

const App: FC = () => {
  return (
    <div className="App">
      <h1>Github repository search</h1>
      <RepositoriesContainer />
    </div>
  );
};

export default App;
