"use client";
import Link from "next/link";
export default function Error({ reset }) {
  return (
    <div className="state-page">
      <h1>Let’s try that again.</h1>
      <p>This page couldn’t load.</p>
      <button onClick={reset}>Try again</button>
      <Link href="/">Back to the portfolio</Link>
    </div>
  );
}
