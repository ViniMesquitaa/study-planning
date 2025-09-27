import {
  BookOpen,
  Clock,
  BarChart3,
  LogOut,
  ArrowRight,
  HomeIcon,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation, Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";

type HeaderProps = {
  isPublic?: boolean;
};

const Header = ({ isPublic = false }: HeaderProps) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Links de navegação para reutilização
  const navLinks = [
    { path: "/landing", icon: HomeIcon, label: "Tela Inicial" },
    { path: "/dashboard", icon: BarChart3, label: "Dashboard" },
    { path: "/subjects", icon: BookOpen, label: "Matérias" },
    { path: "/pomodoro", icon: Clock, label: "Pomodoro" },
  ];

  return (
    <>
      {!isPublic ? (
        // Header para usuários autenticados
        <header className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm relative">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
            <div className="grid grid-cols-3 items-center">
              {/* Logo */}
              <div className="flex items-center">
                <div className="flex items-center">
                  <Link to="/" className="flex items-center gap-3 group">
                    <img
                      src="./logo.png"
                      alt="Logo"
                      className="h-8 w-25 transition-transform duration-300 group-hover:scale-110"
                    />
                  </Link>
                </div>
              </div>

              {/* Navegação central - Desktop */}
              {!isMobile && (
                <nav className="flex justify-center gap-1">
                  {navLinks.map((link) => (
                    <Button
                      key={link.path}
                      variant={isActive(link.path) ? "default" : "ghost"}
                      size="sm"
                      className="gap-2 transition-all duration-200 hover:scale-105"
                      asChild
                    >
                      <Link to={link.path}>
                        <link.icon className="w-4 h-4" />
                        <span>{link.label}</span>
                      </Link>
                    </Button>
                  ))}
                </nav>
              )}

              {/* Ações à direita */}
              <div className="flex justify-end items-center gap-3">
                <ThemeToggle />

                {isMobile ? (
                  // Menu Hamburger para mobile
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleMobileMenu}
                    className="relative z-50"
                  >
                    {isMobileMenuOpen ? (
                      <X className="w-5 h-5" />
                    ) : (
                      <Menu className="w-5 h-5" />
                    )}
                  </Button>
                ) : (
                  // Botão Sair para desktop
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-2 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sair</span>
                  </Button>
                )}
              </div>

              {/* Menu Mobile Overlay */}
              {isMobile && isMobileMenuOpen && (
                <>
                  {/* Backdrop */}
                  <div
                    className="fixed inset-0 bg-black/50 z-40"
                    onClick={closeMobileMenu}
                  />

                  {/* Menu Mobile */}
                  <div className="fixed top-0 right-0 h-full w-80 max-w-full bg-white dark:bg-gray-900 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out">
                    <div className="p-6">
                      {/* Cabeçalho do menu mobile */}
                      <div className="flex items-center justify-between mb-8">
                        <span className="text-lg font-semibold text-gray-900 dark:text-white">
                          Menu
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={closeMobileMenu}
                        >
                          <X className="w-5 h-5" />
                        </Button>
                      </div>

                      {/* Links de navegação */}
                      <nav className="space-y-2">
                        {navLinks.map((link) => (
                          <Button
                            key={link.path}
                            variant={isActive(link.path) ? "default" : "ghost"}
                            size="lg"
                            className="w-full justify-start gap-3 text-base"
                            asChild
                            onClick={closeMobileMenu}
                          >
                            <Link to={link.path}>
                              <link.icon className="w-5 h-5" />
                              {link.label}
                            </Link>
                          </Button>
                        ))}
                      </nav>

                      {/* Botão Sair no mobile */}
                      <div className="absolute bottom-6 left-6 right-6">
                        <Button
                          variant="outline"
                          size="lg"
                          className="w-full gap-3 justify-start text-red-600 dark:text-red-400 border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-950"
                        >
                          <LogOut className="w-5 h-5" />
                          Sair
                        </Button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>
      ) : (
        // Header público
        <header className="w-full py-4 border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50 shadow-lg">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-3 items-center">
              {/* Logo */}
              <div className="flex items-center">
                <Link to="/" className="flex items-center gap-3 group">
                  <img
                    src="./logo.png"
                    alt="Logo"
                    className="h-10 w-10 transition-transform duration-300 group-hover:scale-110"
                  />
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                    StudyFlow
                  </span>
                </Link>
              </div>

              {/* Espaço central */}
              <div className="flex justify-center">
                {!isMobile && (
                  <nav className="flex gap-6 text-sm font-medium text-gray-600 dark:text-gray-300">
                    {/* Links públicos podem ser adicionados aqui */}
                  </nav>
                )}
              </div>

              {/* Ações à direita */}
              <div className="flex justify-end items-center gap-4">
                <ThemeToggle />
                <Button
                  variant="outline"
                  className="gap-2 border-blue-200 dark:border-gray-600 text-blue-600 dark:text-white hover:bg-blue-50 dark:hover:bg-gray-800 transition-all duration-200 hover:scale-105"
                  asChild
                >
                  <Link to="/login" className="flex items-center gap-2">
                    {!isMobile && "Fazer Login"}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>

                {/* Menu Hamburger para versão pública mobile (se necessário) */}
                {isMobile && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleMobileMenu}
                    className="relative z-50"
                  >
                    {isMobileMenuOpen ? (
                      <X className="w-5 h-5" />
                    ) : (
                      <Menu className="w-5 h-5" />
                    )}
                  </Button>
                )}
              </div>

              {/* Menu Mobile Overlay para versão pública */}
              {isMobile && isMobileMenuOpen && isPublic && (
                <>
                  <div
                    className="fixed inset-0 bg-black/50 z-40"
                    onClick={closeMobileMenu}
                  />

                  <div className="fixed top-0 right-0 h-full w-80 max-w-full bg-white dark:bg-gray-900 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-8">
                        <span className="text-lg font-semibold text-gray-900 dark:text-white">
                          Navegação
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={closeMobileMenu}
                        >
                          <X className="w-5 h-5" />
                        </Button>
                      </div>

                      {/* Links públicos mobile podem ser adicionados aqui */}
                      <nav className="space-y-4">
                        <Button
                          variant="outline"
                          size="lg"
                          className="w-full justify-start gap-3"
                          asChild
                          onClick={closeMobileMenu}
                        >
                          <Link to="/login">
                            <ArrowRight className="w-5 h-5" />
                            Fazer Login
                          </Link>
                        </Button>
                      </nav>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>
      )}
    </>
  );
};

export default Header;
