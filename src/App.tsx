import React, { FC } from "react";

import "./App.css";
import RepositorySearch from "./RepositorySearch";

const App: FC = () => {
  return (
    <div className="App">
      <h1>Github repository search</h1>
      <small>PS: You can sort results by stars and date =)</small>
      <RepositorySearch />
    </div>
  );
};

export default App;
