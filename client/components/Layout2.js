import Header from './header'
import Footer from './footer'
import Header2 from './Header2';
import styles from '../styles/Layout.module.css'
import Footer2 from './Footer2';

function Layout2({ children }) {
    return (
        <div className={styles.layout}>
            <Header2 />
            {children}
            <Footer2/>
        </div>
    );
}

export default Layout2;