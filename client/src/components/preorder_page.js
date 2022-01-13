import React, { Component } from 'react'
import api from '../api';
import Table from './Table'

export default class PreorderPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            dataNotLoaded: true
        }
    }
    
    async componentDidMount() {
        await api.get('/getPreorders')
            .then(response => { console.log(response) 
                this.setState({
                    data: response.data,
                    dataNotLoaded: false
                })
            })
    }

    async updateTable() {
        this.setState({
            dataNotLoaded: true
        })
        this.updateData();
    }

    async updateData() {
        await api.post('/updatePreorders')
            .then(response => { console.log(response) 
                this.setState({
                    data: response.data, 
                    dataNotLoaded: false
                })
            })
    }

    render() {
        return (
            <div>
                <button type="button" class="btn btn-success btn-lg" 
                style={{display: "block", margin: "auto", marginTop: "100px"}}
                onClick={this.updateTable.bind(this)}>
                Check For Update
                </button>
                <Table style={{display: "inline-block"}} data={this.state.data} dataNotLoaded={this.state.dataNotLoaded}/>
            </div>
        )
    }
}
