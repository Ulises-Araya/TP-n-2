import Form from './Form';
import List from './List';
//iconos
import trash_green from '../Images/trash_green.png';
import pen_green from '../Images/pen_green.png';
import check_green from '../Images/check_green.png';
import tash_pink from '../Images/trash_pink.png';
import pen_pink from '../Images/pen_pink.png';
import check_pink from '../Images/check_pink.png';
import tash_blue from '../Images/trash_blue.png';
import pen_blue from '../Images/pen_blue.png';
import check_blue from '../Images/check_blue.png';
import tash_yellow from '../Images/trash_yellow.png';
import pen_yellow from '../Images/pen_yellow.png';
import check_yellow from '../Images/check_yellow.png';

import { useState } from "react";

const Tab = () => {

    //varibles de estado 
    const [lists, setLists] = useState([]);
    const [newListName, setNewListName] = useState("");
    //iconos
    const icon = {verde: {
        trash: trash_green,
        pen: pen_green,
        check: check_green
      }, rosa: {
        trash: tash_pink,
        pen: pen_pink,
        check: check_pink
      }, azul: {
        trash: tash_blue,
        pen: pen_blue,
        check: check_blue
      }, amarillo: {
        trash: tash_yellow,
        pen: pen_yellow,
        check: check_yellow
      }
    }

    //cambio de color
    const colorChangList = (posList, color) => {
      const updatedLists = [...lists];
      if (color == "verde"){
        updatedLists[posList] = {...updatedLists[posList], background: color, icons: icon.verde};
        setLists(updatedLists);
      }
      else {
        if (color == "rosa"){
          updatedLists[posList] = {...updatedLists[posList], background: color, icons: icon.rosa};
          setLists(updatedLists);
        }
        else {
          if (color == "azul"){
            updatedLists[posList] = {...updatedLists[posList], background: color, icons: icon.azul};
            setLists(updatedLists);
          }
          else {
            updatedLists[posList] = {...updatedLists[posList], background: color, icons: icon.amarillo};
            setLists(updatedLists);
          }
        }
      }
    }

    //añadir lista
    const addList = () => {
      if (newListName.trim()) {
        setLists([...lists, {icons: icon.verde, background: "verde", nombre: newListName, items: []}]);
        setNewListName("");
      }
    };
    
    //editar lista
    const editList = (element, posList) => {
      const updatedLists = [...lists];
      updatedLists[posList] = {...updatedLists[posList], items: element};
      setLists(updatedLists);
    }

    //añadir producto
    const addProduct = (listIndex, product) => {
        const updatedLists = [...lists];
        updatedLists[listIndex].items.unshift(product);
        setLists(updatedLists);
    };
    
    //eliminar lista
    const deleteList = (index) => {
      setLists(lists.filter((_, i) => i !== index));
    };

    return (
      <div>
            <div className="create_list">
              <input value={newListName} onChange={(e) => setNewListName(e.target.value)} placeholder="Nombre de la lista" />
              <button onClick={addList}>Crear Lista</button>
            </div>
            <div className="tabs_conteiner">
                {lists.map((list, index) => (
                  <div key={list.nombre} className={`tab ${list.background}`}>
                    <div className="tab_color">
                      <select id="color-options" value={list.background} name="color-options" onChange={(event) => colorChangList(index, event.target.value)}>
                        <option value="rosa">Rosa</option>
                        <option value="verde">Verde</option>
                        <option value="azul">Azul</option>
                        <option value="amarillo">Amarillo</option>
                      </select>
                    </div>
                    <div className="tab_rest">
                        <Form index={index} list={list} l_length={lists.length} onAddProduct={addProduct} icon={icon} onDeleteList={() => deleteList(index)}/>
                        <List posList={index} list={list} onEditList={editList}/>
                    </div>
                  </div>
                ))}
            </div>
        </div>
  );
};

export default Tab;