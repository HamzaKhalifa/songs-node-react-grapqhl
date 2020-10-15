import gql from 'graphql-tag';

export const CREATE_SONG_MUTATION = gql`
    mutation AddSong($title: String) {
        addSong(title: $title) {
            ...songFragment
        }
    }
    fragment songFragment on SongType {
        id
        title
    }
`

export const GET_SONGS = gql`
    {
        songs {
            id
            title
            lyrics {
                id
                content
            }
        }
    }
`

export const DELETE_SONG = gql`
    mutation deleteSong($id: ID) {
        deleteSong(id: $id) {
          id
        }
    }
`

export const ADD_LYRIC_TO_SONG = gql`
    mutation addLyricToSong($content: String, $songId: ID) {
        addLyricToSong(content: $content, songId: $songId) {
            id
            title
            lyrics {
                id
                content
                likes
            }
        }
    }
`

export const GET_SONG = gql`
    query getSong($songId: ID!) {
        song(id: $songId) {
            id
            title
            lyrics {
                id
                content
                likes
            }
        }
    }
`

export const LIKE_LYRIC = gql`
    mutation likeLyric($lyricId: ID) {
        likeLyric(id: $lyricId) {
            id
            content
            likes
        }
    }
`