import "./App.css";
import Detail from "./Detail";
import Header from "./Header";
import Child from "./Child";
import {
  BrowserRouter as Router,
  Route,
  useNavigate,
  Routes,
} from "react-router-dom";
import Favorites from "./Favorites";
import { useEffect } from "react";
function App() {
  useEffect(() => {
    const handle = () => {
      localStorage.clear();
    };
    window.addEventListener("beforeunload", handle);
  }, []);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/bank-details/:id" element={<Child />} />
          <Route
            path="/"
            element={
              <>
                <Header /> <Detail />
              </>
            }
          />
          <Route
            path="/all-banks"
            element={
              <>
                <Header /> <Detail />
              </>
            }
          />
          <Route
            path="/favorites"
            element={
              <>
                <Header />
                <Favorites />
              </>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
