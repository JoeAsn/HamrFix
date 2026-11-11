import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { AuthProvider } from "./auth/AuthContext"
import { Layout } from "./components/Layout"
import { AboutPage } from "./pages/AboutPage"
import { BrowsePage } from "./pages/BrowsePage"
import { ContactPage } from "./pages/ContactPage"
import { EditProfessionalPage } from "./pages/EditProfessionalPage"
import { EditResidentPage } from "./pages/EditResidentPage"
import { HomePage } from "./pages/HomePage"
import { LoginPage } from "./pages/LoginPage"
import { NotFoundPage } from "./pages/NotFoundPage"
import { ProfessionalProfilePage } from "./pages/ProfessionalProfilePage"
import { ProfessionalWorkspacePage } from "./pages/ProfessionalWorkspacePage"
import { RegisterPage } from "./pages/RegisterPage"
import { ResidentAccountPage } from "./pages/ResidentAccountPage"

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/browse" element={<BrowsePage />} />
            <Route path="/professionals/:id" element={<ProfessionalProfilePage />} />
            <Route path="/professionals/:id/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/account" element={<ResidentAccountPage />} />
            <Route path="/account/edit" element={<EditResidentPage />} />
            <Route path="/professional" element={<ProfessionalWorkspacePage />} />
            <Route path="/professional/edit" element={<EditProfessionalPage />} />
            <Route path="/signup" element={<Navigate to="/register" replace />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
