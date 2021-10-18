import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';

const initialForm = {
    name: "",
    constellation: "",
    id: null,
};

const CrudFormApi = ({createData, updateData, dataToEdit, setDataToEdit}) => {
    //Crear variable history para la redirección
    let history = useHistory();

    const [form, setForm] = useState({initialForm});

    useEffect( ()=> {
        if(dataToEdit) {
            setForm(dataToEdit)
        } else {
            setForm(initialForm)
        }
    }, [dataToEdit]);

    const handleChange = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    };
    
    const handleSubmit = (e) => {
            e.preventDefault();
            
            if(!form.name || !form.constellation) {
                alert("Datos incompletos");
                return;
            };
        
            if(form.id === null) {
                createData(form)
            } else {
                updateData(form)
            };
            
            handleReset();
    };
    
    const handleReset = (e) => {
            setForm(initialForm);
            setDataToEdit(null);
            //Redireccionar
            history.push("/")
    };

    return(
        <div>
            <h3>{dataToEdit ? "Editar" : "Agregar"}</h3>
            <form onSubmit={handleSubmit} >
                <input type="text" name="name" placeholder="Nombre" onChange={handleChange} value={form.name}/>
                <input type="text" name="constellation" placeholder="Constellation" onChange={handleChange} value={form.constellation}/>
                <input type="submit" value="Enviar" />
                <input type="reset" value="Limpiar" onClick={handleReset}/>
            </form>
        </div>
    )
};

export default CrudFormApi