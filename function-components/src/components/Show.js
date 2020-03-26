import React, { useState, useEffect } from 'react';
import axios from 'axios';
import noImage from '../img/download.jpeg';

const Show = (props) => {
    const [ showData, setShowData ] = useState(undefined);
    let summary = null
    let img = null
    const regex = /(<([^>]+)>)/gi

    useEffect(
        () => {
            async function fetchData() {
                try {
                    const { data } = await axios.get('http://api.tvmaze.com/shows/' + props.match.params.id);
                    setShowData(data)

                } catch (err) {
                    console.log(err);
                }
            }
            fetchData();
        },
        [ props.match.params.id ]
    );

    if (showData && showData.summary) {
        summary = showData && showData.summary.replace(regex, '');
    } else {
        summary = 'No Summary';
    }

    if (showData && showData.image && showData.image.medium) {
        img = <img alt = 'Show' src = {showData.image.medium} />
    } else {
        img = <img alt = 'Shwow' src = {noImage} />
    }

    return (
        <div className = 'show-body'>
            <h1 className = 'cap-first-letter'> {(showData && showData.name) || 'No Title'} </h1>
            <img 
                alt = 'Show' 
                src = {(showData && showData.image && showData.image.medium) || noImage}
            />
            <br />
            <br />
            <p>
                <span className = 'title'> Average Rating: </span> {(showData && showData.rating.average) || 'No Rating'}
                <br />
                <br/>
                <span className = 'title'> Network: </span> {(showData && showData.network && showData.network.name) || 'Not Specified'}
                <br/>
                <br/>
                <span className = 'title'> Language: </span> {(showData && showData.lanaguage) || 'Not Specified'}
                <br/>
                <br/>
                <span className = 'title'> Runtime: </span> {(showData && showData.runtime) || 'Not Specified'}
                <br/>
                <br/>
                <span className = 'title'> Premiere Date: </span>  {(showData && showData.premiered) || 'Not Specified'}
                <br/>
                <br/>
            </p>
            <span className = 'title'> Genres: </span> 
            <dl>
                {(showData && showData.genres.map( (genre) => {
                    return <dt key = {genre}> {genre} </dt> })) || 'No Genre Specified'}
            </dl>
            <p>
                <span className = 'title'> Summary: </span> 
                <br/>
                {(showData && showData.summary && showData.summary.replace(regex, '')) || 'Not Specified'}
            </p>
        </div>
    );


}

export default Show;