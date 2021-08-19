import React, { Component } from 'react';
import axios from 'axios';
import FullTable from './FullTable';

export default class HomePage extends Component {
    constructor(props){
        super(props)
        this.state = {
            data: [],
        }
    }

    async componentDidMount() {
        await axios.get('/allTitles')
            .then(response => { 
                this.setState({
                    data: response.data
                })
            })
        await axios.post('/updateTitles')
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
                ? <progress class="progress is-large is-info" max="100">60%</progress>
                : <FullTable data={this.state.data}/>}
            </div>
        )
    }
}
