import { LuArrowUpRight } from "react-icons/lu";
export default function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <span>
          <i /> All systems curious.
        </span>
        <span>© {new Date().getFullYear()} Kevin Foo</span>
        <a href="#main-content">
          back to top <LuArrowUpRight />
        </a>
      </div>
      <p>Made of code, coffee, and a healthy amount of curiosity.</p>
    </footer>
  );
}
