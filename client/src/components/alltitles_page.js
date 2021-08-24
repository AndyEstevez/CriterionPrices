import React, { Component } from 'react';
import api from '../api';
import FullTable from './FullTable';

export default class AllTitles extends Component {
    constructor(props){
        super(props)
        this.state = {
            data: [],
        }
    }

    async componentDidMount() {
        await api.get('/allTitles')
            .then(response => { 
                this.setState({
                    data: response.data
                })
            })
        await api.post('/updateTitles')
            .then(response => { console.log(response)
                this.setState({
                    data: response.data
                })
            })
    }

    render() {
        console.log(this.state.data)
        return (
            <div class="container">
                { this.state.data.length === 0 
                ? <div style={{textAlign: "center", fontSize: "22px"}}><h1 style={{textAlign: "center"}}>Loading</h1> <progress class="progress is-large is-info" max="100"></progress>Loading</div>
                : <FullTable data={this.state.data}/>}
            </div>
        )
    }
}
