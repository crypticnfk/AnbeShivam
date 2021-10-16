import Header from './header'
import Footer from './footer'
import Header2 from './Header2';
import styles from '../styles/Layout.module.css'

function Layout({ children }) {
    return (
        <div className={styles.layout}>
            <Header2 />
            {children}
            <Footer />
        </div>
    );
}

export default Layout;