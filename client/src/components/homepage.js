import React, { Component } from 'react';
import axios from 'axios';

export default class HomePage extends Component {
    constructor(props){
        super(props)
        this.state = {
            data: [],
        }
    }


    async componentDidMount() {
        axios.get('/allTitles')
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
                <table>
                    <thead>
                        <tr>
                            <td>Spine #</td>
                            <td>Img</td>
                            <td>Title</td>
                            <td>Director</td>
                            <td>Country</td>
                            <td>Year</td>
                            <td>Price</td>
                        </tr>
                    </thead>

                    <tbody>
                        {this.state.data.map(index => {
                            return(
                                <tr key={index.spineNumber}>
                                    <td>{index.spineNumber}</td>
                                    <td>
                                        <img src={index.img} alt={index.title}/>
                                    </td>
                                    <td>{index.title}</td>
                                    <td>{index.director}</td>
                                    <td>{index.country}</td>
                                    <td>{index.year}</td>
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
