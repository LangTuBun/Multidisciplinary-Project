import MainPage from "./pages/MainPage";
import { Route, Routes } from "react-router-dom";
import RoomPage from "./pages/RoomPage";
import HistoryPage from "./pages/HistoryPage";
import ClimatePage from "./pages/ClimatePage";

function App() {
  return (
    <Routes>
      <Route path="*" element={<MainPage />} />
      <Route path="/room/climate" element={<ClimatePage />} />
      <Route path="/room" element={<RoomPage />} />
      <Route path="/history" element={<HistoryPage />} />
      <Route path="/settings" element={<MainPage />} />
    </Routes>
  );
}

export default App;