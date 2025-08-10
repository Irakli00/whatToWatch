import Logo from "./Logo";

function Header() {
  return (
    <header className="bg-[var(--dark-blue)]">
      <div className="container flex items-center h-[100px]">
        <Logo height={80} width={80} type="light"></Logo>
        <h1 className="h-min font-['Rubik'] text-white ">What To watch</h1>
      </div>
    </header>
  );
}

export default Header;
