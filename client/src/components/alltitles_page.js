import React, { useState, useEffect } from 'react'
import api from '../api';
import FullTable from './FullTable'

const AllTitles = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        api.get('/allTitles')
            .then(response => { 
                setData(response.data)
                setIsLoading(false)
            })
    })
    
    function updateTable() {
        setIsLoading(true)
        api.post('/updateTitles')
            .then(response => {  
                setData(response.data)
                setIsLoading(false)
            })
    }
    
    return (
        <div class="container">
            <button type="button" class="btn btn-success btn-lg" 
                style={{display: "block", margin: "auto", marginTop: "100px"}}
                onClick={updateTable}>
                Check For Update
            </button>
            <FullTable style={{display: "inline-block"}} data={data} dataNotLoaded={isLoading}/>
        </div>
    );
}

export default AllTitles;