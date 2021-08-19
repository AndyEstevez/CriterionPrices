import React, { Component } from 'react'

export default class Navbar extends Component {
    constructor(props){
        super(props);
        this.state = {
            url: ''
        }
    }

    componentDidMount() {
            this.setState({
                url: window.location.pathname
            })
        
    }

    render() {
        console.log(this.state.url)
        return(
            <nav class="navbar is-transparent" style={{ backgroundColor: "rgba(0,0,0,0)", fontFamily: "Mercury Text G1 A, Mercury Text G1 B", fontSize: "22px"}}>
                <div class="navbar-end" style={{margin: "auto"}}>
                    <a class="navbar-item" style={{color: this.state.url === '/' ? 'white' : 'black'}}>
                        The Collection
                    </a>
                    <a class="navbar-item" style={{color: this.state.url === '/' ? 'white' : 'black'}}>
                        New Releases
                    </a>
                    <a class="navbar-item" style={{color: this.state.url === '/' ? 'white' : 'black'}}>
                        Coming Soon
                    </a>
                </div>
            </nav>
        )
    }
}
