import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import Instrumento  from "../entities/Instrumento";
import { useNavigate, useParams } from "react-router-dom";
import { getInstrumentoXIdFetch, saveInstrumento } from "../services/ApiInstrumentos";
import { getCategoriasFetch } from "../services/ApiCategorias";
import CategoriaInstrumento from "../entities/CategoriaInstrumento";



const FormInstrumento = () => {

const navigate = useNavigate();
    const { idInstrumento } = useParams();

    const [categorias, setCategorias ] = useState<CategoriaInstrumento[]>([])
    const [txtValidacion, setTxtValidacion] = useState<string>("");

    const [instrumento, setInstrumento] = useState<Instrumento>({
        id: "",
        instrumento: "",
        marca: "",
        modelo: "",
        imagen: "",
        precio: "",
        costoEnvio: "",
        cantidadVendida: "",
        descripcion: "",
        categoriaInstrumento: { id: "", denominacion: "" }, 
    });

    const getinstrumento = async () => {
        if(Number(idInstrumento) !== 0){
            const instrumentoSelect: Instrumento = await getInstrumentoXIdFetch(Number(idInstrumento));
            setInstrumento(instrumentoSelect);
        }
      
    }
    const getCategorias = async () => {
        const categorias: CategoriaInstrumento[] = await getCategoriasFetch();
        setCategorias(categorias);
    }


    useEffect(() => {
        getinstrumento();
        getCategorias();
    }, []);

 

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) : void => {
        const { name, value } = e.target;
        setInstrumento(prevInstrumento => ({
          ...prevInstrumento,
          [name]: value
        }));
      };
    
      const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) : void => {
        let categoria = categorias.filter(c =>  c.id == e.target.value)[0]
        setInstrumento(prevInstrumento => ({
          ...prevInstrumento,
          categoriaInstrumento: categoria
        }));
      };
    


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        save();
        
    };

    const save = async () => {
        if(instrumento.instrumento == undefined || instrumento.instrumento === ""){
            setTxtValidacion("Ingrese el nombre del instrumento");
            return;
        }
        if(instrumento.precio == undefined || Number(instrumento.precio) < 0){
            setTxtValidacion("El precio debe ser mayor o igual a cero");
            return;
        }
        if(instrumento.imagen == undefined || instrumento.imagen === ""){
            setTxtValidacion("Agregue una imagen");
            return;
        }
        if(instrumento.categoriaInstrumento?.denominacion == undefined || instrumento.categoriaInstrumento?.denominacion === ""){
            setTxtValidacion("Ingrese el rubro del instrumento");
            return;
        }
        if(instrumento.descripcion == undefined || instrumento.descripcion === ""){
            setTxtValidacion("Ingrese la descripción del instrumento");
            return;
        }
        if(instrumento.marca == undefined || instrumento.marca === ""){
            setTxtValidacion("Ingrese la marca");
            return;
        }
        if(instrumento.modelo == undefined || instrumento.modelo === ""){
            setTxtValidacion("Ingrese el modelo");
            return;
        }
        if(instrumento.cantidadVendida == undefined || Number(instrumento.cantidadVendida) < 0 ){
            setTxtValidacion("Agregue una cantidad vendida mayor o igual a cero");
            return;
        }
        
       
        
       await saveInstrumento(instrumento);
       navigate('/gestion'); 
    }
    
    return (
        <Form style={{ maxWidth: "50%" }} className="p-5 m-auto" onSubmit={handleSubmit}>

            <Form.Group controlId="formInstrumento">
                <Form.Label>Instrumento</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Nombre del instrumento"
                    name="instrumento"
                    value={instrumento.instrumento}
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group controlId="formMarca">
                <Form.Label>Marca</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Marca"
                    name="marca"
                    value={instrumento.marca}
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group controlId="formModelo">
                <Form.Label>Modelo</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Modelo"
                    name="modelo"
                    value={instrumento.modelo}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group controlId="formModelo">
                <Form.Label>Imagen</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Imagen url"    
                    name="imagen"
                    value={instrumento.imagen}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group controlId="formModelo">
                <Form.Label>Precio</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="precio"
                    name="precio"
                    value={instrumento.precio}
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group controlId="formModelo">
                <Form.Label>Costo Envio</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="costoEnvio"
                    name="costoEnvio"
                    value={instrumento.costoEnvio}
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group controlId="formModelo">
                <Form.Label>Cantidad Vendida</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="cantidadVendida"
                    name="cantidadVendida"
                    value={instrumento.cantidadVendida}
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group controlId="formModelo">
                <Form.Label>descripcion</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="descripcion"
                    name="descripcion"
                    value={instrumento.descripcion}
                    onChange={handleChange}
                />
            </Form.Group>


            <Form.Group controlId="formCategoria">
                <Form.Label>Categoria</Form.Label>
                <Form.Control
                    as="select"
                    name="categoriaInstrumento"
                    value={instrumento.categoriaInstrumento?.id}
                    onChange={handleChangeSelect}
                >
                    <option value="">Selecciona una categoría</option>
                    {categorias.map(categoria => (
                    <option key={categoria.id} value={categoria.id}>{categoria.denominacion}</option>

                    ))}
                    {/* Agrega más opciones según tu lista de categorías */}
                </Form.Control>
            </Form.Group>
            <h3 className="text-danger">{txtValidacion}</h3>
            <Button variant="primary" type="submit">
                Crear Instrumento
            </Button>
        </Form>
    );
};

export default FormInstrumento;

