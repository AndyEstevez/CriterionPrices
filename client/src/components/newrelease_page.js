import React, { Component } from 'react'
import axios from 'axios'
import Table from './Table'

export default class NewReleasePage extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
        }
    }
    
    async componentDidMount() {
        await axios.post('/newReleaseTitles')
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
