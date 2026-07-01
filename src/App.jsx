import AdminLayout from "./components/AdminLayout.jsx";
import { LanguageProvider } from "./context/LanguageProvider.jsx";
import PricingImagePage from "./pages/PricingImagePage.jsx";
import "./index.css";
function App() {
    return (
        <LanguageProvider>
            <AdminLayout>
                <PricingImagePage />
            </AdminLayout>
        </LanguageProvider>
    );
}

export default App;
