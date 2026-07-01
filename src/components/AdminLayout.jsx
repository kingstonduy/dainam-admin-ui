import { useLanguage } from "../context/LanguageProvider";

export default function AdminLayout({ children }) {
    const { t } = useLanguage();

    return (
        <div className="admin-root flex flex-col min-h-screen bg-gray-50 md:flex-row">
            {/* Sidebar - hidden on mobile */}
            <aside
                className="hidden md:flex w-56 flex-shrink-0 flex-col"
                style={{ backgroundColor: "#1e6220" }}
            >
                <div className="px-4 py-6 border-b border-green-700">
                    <p className="text-white text-xs tracking-widest uppercase opacity-70">
                        {t.adminLabel}
                    </p>
                    <p className="text-white font-semibold text-sm mt-1 leading-tight">
                        Dainam Boutique Hotel
                    </p>
                </div>
                <nav className="flex-1 py-4">
                    <a
                        href="/admin"
                        className="flex items-center gap-3 px-4 py-3 text-white text-sm font-medium"
                        style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
                    >
                        <span>🎛️</span>
                        {t.pricingImageNav}
                    </a>
                </nav>
                <div className="px-4 py-4 border-t border-green-700">
                    <p
                        className="text-white text-xs"
                        style={{ color: "rgba(255,255,255,0.5)" }}
                    >
                        {t.footerNote}
                    </p>
                </div>
            </aside>

            {/* Main content */}
            <div className="flex-1 flex flex-col min-w-0">
                <header
                    className="px-4 md:px-6 py-3 md:py-4 flex items-center gap-3"
                    style={{ backgroundColor: "#1e6220" }}
                >
                    <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 bg-white"
                        style={{ color: "#1e6220" }}
                    >
                        D
                    </div>
                    <div className="flex flex-col flex-1 min-w-0">
                        <span className="font-semibold text-white text-sm leading-tight">
                            Dainam Boutique Hotel
                        </span>
                        <span className="text-white text-xs text-green-200 md:hidden">
                            {t.dashboard}
                        </span>
                    </div>
                    <span className="hidden md:inline text-sm font-medium text-green-200">
                        {t.pricingImageNav}
                    </span>
                </header>
                <main className="flex-1 overflow-auto p-4 md:p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
