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
                    <span className = 'title'> Average Rating: </span> {(this.state.showData && this.state.showData.rating.average) || 'No Rating'}
                    <br />
                    <br/>
                    <span className = 'title'> Network: </span> {(this.state.showData && this.state.showData.network && this.state.showData.network.name) || 'Not Specified'}
                    <br/>
                    <br/>
                    <span className = 'title'> Language: </span> {(this.state.showData && this.state.showData.lanaguage) || 'Not Specified'}
                    <br/>
                    <br/>
                    <span className = 'title'> Runtime: </span> {(this.state.showData && this.state.showData.runtime) || 'Not Specified'}
                    <br/>
                    <br/>
                    <span className = 'title'> Premiere Date: </span>  {(this.state.showData && this.state.showData.premiered) || 'Not Specified'}
                    <br/>
                    <br/>
                </p>
                <span className = 'title'> Genres: </span> 
                <dl>
                    {(this.state.showData && this.state.showData.genres.map( (genre) => {
                        return <dt key = {genre}> {genre} </dt> })) || 'No Genre Specified'}
                </dl>
                <p>
                    <span className = 'title'> Summary: </span> 
                    <br/>
                    {(this.state.showData && this.state.showData.summary && this.state.showData.summary.replace(regex, '')) || 'Not Specified'}
                </p>
            </div>
        )
    };
}

export default Show;