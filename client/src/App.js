import logo from './logo.svg';
import './App.css';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { Navbar } from './components/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Profile_page } from './components/Profile_page';
import { Home } from './components/Home';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/profile_page" element={<Profile_page />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
