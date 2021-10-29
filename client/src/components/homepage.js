import React, { Component } from 'react';
import api from '../api';

export default class HomePage extends Component {
    constructor(props){
        super(props)
        this.state = {
            data: '',
            hrefs:       localStorage.getItem('hrefs') ? localStorage.getItem('hrefs') : '',
            imageUrl:    localStorage.getItem('imageUrl') ? localStorage.getItem('imageUrl') : '',
            fullImage:   localStorage.getItem('fullImage') ? localStorage.getItem('fullImage') : '',
            banner:      localStorage.getItem('banner') ? localStorage.getItem('banner') : '',
            header:      localStorage.getItem('header') ? localStorage.getItem('header') : '',
            pLabel:      localStorage.getItem('pLabel') ? localStorage.getItem('pLabel') : '',
            postSummary: localStorage.getItem('postSummary') ? localStorage.getItem('postSummary') : '',
            lines:       localStorage.getItem('lines') ? localStorage.getItem('lines') : [],
            image:       localStorage.getItem('image') ? localStorage.getItem('image') : '',
            buttonText:  localStorage.getItem('buttonText') ? localStorage.getItem('buttonText') : ''
        }
    }

    async componentDidMount() {
        await api.get('/getInfo')
            .then(response => { 
                this.setState({
                    data: response.data,
                    hrefs: response.data.hrefs[0],
                    imageUrl: response.data.imageUrl ? response.data.imageUrl : '',
                    fullImage: response.data.fullImage ? response.data.fullImage : '',
                    banner: response.data.banner ? response.data.banner : '',
                    header: response.data.header ? response.data.header : '',
                    pLabel: response.data.pLabel ? response.data.pLabel : '',
                    postSummary: response.data.post_summary ? response.data.post_summary : '',
                    lines: response.data.lines ? response.data.lines : '',
                    image: response.data.image ? response.data.image : '', 
                    buttonText: response.data.buttonText
                })
                 
                    localStorage.setItem('hrefs', this.state.hrefs)
                    localStorage.setItem('imageUrl', this.state.imageUrl)
                    localStorage.setItem('fullImage', this.state.fullImage)
                    localStorage.setItem('banner', this.state.banner)
                    localStorage.setItem('header', this.state.header)
                    localStorage.setItem('pLabel', this.state.pLabel)
                    localStorage.setItem('postSummary', this.state.postSummary)
                    localStorage.setItem('lines', this.state.lines)
                    localStorage.setItem('image', this.state.image)
                    localStorage.setItem('buttonText', this.state.buttonText)
            
            })
    }

    render() {
        console.log(this.state.data)
        console.log(localStorage.getItem('hrefs'))
        return (
            <div>
                {this.state.hrefs !== localStorage.getItem('hrefs') 
                ? <div style={{textAlign: "center", fontSize: "22px", alignItems: "center", justifyContent: "center"}} class="container">
                    <h1 style={{textAlign: "center"}}>Loading</h1> 
                    <progress class="progress is-large is-info" max="100"></progress>
                    Loading
                 </div>
                
                : 
                <article style={{backgroundImage: this.state.imageUrl.length > 0
                    ? `url(${this.state.imageUrl})` 
                    : this.state.fullImage.length > 0
                        ? `url(${this.state.fullImage})` 
                        : `url(${this.state.banner})`, 
                position: "relative", width: "100%", height: "100vh", display: "flex",
                backgroundSize: "cover", backgroundRepeat: "no-repeat", margin: "auto"}}>
                    <a href={this.state.hrefs} target="_blank"  rel="noreferrer" style={{textDecoration: "none", margin: "auto", color: "white"}}>
                        <div>
                            {this.state.header.length > 0
                            ?   <div>
                                <p>{this.state.pLabel}</p>
                                <h1 style={{textAlign: "center"}}>{this.state.header}</h1>
                                </div>
                            : this.state.postSummary.length > 0
                                ? <div>
                                    <h1>
                                        <span style={{display: "block"}}>
                                            <span style={{color: "rgb(239, 186, 145)"}}>{this.state.lines[0]}:</span>
                                            <span style={{color: "rgb(239, 186, 145)"}}></span>
                                            <span>{this.state.lines[1]}</span>
                                        </span>
                                    </h1>
                                    <div style={{fontSize: "20px", lineHeight: "26px", fontFamily: "Mercury Text G1 A,Mercury Text G1 B"}}>
                                        {this.state.postSummary}
                                    </div>
                                </div> 
                                : <div><img src={this.state.image} alt="banner"/></div>}
                        </div>
                        <div>
                            <button type="button" class="btn btn-light btn-lg btn-block" 
                            href={this.state.hrefs} target="_blank"  rel="noreferrer" style={{margin: "auto", display: "block", marginTop: "50px"}}>
                                {this.state.buttonText}
                            </button>
                        </div>
                    </a>
                </article>    
                }
            </div>
        )
    }
}
