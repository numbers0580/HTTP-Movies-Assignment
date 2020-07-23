import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';

const AddMovieForm = props => {
    const {getMovieList} = props;
    const [newMovieInfo, setMovieInfo] = useState();
    const [actorName, setActor] = useState();
    const [listofActors, setActorsArray] = useState([]);
    const history = useHistory();

    const postMovie = e => {
        e.preventDefault();

        const newMovie = {
            id: Date.now(),
            title: newMovieInfo.title,
            director: newMovieInfo.director,
            metascore: newMovieInfo.metascore,
            stars: listofActors.map(billing => {return billing.star})
        };

        axios.post(`http://localhost:5000/api/movies/`, newMovie)
            .then(postedMovie => {
                console.log('Testing new Movie being added to API:', postedMovie.data);
                getMovieList();
                history.push('/');
            })
            .catch(postingError => {
                console.log('Error adding new Movie to API');
            })
    };

    const movieDetails = e => {
        const {name, value} = e.target;

        setMovieInfo({...newMovieInfo, [name]: value});
    };

    const actorDetails = e => {
        const {name, value} = e.target;

        setActor({...actorName, [name]: value});
        console.log('Current data saved in actorName:', actorName);
    };

    const addActor = e => {
        //listofActors.push(actorName);
        setActorsArray([...listofActors, actorName]);
        document.getElementById('star').value = '';
        console.log('Current array of actors:', listofActors);
    };

    return (
        <form style={{padding: '20px 40px'}} onSubmit={postMovie}>
            <h2>Add a New Movie</h2>
            <div style={{width: '300px', margin: '5px 0', display: 'flex', justifyContent: 'space-between'}}>
                <div><label>Movie Title:</label></div>
                <div><input type='text' name='title' onChange={movieDetails} /></div>
            </div>
            <div style={{width: '300px', margin: '5px 0', display: 'flex', justifyContent: 'space-between'}}>
                <div><label>Director:</label></div>
                <div><input type='text' name='director' onChange={movieDetails} /></div>
            </div>
            <div style={{width: '300px', margin: '5px 0', display: 'flex', justifyContent: 'space-between'}}>
                <div><label>Metascore</label></div>
                <div><input type='number' name='metascore' onChange={movieDetails} /></div>
            </div>
            <div>
                <h3>Actors</h3>
                {listofActors.map(person => {
                    return (
                        <p>{person.star}</p>
                    )
                })}
            </div>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <div style={{width: '300px', margin: '5px 0', display: 'flex', justifyContent: 'space-between'}}>
                    <div><label>Actor:</label></div>
                    <div><input type='text' name='star' id='star' onChange={actorDetails} /></div>
                </div>
                <div><input type='button' style={{margin: '0 10px'}} value='Add to List' onClick={addActor} /></div>
            </div>
            <div>
                <button style={{margin: '10px 0'}}>Add Movie!</button>
            </div>
        </form>
    );
};

export default AddMovieForm;