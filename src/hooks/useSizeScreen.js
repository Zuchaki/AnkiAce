import React, { useEffect, useState } from "react";

const useSizeScreen = (WrappedComponent) => {

        const [height, setHeight] = useState(window.innerHeight);
        const [width, setWidth] = useState(window.innerWidth);


        const updateSize = () => {
            setHeight(window.innerHeight);
            setWidth(window.innerWidth);
        }

        useEffect(() => {
            window.addEventListener('resize', updateSize);
            return () => window.removeEventListener('resize', updateSize);
        }, []);

        return[width, height];
    }

export default useSizeScreen;