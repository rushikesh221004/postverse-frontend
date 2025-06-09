import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register"
import Login from "./pages/Login"
import CreateContent from "./pages/CreateContent"

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-content" element={<CreateContent />} />
        </Routes>
        </main>
      </div> 
    </BrowserRouter>
  );
}

export default App;
