import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { Route, Routes } from "react-router-dom";
import Header from "./components/header";
import Home from "./components/home";
import "./main.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Header></Header>
      <Home></Home>
      {/* <Routes>
        <Route path="/" element={<MainPageCard/>}/>
      </Routes> */}
      {/* <Footer></Footer> */}
    </div>
  );
}

export default App;