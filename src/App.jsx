import MainPage from "./pages/MainPage";
import { Route, Routes } from "react-router-dom";
import RoomPage from "./pages/RoomPage";
import HistoryPage from "./pages/HistoryPage";
import ClimatePage from "./pages/ClimatePage";
import HumidityPage from "./pages/HumidityPage";
import TemperaturePage from "./pages/TemperaturePage";

function App() {
  return (
    <Routes>
      <Route path="*" element={<MainPage />} />
      <Route path="/room/:id" element={<RoomPage />} />
      <Route path="/room/climate" element={<ClimatePage />} />
      <Route path="/history" element={<HistoryPage />} />
      <Route path="/settings" element={<MainPage />} />
      <Route path="/humidity" element={<HumidityPage />} />
      <Route path="/temperature" element={<TemperaturePage />} />
    </Routes>
  );
}

export default App;