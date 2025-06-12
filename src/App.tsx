import { Route, Routes } from "react-router-dom";
import { MainLayout } from "./layout/main-layout";
import router from "./router/router";
import { Login } from "./pages/auth/login";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="bg-[#f8f8f8]">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/app" element={<MainLayout />}>
          {router.map(({ path, element: Page }, index) => (
            <Route
              key={index}
              index={!path ? true : false}
              path={path}
              element={<Page />}
            />
          ))}
        </Route>
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default App;
