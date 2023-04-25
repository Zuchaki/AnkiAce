import React from "react";
import bcrypt from 'bcryptjs'

const usePassHash = (password) => {

    let a = bcrypt.hash(password, 8);
    return[a];

}

export default usePassHash;