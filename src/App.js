import { BrowserRouter, Routes, Route } from "react-router-dom";
// pages
import UserCreatePage from "./pages/UserCreatePage";
import UserEditPage from "./pages/UserEditPage";

const App = () => {
  return (
    <BrowserRouter>
      <div className='App'>
        <Routes>
          {/* Create data page */}
          <Route
            path='/'
            element={<UserCreatePage />}
          />
          <Route
            path='/edit/:id'
            element={<UserEditPage />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
