import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/AppRouter";
import { MarimoSessionProvider } from "./context/MarimoSessionContext";

export default function App() {
  return (
    <MarimoSessionProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </MarimoSessionProvider>
  );
}