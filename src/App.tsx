import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/home/home';
import TeacherPage from './pages/teacher';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teacher" element={<TeacherPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

