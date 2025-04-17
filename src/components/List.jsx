import { useState } from 'react';

const List = (props) => {

    //varibles de estado 
        //guarda el indice que esta siendo editado
    const [editingIndex, setEditingIndex] = useState(null);
        //guarda el valor del producto que esta siendo editado
    const [editedValue, setEditedValue] = useState({});
    const [error, setError] = useState('');

    //guardar 
    const editProduct = (index) => {
        setEditingIndex(index);
        setEditedValue(props.list.items[index])
    };

    const handleEditChange = (e) => {
        const {name, value} = e.target;
        setEditedValue(prevState => ({...prevState, [name]: value}))
    };

    const saveEditedProduct = () => {
        const updatedProducts = props.list.items;
        if (!editedValue.name.trim()) {
            setError('El nombre es obligatorio.');
        } else {
            if (!Number.isInteger(Number(editedValue.amount)) || Number(editedValue.amount) <= 0) {
                setError('Por favor, ingrese un número entero válido.');
            } else {
                setError('');
                updatedProducts[editingIndex] = editedValue;
                props.onEditList(updatedProducts, props.posList);
                setEditingIndex(null);
            }
        }
    };

    const removeProduct = (index) => {
        const new_products = props.list.items.filter((_, i) => i !== index);
        props.onEditList(new_products, props.posList);
    };
    

    const handleCheckboxChange = (index) => {
        if (!props.list.items[index].check) {
            const updatedProducts = [...props.list.items];
            updatedProducts[index].check = !updatedProducts[index].check;
            let Aux = updatedProducts[index];
            updatedProducts.splice(index, 1);
            updatedProducts.push(Aux);
            props.onEditList(updatedProducts, props.posList);
        }
        else {
            for (let i = 0; i < (props.list.items.length); i++) {
                const updatedProducts = [...props.list.items];
                if (props.list.items[i].check && i != 0) {
                    updatedProducts[index].check = !updatedProducts[index].check;
                    let Aux1 = updatedProducts[index];
                    let Aux2 = updatedProducts[i];
                    updatedProducts[index] = Aux2;
                    updatedProducts[i] = Aux1;
                    props.onEditList(updatedProducts, props.posList);
                    break;
                } else if (i === index) {
                    updatedProducts[index].check = !updatedProducts[index].check;
                    props.onEditList(updatedProducts, props.posList);
                    break;
                }
            }
        }
    };
    
    return (
        <div className="list">
            <ul>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {props.list.items.map((product, index) => (
                <li key={product.names}>
                    {editingIndex === index ? (
                        <div className="list_elements">
                            <div className='list_elements_i'>
                                <input type="text" name="name" value={editedValue.name} onChange={handleEditChange}/>
                                <input className="input_Number" type="number" name="amount" value={editedValue.amount} onChange={handleEditChange}/>
                            </div>
                            <div className='list_elements_d'>
                            <button onClick={() => saveEditedProduct(index)}><img src={props.list.icons.check} alt="Aceptar" width={20} height={20}/></button>
                            </div>
                        </div>
                    ) : (
                        <div className="list_elements">
                            <div className='list_elements_i'>
                                <input type="checkbox" onChange={() => handleCheckboxChange(index)} checked={product.check}/>
                                <span style={{textDecoration: product.check ? "line-through" : "none" }}>
                                    {product.name} - {product.amount}
                                </span>
                            </div>
                            <div className='list_elements_d'>
                                <button onClick={() => removeProduct(index)}><img src={props.list.icons.trash} alt="Eliminar" width={20} height={20}/></button>
                                <button onClick={() => editProduct(index)}><img src={props.list.icons.pen} alt="Editar" width={20} height={20}/></button>
                            </div>
                        </div>
                    )}
                </li>
                ))}
            </ul>
        </div>
    );
}

export default List;