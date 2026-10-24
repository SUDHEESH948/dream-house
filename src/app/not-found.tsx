import Link from 'next/link';
export default function NotFound() {
  return <section className="not-found"><p>404</p><h1>A different direction.</h1><Link href="/">Return home</Link></section>;
}
