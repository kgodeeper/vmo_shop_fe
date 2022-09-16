import Auth from "./auths/auth.component";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageNotFound from "./founds/found.component";
import Home from "./homes/home.component";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<Auth />}></Route>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/*" element={<PageNotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
