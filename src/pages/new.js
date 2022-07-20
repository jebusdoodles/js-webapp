import React, { useEffect } from "react";
import { useMutation, gql } from "@apollo/client";
import { GET_NOTES, GET_MY_NOTES } from "../gql/query";

import NoteForm from "../components/NoteForm";

const NEW_NOTE = gql`
    mutation newNote($content: String!){
        newNote(content: $content){
            id
            content
            createdAt
            favoriteCount
            favoritedBy {
                id
                username
            }
            author {
                username
                id
            }
        }
    }
`;

const NewNote = props => {
    useEffect(() => {
        document.title = 'New Note - Notedly';
    });

    const [ data, { loading, error }] = useMutation(NEW_NOTE, {
        refetchQueries: [{query: GET_MY_NOTES}, { query: GET_NOTES }],
        onCompleted: data => {
            props.history.push(`note/${data.newNote.id}`); 
        }
    }); 

    return(
        <React.Fragment>
            { loading && <p>Loading...</p> }

            {error && <p>Error guardando la nota</p>}

            <NoteForm action={data} />
        </React.Fragment>
    ); 
};

export default NewNote; 