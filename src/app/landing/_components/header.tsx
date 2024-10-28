import Logo from "@/components/logo";
import ThemeToggle from "@/components/theme-toggle";

function Header() {
  return (
    <header className="fixed left-0 top-0 z-50 w-full">
      <div className="container flex h-14 items-center justify-between">
        <Logo />
        <ThemeToggle />
      </div>
    </header>
  );
}

export default Header;
