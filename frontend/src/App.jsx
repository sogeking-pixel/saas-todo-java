import AppRouter from "./routes/AppRouter";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <AppRouter />
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
