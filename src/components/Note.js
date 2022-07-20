import React from 'react'; 
import ReactMarkdown from 'react-markdown';

import { format } from 'date-fns'; 
import styled from 'styled-components';

import { useQuery } from '@apollo/client';
import NoteUser from './NoteUser';
import { IS_LOGGED_IN } from '../gql/query';


const StyledNote = styled.article`
    max-width: 800px; 
    margin: 0 auto;
`;

const MetaData = styled.div`
    @media (min-width: 500px){
        display: flex; 
        align-items: top; 
    }
`; 

const MetaInfo = styled.div`
    padding-right: 1em; 
`;

const UserActions = styled.div`
    margin-left: auto; 
`; 

const Avatar = styled.img`
    border-radius: 50%;
`;

const Note = ({ note }) => {

    const { loading, error, data } = useQuery(IS_LOGGED_IN); 

    if(loading) return <p>Loading...</p>; 

    if(error) return <p>Error!</p>; 

    return(
        <StyledNote>
            <MetaData>
                <MetaInfo>
                    <Avatar
                        src={note.author.avatar}
                        alt="{note.author.username} avatar"
                        height="50px"
                    />
                </MetaInfo>
                <MetaInfo>
                    <em>por</em> { note.author.username } <br />
                    { format(note.createdAt, 'MMM Do YYYY')}
                </MetaInfo>
                {
                    data.isLoggedIn ? (
                        <UserActions>
                            <NoteUser note={note} />
                        </UserActions>
                    ) : (
                        <UserActions>
                            <em>{ note.favoriteCount === 0 ? <span aria-hidden="true" role="img">
                                ✩
                            </span> :
                            <span aria-hidden="true" role="img">
                                ⭐️
                            </span> }</em> { note.favoriteCount }
                        </UserActions>
                    )
                }
            </MetaData>
            <ReactMarkdown source={note.content} />
        </StyledNote>
    );
};

export default Note; 