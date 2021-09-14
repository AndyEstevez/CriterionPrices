import React, { Component } from 'react';
import api from '../api';

export default class HomePage extends Component {
    constructor(props){
        super(props)
        this.state = {
            data: '',
        }
    }

    async componentDidMount() {
        await api.get('/getInfo')
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
                <article style={{backgroundImage: this.state.data.imageUrl 
                    ? `url(${this.state.data.imageUrl})` 
                    : this.state.data.fullImage 
                        ? `url(${this.state.data.fullImage})` 
                        : `url(${this.state.data.banner})`, 
                position: "relative", width: "100%", height: "100vh", display: "flex",
                backgroundSize: "cover", backgroundRepeat: "no-repeat", margin: "auto"}}>
                    <a href={this.state.data.hrefs[0]} target="_blank"  rel="noreferrer" style={{textDecoration: "none", margin: "auto", color: "white"}}>
                        <div>
                            {this.state.data.header
                            ?   <div>
                                <p>{this.state.data.pLabel}</p>
                                <h1 style={{textAlign: "center"}}>{this.state.data.header}</h1>
                                </div>
                            : this.state.data.post_summary 
                                ? <div>
                                    <h1>
                                        <span style={{display: "block"}}>
                                            <span style={{color: "rgb(239, 186, 145)"}}>{this.state.data.lines[0]}:</span>
                                            <span style={{color: "rgb(239, 186, 145)"}}></span>
                                            <span>{this.state.data.lines[1]}</span>
                                        </span>
                                    </h1>
                                    <div style={{fontSize: "20px", lineHeight: "26px", fontFamily: "Mercury Text G1 A,Mercury Text G1 B"}}>
                                        {this.state.data.post_summary}
                                    </div>
                                </div> 
                                : <div><img src={this.state.data.image} alt="banner"/></div>}
                        </div>
                        <div>
                            <button type="button" class="btn btn-light btn-lg btn-block" 
                            href={this.state.data.hrefs[0]} target="_blank"  rel="noreferrer" style={{margin: "auto", display: "block", marginTop: "50px"}}>
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
