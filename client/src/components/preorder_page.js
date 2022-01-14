import React, { useState, useEffect } from 'react'
import api from '../api';
import Table from './Table'

const PreorderPage = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        api.get('/getPreorders')
            .then(response => { 
                setData(response.data)
                setIsLoading(false)
            })
    })
    
    function updateTable() {
        setIsLoading(true)
        api.post('/updatePreorders')
            .then(response => { 
                setData(response.data)
                setIsLoading(false)
            })
    }

    return (
        <div>
            <button type="button" class="btn btn-success btn-lg" 
                style={{display: "block", margin: "auto", marginTop: "100px"}}
                onClick={updateTable}>
                Check For Update
            </button>
            <Table style={{display: "inline-block"}} data={data} dataNotLoaded={isLoading}/>
        </div>
    );
}

export default PreorderPage;