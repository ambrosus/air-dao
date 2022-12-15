import {NavLink} from 'react-router-dom';
import UiButton from '../components/UiButton';
import {useEffect} from 'react';

const NotFound = () => {
  useEffect(() => {
    const footer = document.querySelector('.footer');
    footer.style.display = 'none';

    return () => {
      footer.style.display = 'block';
    }
  }, []);
  return (
    <div className="not-found-bg">
      <div className="container">
        <div className="content not-found">
          <span className="not-found__num">404</span>
          <p className="not-found__title">Page not found</p>
          <p className="not-found__text">
            The page you are looking for may have been
            moved, deleted, or possibly never existed
          </p>
          <UiButton withBorder>
            <NavLink to="/">Back to Home</NavLink>
          </UiButton>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
