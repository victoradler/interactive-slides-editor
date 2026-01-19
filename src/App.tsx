import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/home/home';
import TeacherPage from './pages/teacher';
import StudentPage from './pages/student/student';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teacher" element={<TeacherPage />} />
        <Route path="/student/:sessionId" element={<StudentPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

