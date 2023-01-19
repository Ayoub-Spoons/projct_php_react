import {Routes, Route, Link } from "react-router-dom";
 //npm i react-router-dom --save
// import "./App.css";
import CreateStagiaire from "./CreateStagiaire";
import Stagiaires from "./Stagiaires";
import ModifierStagiaire from "./ModifierStagiaire";
// import ListUser from "./ListUser";

function App() {
  return (
    <div className="container">
      <div className="App">
        <h1 className="page-header text-center">
          React CRUD (Create Read Update and Delete) with PHP MySQL
        </h1>
          <Link to="/" className="btn btn-success" style={{marginRight:"80px" }}>
            page home
          </Link>

          <Link to="CreateStagiaire" className="btn btn-success">
            Add New stagiaire
          </Link>
          <Routes>
            <Route path="/"  element={<Stagiaires />} />
            <Route path="/CreateStagiaire"  element={<CreateStagiaire />} />
            <Route path="/Modifier/:id" element={<ModifierStagiaire />} />
          </Routes>
      </div>
    </div>
  );
}

export default App;
