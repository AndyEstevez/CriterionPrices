import React, { Component } from 'react';
import axios from 'axios';

export default class HomePage extends Component {
    constructor(props){
        super(props)
        this.state = {
            data: '',
        }
    }

    async componentDidMount() {
        await axios.get('/getInfo')
            .then(response => { 
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
                ? <div style={{textAlign: "center", fontSize: "22px", alignItems: "center", justifyContent: "center"}} class="container">
                    <h1 style={{textAlign: "center"}}>Loading</h1> 
                    <progress class="progress is-large is-info" max="100"></progress>
                    Loading
                 </div>
                
                : 
                <article style={{backgroundImage: `url(${this.state.data.imageUrl})`, 
                position: "relative", width: "100%", height: "100vh", display: "flex",
                backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", margin: "auto"}}>
                    <a href={this.state.data.hrefs[0]} target="_blank"  rel="noreferrer" style={{textDecoration: "none", margin: "auto", color: "white"}}>
                        <div>
                            <div>
                                <p>{this.state.data.pLabel}</p>
                                <h1 style={{textAlign: "center"}}>{this.state.data.header}</h1>
                            </div>
                        </div>
                        <div>
                            <button type="button" class="btn btn-light btn-lg btn-block" 
                            href={this.state.data.hrefs[0]} target="_blank"  rel="noreferrer" style={{margin: "auto", display: "block"}}>
                                {this.state.data.buttonText}
                            </button>
                        </div>
                    </a>
                </article>    
                }
            </div>
        )
    }
}
