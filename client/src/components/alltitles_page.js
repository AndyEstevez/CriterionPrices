import React, { Component } from 'react';
import api from '../api';
import FullTable from './FullTable';

export default class AllTitles extends Component {
    constructor(props){
        super(props)
        this.state = {
            data: [],
            isLoading: false
        }
    }

    async componentDidMount() {
        await api.get('/allTitles')
            .then(response => { 
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
        await api.post('/updateTitles')
            .then(response => { console.log(response) 
                this.setState({
                    data: response.data, 
                    isLoading: false
                })
            })
    }

    render() {
        console.log(this.state.data)
        return (
            <div class="container">
                <button type="button" class="btn btn-success btn-lg" 
                style={{display: "block", margin: "auto", marginTop: "100px"}}
                onClick={this.updateTable.bind(this)}>
                Check For Update
                { this.state.isLoading 
                ? <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                : <></>
                }
                </button>

                <FullTable style={{display: "inline-block"}} data={this.state.data}/>
            </div>
        )
    }
}
