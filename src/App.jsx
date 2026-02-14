import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { WishlistProvider } from "./services/WishlistContext";

function App() {
  return (
    <WishlistProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </WishlistProvider>
  );
}

export default App;
