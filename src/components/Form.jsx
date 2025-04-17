import { useState } from 'react';

const Form = (props) => {

    const [error, setError] = useState('');
    const [Nom_Num, setNom_Num] = useState({name_product: "", amount: ""});

    const handleEditChange = (event) => {
        const {name, value} = event.target;
        setNom_Num(prevState => ({...prevState, [name]: value}))
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        if (!Nom_Num.name_product.trim()) {
            setError('El nombre es obligatorio.');
        } else {
            if (!Number.isInteger(Number(Nom_Num.amount)) || Number(Nom_Num.amount) <= 0) {
                setError('Por favor, ingrese un número entero válido.');
            } else {
                setError('');
                const new_name = Nom_Num.name_product;
                const new_amount = Nom_Num.amount;
                let new_product = {
                    name: new_name, 
                    amount: new_amount,
                    check: false
                };

                props.onAddProduct(props.index, new_product);
                
                setNom_Num({name_product: "", amount: ""});
            }
        }
    };

    return (
        <div>
            <h3>{props.list.nombre}</h3>
            <form onSubmit = {handleSubmit} className="form">
                <div className="form_name">
                    <label for="name_product">Producto: </label>
                    <input type="text" value={Nom_Num.name_product} id="name_product" name="name_product" onChange={handleEditChange}/>
                </div>
                <div className="form_amount">
                    <label for="amount">Cantidad: </label>
                    <input className="input_Number" type="number" value={Nom_Num.amount} id="amount" name="amount" onChange={handleEditChange}
                    onKeyDown={(e) => {if (e.key === "e" || e.key === "E" || e.key === "+" || e.key === "-") {e.preventDefault();}}}/>
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <div className="buttons">
                    <button type="submit">Agregar</button>
                    <button onClick={props.onDeleteList}>Eliminar Lista</button>
                </div>
            </form>
        </div>
    )
}

export default Form;