// // src/ScrollToTop.tsx
// import { useEffect } from 'react';
// import { useLocation } from 'react-router-dom';

// const ScrollToTop = () => {
//   const { pathname } = useLocation();

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [pathname]);

//   return null;
// };

// export default ScrollToTop; 
// src/ScrollToTop.tsx
import { useEffect, useLayoutEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

const ScrollToTop = () => {
  const location = useLocation();
  const navigationType = useNavigationType();

  // Restore scroll position on back/forward navigation
  useLayoutEffect(() => {
    if (navigationType === 'POP') {
      const storedY = sessionStorage.getItem(`scroll-position:${location.key}`);
      if (storedY !== null) {
        window.scrollTo(0, parseInt(storedY));
      }
    } else {
      window.scrollTo(0, 0); // Scroll to top on new page load
    }
  }, [location, navigationType]);

  // Save scroll position when leaving the page
  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.setItem(`scroll-position:${location.key}`, window.scrollY.toString());
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      handleBeforeUnload(); // Save when component unmounts
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [location]);

  return null;
};

export default ScrollToTop;
