import axios from 'axios';
import React, { Component } from 'react'
import Table from './Table'

export default class PreorderPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
        }
    }
    
    async componentDidMount() {
        await axios.post('/preorderTitles')
            .then(response => { console.log(response) 
                this.setState({
                    data: response.data
                })
            })
    }

    render() {
        console.log(this.state.data)

        return (
            <div>
                {this.state.data.length === 0
                ? <progress class="progress is-large is-info" max="100">60%</progress> 
                : <Table data={this.state.data}/>}
            </div>
        )
    }
}