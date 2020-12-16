import React, { useState, useEffect } from "react";
import { firebase } from "./firebase";

const App = () => {
  const [tareas, setTareas] = useState([]);
  const [tarea, setTarea] = useState("");
  const [id, setId] = useState("");
  const [modoEdicion, setModoEdicion] = useState(false);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const db = firebase.firestore();
        const data = await db.collection("tareas").get();
        // console.log(data.docs);
        const arrayData = data.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // console.log(arrayData);
        setTareas(arrayData);
      } catch (error) {
        console.log(error);
      }
    };

    obtenerDatos();
  }, []);

  const agregar = async (e) => {
    e.preventDefault();

    if (!tarea.trim()) {
      console.log("esta vacio");
      return;
    }
    try {
      
      const db = firebase.firestore();
      const nuevaTarea = {
        name: tarea,
        fecha: Date.now()
      }
      const data = await db.collection('tareas').add(nuevaTarea);

      setTareas([
        ...tareas,
        {...nuevaTarea, id: data.id}
      ])
      setTarea("");
    } catch (e) {
      console.log(e);
    }
  };

  const eliminar = async (id) => {
      try {
        const db = firebase.firestore()
        await db.collection('tareas').doc(id).delete();
        const arrayFiltrado = tareas.filter(item => item.id !== id)
        setTareas(arrayFiltrado);

      } catch (e) {
        console.log(e);
      }
  }

  const activarEdicion = (item) =>{
      setModoEdicion(true)
      setTarea(item.name)
      setId(item.id)
  }

  const editar = async (e) =>{
    e.preventDefault();
    if (!tarea.trim()) {
      console.log("esta vacio");
      return;
    }

    try {
      const db = firebase.firestore()
      await db.collection('tareas').doc(id).update({

        name: tarea
      })
      const arrayEditado = tareas.map(item =>(
        item.id === id ? {id: item.id, fecha: item.fecha, name: tarea } : item
      ))
      setTareas(arrayEditado)
      setModoEdicion(false)
      setTarea('')
      setId('')

    } catch (error) {
      console.log(error);
    }

  }

  return (
    <div className="container mb-2">
      <div className="row">
      <div className="col-md-6">
            <h3>Lista de Tareas</h3>
            <ul className="list-group">
            {
                tareas.map(item => (
                <li className="list-group-item" key={item.id}>
                  <span>{item.name}</span>
                    <button 
                        className="btn btn-danger btn-sm float-right"
                        onClick={()=> eliminar(item.id)}
                    >
                        Eliminar
                    </button>
                    <button 
                        className="btn btn-warning btn-sm float-right mr-2"
                        onClick={()=> activarEdicion(item)}
                    >
                        Editar
                    </button>
                </li>
                ))
            }
            </ul>
        </div>
        <div className="col-md-6">
          <h3>
            {
              modoEdicion ? 'Editar Tarea' : 'Agregar Tarea'
          }
          </h3>
          <form onSubmit={modoEdicion ? editar : agregar}>
            <input
              type="text"
              placeholder="ingrese tarea"
              className="form-control mb-2"
              onChange={(e) => setTarea(e.target.value)}
              value={tarea}
            />
            <button
             className= {
               modoEdicion ? 'btn btn-warning btn-block':'btn btn-dark btn-block'
              }
              type="submit"
              >
              {
                modoEdicion ? 'Editar' : 'Agregar' 
              }
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;
