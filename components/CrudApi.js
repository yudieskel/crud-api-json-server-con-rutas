import React, { useState, useEffect } from 'react';
import { HashRouter, NavLink, Switch, Route } from 'react-router-dom';
import { helpHttp } from '../helpers/helpHttp';
import CrudFormApi from './CrudFormApi';
import CrudTableApi from './CrudTableApi';
import Loader from './Loader';
import Message from './Message';
import Error404 from '../pages/Error404';

const CrudApi = () => {

    const [ db, setDb] = useState(null);
    const [dataToEdit, setDataToEdit] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    //Variables para simplificar la solicitud
    let api = helpHttp();
    let url = "http://localhost:5000/santos";

    useEffect( () => {
        setLoading(true);
        
        api
            .get(url).then( res => {
            if(!res.err) {
                setDb(res);
                setError(null)
            } else {
                setDb(null);
                setError(res)
            }
     
        setLoading(false);
        } );
    }, [] );

    const createData = (data) => {
        //Crear un id para que no quede null
        data.id = Date.now();
    
        let options = { body: data, 
            headers: { "content-type": "application/json" }
        };
        api
            .post( url, options)
            .then(res => {
             
             if(!res.err) {
                
                setDb([...db, res])
            } else {
                setError(res)
            }
            });
    };

    const updateData = (data) => {
        //Crear una variable con la url + id para poder actualizar
        let endpoint = `${url}/${data.id}`;

        let options = { body: data, 
            headers: { "content-type": "application/json" }
        };
        api
            .put( endpoint, options)
            .then(res => {
           
             if(!res.err) {
                let newData = db.map(e => e.id === data.id ? data : e);
                setDb(newData)
            } else {
                setError(res)
            }
            });
    };  

    const deleteData = (id) => {
        let isDelete = window.confirm(`Estás seguro de querer borrar el registro ${id}?`);

        if(isDelete) { 
            let endpoint = `${url}/${id}`;
            let options = { headers: { "content-type": "application/json" } };

            api
                .del(endpoint, options)
                .then((res) => {
                    if(!res.err) {
                    let newData = db.filter(e => e.id !== id);
                    setDb(newData)
                    } else {
                    setError(res)
                    }
                });
            
         } else {
             return
         }
    };

    return(
    <div>

        <HashRouter basename="santos">
            <header>
                <h2>CRUD API con Rutas</h2>
    
                <nav>
                    <NavLink exact to="/" activeClassName="active">Santos</NavLink>
                    <NavLink exact to="/agregar" activeClassName="active">Agregar</NavLink>
                </nav>
            </header>
            <Switch>
                <Route exact path="/">
                   {loading && <Loader/>}
                   {error && <Message msg={`Error ${error.status}: ${error.statusText}`} bgColor="#dc3545"/>}
                   {db && <CrudTableApi data={db} setDataToEdit={setDataToEdit} deleteData={deleteData}/>}
                </Route>

                <Route exact path="/agregar">
                   <CrudFormApi createData={createData} updateData={updateData } dataToEdit={dataToEdit} setDataToEdit={setDataToEdit}/>
                </Route>

                <Route exact path="/editar/:id">
                   <CrudFormApi createData={createData} updateData={updateData } dataToEdit={dataToEdit} setDataToEdit={setDataToEdit}/>
                </Route>

                <Route path="*" children={<Error404/>}></Route>
            </Switch>
        </HashRouter>
    
    </div>
    )
};

export default CrudApi
