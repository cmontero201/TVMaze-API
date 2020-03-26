import React, { Component}  from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import noImage from '../img/download.jpeg';
import SearchShows from './SearchShows';

// Class componenet because deals with state
class ShowList extends Component {
    // Set Initial State of Component
    constructor(props) {
        super(props)
        this.state = { showsData: undefined, searchTerm: undefined, searchData: undefined };
    }

    // Method to set searchData state based on searchTerm
    searchValue = (value) => {
        this.setState( { searchTerm: value }, () => {
            this.getShows();
        });
    }

    // Method to make axios call to fetch data (show JSON lists)
    async getShows() {

        if (this.state.searchTerm) {
            console.log("SearchTerm is set")
            try {
                const { data } = await axios.get('http://api.tvmaze.com/search/shows?q=$' + this.state.searchTerm);
                this.setState( { searchData: data }, () => {
                    console.log(this.state.searchData);
                });

            } catch (err) {
                console.log(err)
            }

        } else {
            console.log("SearchTerm is not set");
            try {
                const { data } = await axios.get('http://api.tvmaze.com/shows');
                this.setState( { showsData: data } );

            } catch (err) {
                console.log(err)
            }
        }
    }

    // When Component Mounts ... Fetch Data
    componentDidMount() {
        this.getShows()
    }

    // Only Required Method ... Contains JSX for Component
    render() {
        let li = null;
        let img = null;
        
        if (this.state.searchTerm) {
            li = this.state.searchData && this.state.searchData.map( (shows) => {
                let { show } = shows
                if (show.image && show.image.medium) {
                    img = <img alt = 'Show' src = {show.image.medium}/>;
                } else {
                    img = <img alt = 'Show' src = {noImage} />;
                }

                return (
                    <li key = {show.id}>
                        <Link to = {`/shows/${show.id}`}>
                            {img}
                            <br />
                            {show.name}
                        </Link>
                    </li>
                );
            });
        } else {
            li = this.state.showsData && this.state.showsData.map( (show) => {
                if (show.image && show.image.medium) {
                    img = <img alt = 'Show' src = {show.image.medium} />
                } else {
                    img = <img alt = 'Show' src = {noImage} />
                }
                return (
                    <li key = {show.id}>
                        <Link to = {`/shows/${show.id}`}>
                            {img}
                            <br />
                            {show.name}
                        </Link>
                    </li>
                );
            });

        }
        return (
            <div className = 'App-body'>
                <SearchShows searchValue = {this.searchValue} />
                <ul>
                    {li}
                </ul>
            </div>
        );
    }
}

export default ShowList;