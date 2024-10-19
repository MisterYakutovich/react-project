import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Welcome from './Welcome';
import Home from './Home';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
export default App;
