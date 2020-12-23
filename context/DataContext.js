import React, {useEffect, useState} from 'react';
import ApiReq from "../helpers/ApiReq";
import axios from "axios";


export const DataContext = React.createContext();

const DataContextProvider = (props) => {
    const [data, setData] = useState({

    });
    const config = {
        headers: {'Content-Type': 'application/json'},
        method: 'Get',
        url: 'https://api.subkhoone.com/api/use_types',
    };
    useEffect(async ()=>{
        let use_types = await ApiReq(config)
        use_types = use_types.data.data[0]
        setData({...data, use_types })
    },[])

    return (
        <DataContext.Provider value={{data} }>
            {props.children}
        </DataContext.Provider>
    );
};

export default DataContextProvider;