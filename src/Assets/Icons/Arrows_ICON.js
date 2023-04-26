import React from "react";

const Arrow_next_ICON = () => {
    return(
        <>
        <svg style={{fill:"white"}} xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 96 960 960" width="40"><path d="m600 856-46.666-46.666 200-200.001H80v-66.666h673.334l-200-200.001L600 296l280 280-280 280Z"/></svg>
        </>
    )
}
const Arrow_back_ICON = () => {
    return(
        <>
        <svg style={{fill:"white"}} xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 96 960 960" width="40"><path d="M359.333 814.667 120 575.333 359.333 336l47.333 47.333L247.999 542H840v66.666H247.999l158.667 158.668-47.333 47.333Z"/></svg>
        </>
    )
}
export {Arrow_back_ICON, Arrow_next_ICON}
//<GoogleIcon className={style.googleIcon}/>