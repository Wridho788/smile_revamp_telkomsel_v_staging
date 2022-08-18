import React, { useState } from 'react'
import './App.css'
import {useAppDispatch, useAppSelector} from "../../redux/app/hooks";
import {Circle} from "@mui/icons-material";
import {IParams} from "../../redux/utils/IGeneral";
import {useCustomerTierListQuery} from "../../redux/features/customer/customer-api-slice";

function App() {
const filter: IParams = {
    limit : 6,
    skip: 0,
    filter:null,
    sort:null
}
    const { data = {data : [], total: 0}, isFetching } = useCustomerTierListQuery(filter);
if(isFetching){
    return <Circle/>
}
    return (
        <div className="App">
            <header className="App-header">

                <div>
                    <table>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Picture</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.data.map((item) => (
                            <tr key={item._id}>
                                {item._id}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>


                <p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                    {' | '}
                    <a
                        className="App-link"
                        href="https://vitejs.dev/guide/features.html"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Vite Docs
                    </a>
                </p>
            </header>
        </div>
    )
}

export default App
