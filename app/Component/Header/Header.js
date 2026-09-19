"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LuTerminal,
  LuArrowUpRight,
  LuCode,
  LuUserRound,
  LuMail,
  LuBookOpen,
} from "react-icons/lu";

const navigation = [
  { label: "about", id: "about", icon: LuUserRound },
  { label: "projects", id: "showcase", icon: LuCode },
  { label: "journal", id: "blog", icon: LuBookOpen },
  { label: "contact", id: "contact", icon: LuMail },
];
function SectionLink({ href, children, ...props }) {
  const pathname = usePathname();
  return pathname === "/" && href.includes("#") ? (
    <a href={href} {...props}>
      {children}
    </a>
  ) : (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
}
export default function Header() {
  const pathname = usePathname();
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="site-header">
        <div className="header-inner">
          <Link className="wordmark" href="/" aria-label="Kevin Foo home">
            <span className="logo-prompt">&gt;_</span> kevthefoo
            <span className="cursor-mini" />
          </Link>
          <nav aria-label="Main navigation">
            {navigation.map(({ label, id }) => (
              <SectionLink
                key={id}
                href={id === "blog" ? "/blog" : `/#${id}`}
                aria-current={
                  id === "blog" && pathname.startsWith("/blog")
                    ? "page"
                    : undefined
                }
              >
                <span className="nav-slash">/</span>
                {label}
              </SectionLink>
            ))}
          </nav>
          <a
            className="header-github"
            href="https://github.com/kevthefoo"
            target="_blank"
            rel="noopener noreferrer"
          >
            github <LuArrowUpRight />
          </a>
        </div>
      </header>
      <nav className="mobile-nav" aria-label="Mobile navigation">
        <SectionLink href="/#home">
          <LuTerminal />
          <span>home</span>
        </SectionLink>
        {navigation.map(({ label, id, icon: Icon }) => (
          <SectionLink
            key={id}
            href={id === "blog" ? "/blog" : `/#${id}`}
            aria-current={
              id === "blog" && pathname.startsWith("/blog") ? "page" : undefined
            }
          >
            <Icon />
            <span>{label}</span>
          </SectionLink>
        ))}
      </nav>
    </>
  );
}
