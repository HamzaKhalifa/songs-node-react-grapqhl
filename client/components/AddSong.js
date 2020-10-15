import React, { useState } from 'react';
import { useMutation } from 'react-apollo';
import Spinner from './ui/Spinner';
import { Link } from 'react-router-dom';
import { CREATE_SONG_MUTATION, GET_SONGS } from '../queries';

function AddSong({ history: { push } }) {

    const [AddSong, { loading, error }] = useMutation(CREATE_SONG_MUTATION);
    const [title, setTitle] = useState('');
    
    const submit = (e) => {
        e.preventDefault();
        AddSong({ 
            variables: {
                title
            },
            refetchQueries: [{ query: GET_SONGS }]
        }).then(res => {
            push('/');
        })
    }

    return (
        <form onSubmit={submit}>
            <Link to='/' className="red-text row"><i className="material-icons red-text">arrow_back</i></Link>
            <h3>Create A new Song</h3>
            <label style={styles.label}>Title:</label>
            <input type="text" value={title} onChange={(e) => {setTitle(e.target.value)}}/>

            {loading ? <Spinner /> : 
                <button className="btn waves-effect waves-light">
                    Submit <i className="material-icons right">send</i>
                </button>
            }
            {error && <span style={{display: "block"}} className="red-text">{error.message}</span>}
        </form>
    )
}

const styles = {
    label: {
        fontSize: 20
    }
}

export default AddSong
