import React, { Component } from 'react';
import axios from 'axios';
import noImage from '../img/download.jpeg';

class Show extends Component {
    constructor(props) {
        super(props);
        this.state = { showData: undefined };
    }

    async getShow() {
        try {
            // To get URL Paramter, use this.props.match to match params on the ID parameter
            const { data } = await axios.get(`http://api.tvmaze.com/shows/${this.props.match.params.id}`);
            this.setState( { showData: data } );
        } catch (err) {
            console.log(err);
        }
    }
    
    componentDidMount() {
        this.getShow();
    }

    render() {
        // Use RegEx to strip out HTML characters from summary
        const regex = /(<([^>]+)>)/gi;

        return (
            <div className = 'show-body'>
                <h1 className = 'cap-first-letter'> {(this.state.showData && this.state.showData.name) || 'No Title'} </h1>
                <img 
                    alt = 'Show' 
                    src = {(this.state.showData && this.state.showData.image && this.state.showData.image.medium) || noImage}
                />
                <br />
                <br />
                <p>
                    Average Rating: {(this.state.showData && this.state.showData.rating.average) || 'No Rating'}
                    <br />
                    <br/>
                    Network: {(this.state.showData && this.state.showData.network && this.state.showData.network.name) || 'Not Specified'}
                    <br/>
                    <br/>
                    Language: {(this.state.showData && this.state.showData.lanaguage) || 'Not Specified'}
                    <br/>
                    <br/>
                    Runtime: {(this.state.showData && this.state.showData.runtime) || 'Not Specified'}
                    <br/>
                    <br/>
                    Premiere Date: {(this.state.showData && this.state.showData.premiered) || 'Not Specified'}
                    <br/>
                    <br/>
                    Genres:
                </p>
                <dl>
                    {(this.state.showData && this.state.showData.genres.map( (genre) => {
                        return <dt key = {genre}> {genre} </dt> })) || 'No Genre Specified'}
                </dl>
                <p>
                    Summary:
                    <br/>
                    {(this.state.showData && this.state.showData.summary && this.state.showData.summary.replace(regex, '')) || 'Not Specified'}
                </p>
            </div>
        )
    };
}

export default Show;