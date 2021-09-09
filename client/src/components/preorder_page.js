import React, { Component } from 'react'
import api from '../api';
import Table from './Table'

export default class PreorderPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            isLoading: false
        }
    }
    
    async componentDidMount() {
        await api.get('/getPreorders')
            .then(response => { console.log(response) 
                this.setState({
                    data: response.data
                })
            })
    }

    async updateTable() {
        this.setState({
            isLoading: true
        })
        this.updateData();
    }

    async updateData() {
        await api.post('/updatePreorders')
            .then(response => { console.log(response) 
                this.setState({
                    data: response.data, 
                    isLoading: false
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
                { this.state.isLoading 
                ? <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                : <></>
                }
                </button>
                <Table style={{display: "inline-block"}} data={this.state.data}/>
            </div>
        )
    }
}
