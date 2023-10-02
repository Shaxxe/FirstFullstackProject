import logoImage from '../static/image/exit.png';
import Icon1 from '../static/image/1.png';
import Icon2 from '../static/image/2.png';
import Icon3 from '../static/image/3.png';

const Header = ({username}) => {

  return (
    <header className="page-header">
      <div className="container">
        <div className="navbar">
          <h1>
            <a href="/">Blog</a>
          </h1>
          <div className="icon-container">
            {username && (
              <>
                <a href="/blog/create">
                  <img src={Icon1} alt="Icon 1" width="35" height="35" />
                </a>
                  <>
                    <a href="/Profile">
                      <p>{username}</p>
                    </a>
                  </>
                    <a href="/protected">
                      <img src={logoImage} alt="Icon exit" width="25" height="25" />
                    </a>
              </>
            )}
            {!username && (
              <>
                <a href="/login">
                  <img src={Icon2} alt="Icon 2" width="25" height="25" />
                </a>
                <a href="/register">
                  <img src={Icon3} alt="Icon 3" width="25" height="25" />
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
