import { Routes, Route } from "react-router-dom";
import "./App.css";
import Api from "./components/Api";
import Form from "./components/Form";
import Register from "./components/Register";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Register/>} />
        <Route path="/login" element={<Form />} />
        <Route path="/api" element={<Api />} />
      </Routes>
    </>
  );
}

export default App;
