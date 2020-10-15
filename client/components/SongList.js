import React, { Fragment }from 'react';
import { useQuery, useMutation } from 'react-apollo';
import { Link } from 'react-router-dom';
import { GET_SONGS, DELETE_SONG } from '../queries';

function SongList({ history: { push } }) {

    const { loading, data, error } = useQuery(GET_SONGS);
    const[deleteSong] = useMutation(DELETE_SONG);

    return (
        <Fragment>
            <ul className="collection">
                {error && error}
                {loading && loading}
                {data && data.songs.map((song, index) => (
                    <li key={index} className="collection-item">
                        {song.title}
                        <i 
                            onClick={() => { 
                                deleteSong({ variables: { id: song.id }, refetchQueries: [{ query: GET_SONGS }] }).then(res => console.log('wut' + res)).catch(e => console.log(e.message))
                            }} 
                            style={{ cursor: 'pointer'}}
                            className="material-icons right red-text"
                        >
                            delete
                        </i>
                        <i onClick={() => { push(`/songs/${song.id}`) }} style={{ cursor: 'pointer'}} className="material-icons right red-text">edit</i>
                    </li>
                ))}
            </ul>
            <Link to="/songs/new" className="btn-floating btn-large waves-effect waves-light red right" style={styles.addButton}><i className="material-icons">add</i></Link>
        </Fragment>
    )
}

const styles = {
    addButton: {
        position: 'fixed',
        right: 30,
        bottom: 30
    }
}

export default SongList
