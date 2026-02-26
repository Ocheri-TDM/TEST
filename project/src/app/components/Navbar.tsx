import { Brain, LogOut, User, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface NavbarProps {
  role?: "student" | "employer";
  userName?: string;
}

export function Navbar({ role, userName }: NavbarProps) {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const handleLogout = () => {
    navigate("/");
  };

  const changeLanguage = () => {
    const nextLang = i18n.language === "en" ? "ru" : i18n.language === "ru" ? "kz" : "en";
    i18n.changeLanguage(nextLang);
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Логотип и название */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-xl text-gray-900">CareerMatch AI</h1>
            {role && (
              <p className="text-xs text-gray-500 capitalize">{role} Portal</p>
            )}
          </div>
        </div>

        {/* Пользовательский блок + кнопка смены языка */}
        <div className="flex items-center gap-2">
          {userName && (
            <>
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
                <User className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">{userName}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                {t("logout")}
              </button>
            </>
          )}

          {/* Кнопка смены языка — всегда видна */}
          <button
            onClick={changeLanguage}
            className="ml-2 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            title={t("changeLanguage")}
          >
            <Globe className="w-4 h-4 text-gray-700" />
          </button>
        </div>
      </div>
    </nav>
  );
}