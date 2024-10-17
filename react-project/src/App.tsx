import { ReactNode } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Welcome from "./Welcome";
import Home from "./Home";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";


function App(): ReactNode {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Welcome />,
    },
    {
      path: '/home',
      element: <Home />,
    },
  ])
    
  return (
    <>
     <Header />
      <RouterProvider router={router} />
      <Footer />
    </>
  );
}
export default App;