import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div>
      <h1>404 - Not Found</h1>
      <p>Sorry, the page you are looking for might be in another castle.</p>
      <Link to="/">Go Home</Link>
    </div>
  );
};

export default NotFound;
