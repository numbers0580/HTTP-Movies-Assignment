import React, {useState, useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import axios from 'axios';

const blankFields = {
    title: '',
    director: '',
    metascore: '',
    stars: []
};

const MovieForm = props => {
    const {movieList, setMovieList, getMovieList} = props;
    const [formEntries, setFormEntries] = useState(blankFields);
    const [movieTitle, setTitle] = useState();

    const history = useHistory();
    const {id} = useParams();

    const updateEntries = e => {
        const {name, value} = e.target;

        setFormEntries({...formEntries, [name]: value});
    };

    const updateActors = e => {
        const theActors = [...formEntries.stars];
        theActors.splice(e.target.id, 1, e.target.value);
        setFormEntries({...formEntries, stars: theActors});
    };

    const submitMovie = e => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/movies/${formEntries.id}`, formEntries)
            .then(response => {
                console.log('Testing new Movie data:', response.data);
                getMovieList();
                history.push('/'); //Goes back to list of movies
            })
            .catch(submitError => {
                console.log('Error submitting new Movie');
            })
    };

    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${id}`)
            .then(fetched => {
                console.log('Testing fetched Movies in MovieForm:', fetched.data);
                setFormEntries(fetched.data);
                setTitle(fetched.data.title);
            })
            .catch(fetchedError => {
                console.log('Error fetching Movies for MovieForm');
            })
    }, []);

    return (
        <form style={{margin: '40px 20px'}} onSubmit={submitMovie}>
            <h2>Update '{movieTitle}' Form</h2>
            <div style={{width: '300px', margin: '10px 0', display: 'flex', justifyContent: 'space-between'}}>
                <div><label>Movie Title:</label></div>
                <div><input type='text' name='title' value={formEntries.title} onChange={updateEntries} /></div>
            </div>
            <div style={{width: '300px', margin: '10px 0', display: 'flex', justifyContent: 'space-between'}}>
                <div><label>Director:</label></div>
                <div><input type='text' name='director' value={formEntries.director} onChange={updateEntries} /></div>
            </div>
            <div style={{width: '300px', margin: '10px 0', display: 'flex', justifyContent: 'space-between'}}>
                <div><label>Metascore:</label></div>
                <div><input type='number' name='metascore' value={formEntries.metascore} onChange={updateEntries} /></div>
            </div>
            {formEntries.stars.map(billing => {
                return (
                    <div style={{width: '300px', margin: '10px 0', display: 'flex', justifyContent: 'space-between'}}>
                        <div><label>Actor:</label></div>
                        <div><input type='text' name='stars' value={billing} onChange={updateActors} /></div>
                    </div>
                )
            })}
            <div>
                <button>Submit</button>
            </div>
        </form>
    );
};

export default MovieForm;