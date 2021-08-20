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
            <nav class="navbar navbar-dark bg-dark fixed-top navbar-expand">
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav mx-auto">
                        <li class="nav-item">
                            <a class="nav-link" href='/'>Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href='/all'>The Collection</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href='/new-releases'>New Releases</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href='/coming-soon'>Coming Soon</a>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}
