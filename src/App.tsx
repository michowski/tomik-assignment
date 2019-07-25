import React, { FC } from "react";

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
