function Header() {
    return (
        <div className="w3-top">
            <div className="w3-bar w3-red w3-card w3-left-align w3-large">
                <a className="w3-bar-item w3-button w3-hide-medium w3-hide-large w3-right w3-padding-large w3-hover-white w3-large w3-red" href="javascript:void(0);" onClick="myFunction()" title="Toggle Navigation Menu"><i className="fa fa-bars" /></a>
                <a href="#" className="w3-bar-item w3-button w3-padding-large w3-white">Anbe</a>
                <a href="#" className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white">Link 1</a>
                <a href="#" className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white">Link 2</a>
                <a href="#" className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white">Link 3</a>
                <a href="#" className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white">Link 4</a>
            </div>
            {/* Navbar on small screens */}
            <div id="navDemo" className="w3-bar-block w3-white w3-hide w3-hide-large w3-hide-medium w3-large">
                <a href="#" className="w3-bar-item w3-button w3-padding-large">Link 1</a>
                <a href="#" className="w3-bar-item w3-button w3-padding-large">Link 2</a>
                <a href="#" className="w3-bar-item w3-button w3-padding-large">Link 3</a>
                <a href="#" className="w3-bar-item w3-button w3-padding-large">Link 4</a>
            </div>
        </div>
    );
}

export default Header