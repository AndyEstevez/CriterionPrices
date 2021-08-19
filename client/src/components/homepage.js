import React, { Component } from 'react';
import axios from 'axios';

export default class HomePage extends Component {
    constructor(props){
        super(props)
        this.state = {
            imageUrl: '',
        }
    }

    async componentDidMount() {
        await axios.get('/getImage')
            .then(response => { 
                this.setState({
                    imageUrl: response.data
                })
            })
    }

    render() {
        console.log(this.state.imageUrl)
        return (
            <div class="container">
                {this.state.imageUrl.length === 0  
                ? <div><h1 style={{textAlign: "center"}}>Loading</h1> <progress class="progress is-large is-info" max="100">Loading</progress></div>
                : <img style={{backgroundSize: "cover", height: "auto", width: "100%", position: "fixed", minHeight: "100%", top: "0", left: "0", zIndex: "1"}} src={this.state.imageUrl} alt="image"/>}
            </div>
        )
    }
}
