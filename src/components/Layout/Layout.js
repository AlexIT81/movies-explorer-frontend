import './Layout.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

export default function Layout({ loggedIn, children }) {
  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className='main'>{children}</main>
      <Footer />
    </>
  );
}
