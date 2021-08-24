import React, { Component } from 'react'
import api from '../api';
import Table from './Table'

export default class PreorderPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
        }
    }
    
    async componentDidMount() {
        await api.post('/preorderTitles')
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
                ? <div style={{textAlign: "center", fontSize: "22px"}}><h1 style={{textAlign: "center"}}>Loading</h1> <progress class="progress is-large is-info" max="100"></progress>Loading</div>
                : <Table data={this.state.data}/>}
            </div>
        )
    }
}
