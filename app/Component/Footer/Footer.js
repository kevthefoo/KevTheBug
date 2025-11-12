export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex flex-col items-center justify-center border-t-2 bg-white py-4 transition duration-700 ease-linear dark:bg-neutral-900 dark:text-white">
      <div>© {currentYear} Kevin Foo. All rights reserved.</div>
    </footer>
  );
}
