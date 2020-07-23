import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';

const AddMovieForm = props => {
    const {getMovieList} = props;
    const [newMovieInfo, setMovieInfo] = useState(); //Stores everything EXCEPT the actor(s) names
    const [actorName, setActor] = useState(); //To store each actor name that will be added to the array in the const below
    const [listofActors, setActorsArray] = useState([]); //The array of actor's names that was alluded to in the comment above
    const history = useHistory();

    const postMovie = e => {
        e.preventDefault();

        const newMovie = { //This const combines data from newMovieInfo and listofActors into one object for the POST request
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
        //Title, director, and metascore ONLY
        setMovieInfo({...newMovieInfo, [name]: value});
    };

    const actorDetails = e => {
        const {name, value} = e.target;
        //Actor name (single person) ONLY
        setActor({...actorName, [name]: value});
        console.log('Current data saved in actorName:', actorName);
    };

    const addActor = e => {
        //Add that single-person actor to the group of actors here
        setActorsArray([...listofActors, actorName]);
        document.getElementById('star').value = '';
        console.log('Current array of actors:', listofActors);
    };

    const addMovieStyle = () => {
        return {
            form: {
                width: '500px',
                padding: '30px 0',
                margin: '50px 250px',
                background: '#E7E892',
                border: '5px solid #ABAC2F',
                borderRadius: '50px',
                display: 'flex',
                justifyContent: 'center'
            },
            fields: {
                width: '300px',
                margin: '5px 0',
                display: 'flex',
                justifyContent: 'space-between'
            },
            p: {
                color: 'blue',
                fontWeight: 'bold'
            },
            addBtn: {
                margin: '20px 0',
                width: '150px',
                height: '50px',
                background: 'gold',
                border: '2px solid red',
                borderRadius: '25px',
                color: 'red',
                fontSize: '1.4rem',
                fontWeight: 'bold'
            }
        };
    };

    return (
        <form style={addMovieStyle().form} onSubmit={postMovie}>
            <div>
                <h2>Add a New Movie</h2>
                <div style={addMovieStyle().fields}>
                    <div><label>Movie Title:</label></div>
                    <div><input type='text' name='title' onChange={movieDetails} /></div>
                </div>
                <div style={addMovieStyle().fields}>
                    <div><label>Director:</label></div>
                    <div><input type='text' name='director' onChange={movieDetails} /></div>
                </div>
                <div style={addMovieStyle().fields}>
                    <div><label>Metascore</label></div>
                    <div><input type='number' name='metascore' onChange={movieDetails} /></div>
                </div>
                <div>
                    <h3>Actors</h3>
                    {listofActors.map(person => {
                        return (
                            <p style={addMovieStyle().p}>{person.star}</p>
                        )
                    })}
                </div>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <div style={addMovieStyle().fields}>
                        <div><label>Actor:</label></div>
                        <div><input type='text' name='star' id='star' onChange={actorDetails} /></div>
                    </div>
                    <div><input type='button' style={{margin: '0 10px'}} value='Add to List' onClick={addActor} /></div>
                </div>
                <div>
                    <button style={addMovieStyle().addBtn}>Add Movie!</button>
                </div>
            </div>
        </form>
    );
};

export default AddMovieForm;