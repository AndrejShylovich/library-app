import { AppRouter } from "./routes/AppRouter";
import { UserInitializer } from "./providers/UserInitializer";

import "./styles/App.css";

function App() {
  return (
    <UserInitializer>
      <AppRouter />
    </UserInitializer>
  );
}

export default App;
