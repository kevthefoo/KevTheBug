import Link from "next/link";
export default function NotFound() {
  return (
    <div className="state-page">
      <p>404</p>
      <h1>A little off the beaten path.</h1>
      <p>This page doesn’t exist.</p>
      <Link href="/">Back to Kevin’s portfolio</Link>
    </div>
  );
}
