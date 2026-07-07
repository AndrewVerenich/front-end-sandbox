import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import ServicesPage from './pages/ServicesPage';
import SpecialistsPage from './pages/SpecialistsPage';
import BookPage from './pages/BookPage';
import ConfirmationPage from './pages/ConfirmationPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<ServicesPage />} />
        <Route path="services/:serviceId" element={<SpecialistsPage />} />
        <Route path="specialists/:specialistId" element={<BookPage />} />
        <Route path="appointments/:id" element={<ConfirmationPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
