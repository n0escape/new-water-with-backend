import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash.substr(1);
    const element = document.getElementById(hash);
    // after update page if it has hash
    if (element) { //scroll to hash
      element.scrollIntoView({ behavior: 'smooth' });
    } else { //scroll to the top of page
      document.documentElement.scrollTop = 0; // For modern browsers
      document.body.scrollTop = 0; // For older browsers
    }
  }, [location]);
  
  return null;
}

export default ScrollToHash;