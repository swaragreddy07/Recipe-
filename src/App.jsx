import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
 
} from "react-router-dom";
import Home from "./Home.jsx";
import View from "./View.jsx";
function App() {



  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home  />} />
        <Route exact path="/view/:id" element={<View />} />
      </Routes>
    </Router>
  );
}

export default App;
