import Header from './Header';

const Layout = ({ children }) => (
  <div className="main-layout">
    <Header />
    { children }
  </div>
);

export default Layout;