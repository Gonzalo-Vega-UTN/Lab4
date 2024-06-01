import Instrumento from "../../entities/Instrumento";
interface Props{
    cantidad: number;
    item : Instrumento
}
export function CartItem({cantidad, item}: Props) {
    return (
        <div key={item.id}>
            <span>
                <div>
                    <strong>{item.instrumento}</strong> - ${Number(item.precio) * cantidad}
                </div>
                <div>
                    <b>{cantidad} {cantidad == 1 ? 'unidad' : 'unidades'} </b>
                </div>
            </span>
            <hr></hr>
        </div>
    )
}