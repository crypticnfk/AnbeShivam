import styles from '../styles/Footer.module.css';
function Footer() {
    return (
        <footer className={"w3-container w3-center w3-opacity "+ styles.footer}>
            <a href="https://github.com/crypticnfk/anbeshivam" target="_blank" ><i class="fa fa-github" style={{fontSize: 36}}></i></a>
            <p>All rights reserved <a target="_blank">@AnbeShivam</a></p>
        </footer>
    );
}

export default Footer;