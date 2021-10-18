import React from "react";
import { useHistory } from "react-router";

const CrudTableRowApi = ({e, setDataToEdit, deleteData}) => {
   
    let { name, constellation, id } = e; 

    //Crear variable history para la redirección
    let history = useHistory();

    const handleEdit = () => {
        setDataToEdit(e);
        //Redireccionar
        history.push(`/editar/${id}`)
    };

    return(
        <tr>
            <td>{name}</td>
            <td>{constellation}</td>
            <td>
                <button onClick= {handleEdit}>Editar</button>
                <button onClick= {() => deleteData(id)}>Eliminar</button>
            </td>
        </tr>
    )
};

export default CrudTableRowApi