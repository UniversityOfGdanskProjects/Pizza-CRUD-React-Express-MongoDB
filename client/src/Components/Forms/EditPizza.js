import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectPizzaById } from '../../app/store/pizzaListApi-slice'
import EditPizzaForm from './EditPizzaForm'

const EditPizza = () => {

    const { id } = useParams()

    const pizza = useSelector(state => selectPizzaById(state, id))

    const content = pizza ? <EditPizzaForm pizza={pizza} /> : <p>Loading...</p>

    return content
}
export default EditPizza