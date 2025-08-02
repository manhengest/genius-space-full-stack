import { useState } from "react";

const useWindowWidth = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    return { windowWidth };
}

export default useWindowWidth;