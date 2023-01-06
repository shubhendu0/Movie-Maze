import "./App.css";
import Header from "./Components/Header/Header";
import NavigationBar from "./Components/NavigationBar/NavigationBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Trending from "./Pages/Trending/Trending";
import { useState } from "react";
import Genre from "./Pages/Genre/Genre";
import Search from "./Pages/Search/Search";

function App() {
  const [input, setInput] = useState("");
  const [searchType, setSearchType] = useState('Movies')

  return (
    <BrowserRouter>
      <Header />
      <div className="App">
        <NavigationBar  input={input} setInput={setInput} setSearchType={setSearchType}/>
        <Routes>
          <Route path="/" element={<Trending />} />
          <Route path="/search" element={<Search input={input} searchType={searchType}/>} />
          <Route path="/genre" element={<Genre input={input}/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
