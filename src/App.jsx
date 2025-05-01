import MainPage from "./pages/MainPage";
import { Route, Routes, useNavigate } from "react-router-dom";
import RoomPage from "./pages/RoomPage";
import HistoryPage from "./pages/HistoryPage";
import ClimatePage from "./pages/ClimatePage";
import HumidityPage from "./pages/HumidityPage";
import TemperaturePage from "./pages/TemperaturePage";
import WarningPage from "./pages/WarningPage";
import { useEffect } from "react";
import socketInstance from "./socket";

function App() {
  const navigate = useNavigate() ;

  useEffect(() => {
    const socket = socketInstance.socket ;

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Received from server:", data);

      // Check for specific warning condition
      if (data.type === "warning") {
        navigate("/warning", {state: { message: data.message || "unkown message !" }});
      }
    }
  }, [navigate]);

  return (
    <Routes>
      <Route path="*" element={<MainPage />} />
      <Route path="/room/climate" element={<ClimatePage />} />
      <Route path="/room" element={<RoomPage />} />
      <Route path="/history" element={<HistoryPage />} />
      <Route path="/settings" element={<MainPage />} />
      <Route path="/humidity" element={<HumidityPage />} />
      <Route path="/temperature" element={<TemperaturePage />} />
      <Route path="/warning" element={<WarningPage />} />
    </Routes>
  );
}

export default App;