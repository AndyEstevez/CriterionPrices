import axios from 'axios';
import React, { Component } from 'react'

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
                <table class="table is-hoverable has-text-centered" className="content-table">
                    <thead style={{lineHeight: "100px", borderBottom: "3px solid black"}}>
                        <tr style={{fontFamily: "Mercury Display A", fontSize: "16px", whiteSpace: "nowrap"}} class="has-text-centered">
                            <td></td>
                            <td>Title</td>
                            <td>Director</td>
                            <td>Price</td>
                        </tr>
                    </thead>

                    <tbody>
                        {this.state.data.map(index => {
                            return(
                                <tr key={index.link} style={{fontFamily: "Gotham B"}} class="has-text-centered" onClick={() => window.open(index.link, "_blank")}>
                                    <td>
                                        <img style={{width: "40%", height: "auto"}} src={index.image} alt={index.title}/>
                                    </td>
                                    <td style={{fontWeight: "700",}}>{index.title}</td>
                                    <td>{index.director}</td>
                                    <td>{index.price}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}
