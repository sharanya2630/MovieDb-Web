import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import "./App.css";
import HeaderCard from "./Components/Header/HeaderCard";
import Upcoming from "./Components/Upcoming/Upcoming";
import TopRated from "./Components/TopRated/TopRated";
import Popular from "./Components/Popular/Popular";
import DetailPage from "./Components/DetailPage/DetailPage";
import SearchPage from "./Components/Search/SearchPage";

function App() {
  return (
    <Router>
      <HeaderCard />
      <Routes>
        <Route path="/" element={<Popular />} />
        <Route path="/TopRated" element={<TopRated />} />
        <Route path="/Upcoming" element={<Upcoming />} />
        <Route path="/movie/:movieId" element={<DetailPage />} />
        <Route path="Search" element={<SearchPage />} />
      </Routes>
    </Router>
  );
}

export default App;
