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
        // Header para usuários autenticados - Modernizado
        <header className="glass sticky top-0 z-50 border-b shadow-lg backdrop-blur-xl transition-smooth">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
            <div className="grid grid-cols-3 items-center">
              {/* Logo */}
              <div className="flex items-center">
                <Link to="/" className="flex items-center gap-3 group">
                  <img
                    src="./logo.png"
                    alt="Logo"
                    className="h-10 w-auto transition-all duration-300 group-hover:scale-110 drop-shadow-lg"
                  />
                </Link>
              </div>

              {/* Navegação central - Desktop Modernizada */}
              {!isMobile && (
                <nav className="flex justify-center gap-2">
                  {navLinks.map((link) => (
                    <Button
                      key={link.path}
                      variant={isActive(link.path) ? "default" : "ghost"}
                      size="sm"
                      className={`gap-2 transition-all duration-300 hover:scale-105 ${
                        isActive(link.path)
                          ? "bg-gradient-primary text-white shadow-lg shadow-primary/30"
                          : "hover:bg-secondary"
                      }`}
                      asChild
                    >
                      <Link to={link.path}>
                        <link.icon className="w-4 h-4" />
                        <span className="font-medium">{link.label}</span>
                      </Link>
                    </Button>
                  ))}
                </nav>
              )}

              {/* Ações à direita - Modernizadas */}
              <div className="flex justify-end items-center gap-3">
                <ThemeToggle />

                {isMobile ? (
                  // Menu Hamburger para mobile
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleMobileMenu}
                    className="relative z-50 hover:bg-secondary transition-all duration-300"
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
                    className="gap-2 text-muted-foreground hover:text-destructive hover:bg-destructive-light transition-all duration-300"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="font-medium">Sair</span>
                  </Button>
                )}
              </div>

              {/* Menu Mobile Overlay - Modernizado */}
              {isMobile && isMobileMenuOpen && (
                <>
                  {/* Backdrop com blur */}
                  <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-fade-in"
                    onClick={closeMobileMenu}
                  />

                  {/* Menu Mobile */}
                  <div className="fixed top-0 right-0 h-full w-80 max-w-full card-gradient shadow-2xl z-50 animate-slide-in-right border-l-2 border-border">
                    <div className="p-6 h-full flex flex-col">
                      {/* Cabeçalho do menu mobile */}
                      <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
                        <span className="text-xl font-bold text-foreground">
                          Menu
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={closeMobileMenu}
                          className="hover:bg-secondary rounded-lg"
                        >
                          <X className="w-5 h-5" />
                        </Button>
                      </div>

                      {/* Links de navegação */}
                      <nav className="space-y-2 flex-1">
                        {navLinks.map((link) => (
                          <Button
                            key={link.path}
                            variant={isActive(link.path) ? "default" : "ghost"}
                            size="lg"
                            className={`w-full justify-start gap-3 text-base transition-all duration-300 ${
                              isActive(link.path)
                                ? "bg-gradient-primary text-white shadow-lg"
                                : "hover:bg-secondary"
                            }`}
                            asChild
                            onClick={closeMobileMenu}
                          >
                            <Link to={link.path}>
                              <link.icon className="w-5 h-5" />
                              <span className="font-medium">{link.label}</span>
                            </Link>
                          </Button>
                        ))}
                      </nav>

                      {/* Botão Sair no mobile */}
                      <div className="pt-4 border-t border-border">
                        <Button
                          variant="outline"
                          size="lg"
                          className="w-full gap-3 justify-start text-destructive border-destructive/30 hover:bg-destructive-light hover:border-destructive transition-all duration-300 font-semibold"
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
        // Header público - Modernizado
        <header className="glass sticky top-0 z-50 border-b shadow-lg backdrop-blur-xl transition-smooth">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="grid grid-cols-3 items-center">
              {/* Logo */}
              <div className="flex items-center">
                <Link to="/" className="flex items-center gap-3 group">
                  <img
                    src="./logo.png"
                    alt="Logo"
                    className="h-12 w-auto transition-all duration-300 group-hover:scale-110 drop-shadow-lg"
                  />
                </Link>
              </div>

              {/* Espaço central */}
              <div className="flex justify-center">
                {!isMobile && (
                  <nav className="flex gap-6 text-sm font-semibold text-muted-foreground">
                    {/* Links públicos podem ser adicionados aqui */}
                  </nav>
                )}
              </div>

              {/* Ações à direita */}
              <div className="flex justify-end items-center gap-4">
                <ThemeToggle />
                <Button
                  variant="outline"
                  className="gap-2 border-primary/30 bg-primary/5 text-primary hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 hover:scale-105 shadow-md font-semibold"
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

              {/* Menu Mobile Overlay para versão pública - Modernizado */}
              {isMobile && isMobileMenuOpen && isPublic && (
                <>
                  <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-fade-in"
                    onClick={closeMobileMenu}
                  />

                  <div className="fixed top-0 right-0 h-full w-80 max-w-full card-gradient shadow-2xl z-50 animate-slide-in-right border-l-2 border-border">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
                        <span className="text-xl font-bold text-foreground">
                          Navegação
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={closeMobileMenu}
                          className="hover:bg-secondary rounded-lg"
                        >
                          <X className="w-5 h-5" />
                        </Button>
                      </div>

                      {/* Links públicos mobile */}
                      <nav className="space-y-4">
                        <Button
                          variant="outline"
                          size="lg"
                          className="w-full justify-start gap-3 border-primary/30 bg-primary/5 text-primary hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 font-semibold"
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
