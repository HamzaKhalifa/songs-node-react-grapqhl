import React, { useState, Fragment } from 'react'
import { useQuery, useMutation } from 'react-apollo';
import { ADD_LYRIC_TO_SONG, GET_SONG, GET_SONGS, LIKE_LYRIC } from '../queries';
import Spinner from './ui/Spinner';
import { Link } from 'react-router-dom';

function SongDetail({ match: { params: { songId } } }) {
    const [lyricContent, setLyricContent] = useState('');
    const [addLyricToSong, addLyricData] = useMutation(ADD_LYRIC_TO_SONG);
    const [likeLyric] = useMutation(LIKE_LYRIC);
    const { error, data, loading } = useQuery(GET_SONG, {
        variables: {
            songId
        }
    });

    const addLyricToSongCallback = (e) => {
        e.preventDefault();
        addLyricToSong({
            variables: {
                content: lyricContent, songId
            },
            refetchQueries: [
                { query: GET_SONGS, variables: { songId } }
            ]
        });
        setLyricContent('');
    }

    const likeLyricCallback = ({ content, id, likes }) => {
        likeLyric({
            variables: {
                lyricId: id
            },
            optimisticResponse: {
                likeLyric: {
                    content,
                    id,
                    likes: likes + 1,
                    __typename: 'LyricType'
                }
            }
        });
    }

    return (
        <div>
            <Link to="/"><i className="material-icons red-text">arrow_back</i></Link>
            <h3>Song Detail</h3>
            {loading && <div>Loading</div>}
            {error && <div>{error.message}</div>}
            {data && 
                <Fragment>
                    <h3>{data.song.title}</h3>
                    <ul className="collection">
                        {data.song.lyrics.map(({ content, id, likes }, index) => (
                            <li key={index} style={styles.lyric} className="collection-item">
                                <p>
                                    {content}
                                </p>
                                <div style={styles.lyricsButtons}>
                                    <i onClick={() => {likeLyricCallback({ content, id, likes })}} style={{ cursor: 'pointer' }} className="material-icons">thumb_up</i>
                                    <span style={styles.likes} className="right">{likes}</span>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <form onSubmit={addLyricToSongCallback}>
                        <label>Lyric</label>
                        <input type="text" value={lyricContent} onChange={(e) => { setLyricContent(e.target.value) }} />
                        {addLyricData.loading ? <Spinner /> : 
                            <button className="red white-text btn-small waves-effect">Add</button>
                        }
                    </form>
                </Fragment>
            }
        </div>
    )
}

const styles = {
    lyric: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    lyricsButtons: {
        alignItems: 'center',
        display: 'flex',
        width: 60,
        justifyContent: 'space-between'
    },
    likes: {
        fontSize: 27
    }
}

export default SongDetail
