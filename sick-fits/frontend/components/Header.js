import Nav from './Nav';

const Header = () => (
    <div>
        <div className="bar">
            <a href="/">Sickk Fits</a>
        </div>
        <Nav />
        <div className="sub-bar">
            <p>Search</p>
        </div>
        <div>Cart</div>
    </div>
)

export default Header;