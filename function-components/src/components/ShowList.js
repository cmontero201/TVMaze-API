import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SearchShows from './SearchShows';
import noImage from '../img/download.jpeg';
import '../App.css';

// Function Component
const ShowList = () => {
    // Set initial state for each piece of data w/ function to set each state
    const [ searchData, setSearchData ] = useState(undefined);
    const [ showData, setShowData ] = useState(undefined);
    const [ searchTerm, setSearchTerm ] = useState('');
    let li = null;
    let img = null;

    /*
    Function to get data from API
    1stParam: function 
    2ndParam: if empty array, run useEffect function only once, when component mounts
              if non-empty array, run function everytime array paramter changes within component
    */
    useEffect( 
        () => {
            console.log("render");

            async function fetchData() {
                if (searchTerm) {
                    try {
                        const { data } = await axios.get('http://api.tvmaze.com/search/shows?q=' + searchTerm);
                        setSearchData(data);
                    } catch(err) {
                        console.log(err);
                    }
                    
                } else {
                    try {
                        const { data } = await axios.get('http://api.tvmaze.com/shows');
                        setShowData(data);
                    } catch(err) {
                        console.log(err);
                    }
                }
            }

            fetchData();
        }, 
        [ searchTerm ]
    ); 

    // Set State of Search Term to What is passed in
    const searchValue = (value) => {
        setSearchTerm(value);
    };

    // Write out list of shows
    if (searchTerm) {
        li = searchData && searchData.map( (shows) => {
            let { show } = shows;
            if (show.image && show.image.medium) {
                img = <img alt = 'Show' src = {show.image.medium} />
            } else {
                img = <img alt = 'Show' src = {noImage} />
            };

            return (
                <li key = {show.id}>
                    <Link to = {`/shows/${show.id}`} >
                        {img}
                        <br />
                        {show.name}
                    </Link>
                </li>
            );
        });
    } else {
        li = showData && showData.map( (show) => {
            if (show.image && show.image.medium) {
                img = <img alt = 'Show' src = {show.image.medium} />
            } else {
                img = <img alt = 'Show' src = {noImage} />
            };

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
    };

    return (
        <div className = 'App-body'>
            <SearchShows searchValue = {searchValue} />
            <ul> {li} </ul>
        </div>
    );
};

export default ShowList;