import React, {useState} from 'react';

const [data,setData] = useState({
    "email": "hyewon0809@kaist.ac.kr",
    "guildInfo": ["madcamp","student"],
    "phone": "010-9021-0167",
    "profileImg": 0,
    "teamInfo": ["classA","classb","frontend"],
    "userId": "hyewon",
    "username": "HyewonLee"
});

const users = {
    data : data,
    setData : setData
};

export default users;