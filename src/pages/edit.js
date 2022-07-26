import React from "react";
import { useQuery, useMutation } from "@apollo/client";

import NoteForm from '../components/Note'; 

import { GET_NOTE, GET_ME } from '../gql/query';
import { EDIT_NOTE } from '../gql/mutation'; 

const EditNote = props => {
    const id = props.match.params.id; 

    const { loading, error, data } = useQuery(GET_NOTE, { variables: { id } }); 
    
    const { data: userdata } = useQuery(GET_ME);
    //{ console.log(data) }

    const [editNote] = useMutation(EDIT_NOTE, {
        variables: {
            id
        }, 
        onCompleted: () => {
            props.history.push(`/note/${id}`);
        }
    }); 

    if(loading) return 'loading'; 
    
    if(error) return <p>Error! No se encontro la nota</p>; 

    if (userdata.me.id !== data.note.author.id) {
        return <p>You do not have access to edit this note</p>;
    }

    return <NoteForm content={data.note.content} action={editNote} />; 
}; 

export default EditNote; 