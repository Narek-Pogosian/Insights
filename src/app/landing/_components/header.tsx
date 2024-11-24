import Logo from "@/components/logo";
import ThemeToggle from "@/components/theme-toggle";

function Header() {
  return (
    <header className="container flex h-14 items-center justify-between">
      <Logo />
      <ThemeToggle />
    </header>
  );
}

export default Header;
