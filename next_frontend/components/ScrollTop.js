import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

// ==============================|| NAVIGATION - SCROLL TO TOP ||============================== //

const ScrollTop = ({ children }) => {
    const router = useRouter();
    //const location = router.asPath;
    const { pathname } = router;
    console.log ("Pathname is ", pathname);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }, [pathname]);

    return children || null;
};

ScrollTop.propTypes = {
    children: PropTypes.node
};

export default ScrollTop;
