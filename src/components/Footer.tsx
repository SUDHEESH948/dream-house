import Image from 'next/image';
import Link from 'next/link';
import logo from '../../public/brand/dreamhouse-logo.png';

export function Footer() {
  return <footer className="dh-footer"><div className="dh-rail">
    <Link href="/" className="footer-logo" aria-label="DreamHouse home"><Image src={logo} alt="DreamHouse Architectural Engineering" sizes="(max-width: 767px) 120px, 220px" /></Link>
    <div className="dh-footer-grid"><div><p className="dh-footer-statement">Plans, spaces<br/>and the details<br/><em>in between.</em></p><p>Architectural Engineering<br/>Sulthan Bathery, Wayanad, Kerala</p></div>
      <nav aria-label="Footer navigation"><h2>Find your way</h2><Link href="/about/">About DreamHouse</Link><Link href="/services/">Our services</Link><Link href="/gallery/">Design</Link><Link href="/contact/">Get in touch</Link></nav>
      <div className="dh-footer-contact"><h2>Speak with us</h2><a href="tel:+919446731418">Mobile: 9446731418</a><a href="tel:+914936221770">Office: 04936 221770</a><a href="mailto:dreamhousesby@gmail.com">dreamhousesby@gmail.com</a></div>
    </div>
    <p className="dh-footer-wordmark" aria-hidden="true"><span className="dh-footer-wordmark-mask"><span className="dh-footer-wordmark-text">DREAMHOUSE</span></span></p>
    <div className="dh-footer-bottom">
      <p>© {new Date().getFullYear()} DreamHouse Architectural Engineering</p>
      <div><Link href="/contact/#privacy">How enquiries work</Link><Link href="/contact/#terms">Getting started</Link></div>
      <p className="dh-footer-credit">Developed by <a href="https://winshineinfotech.com/" target="_blank" rel="noopener noreferrer">winshineinfotech.com</a></p>
    </div>
  </div></footer>;
}
