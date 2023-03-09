import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { selectCatById } from '../../app/store/catListApi-slice'

import EditAnimalForm from './EditAnimalForm'

import { useGetCatsQuery } from '../../app/store/catListApi-slice'

const EditCat = () => {

    const { id } = useParams()

    const cat = useSelector(state => selectCatById(state, id))

    console.log(cat);

    const content = cat ? <EditAnimalForm animal={cat} /> : <p>Loading...</p>

    return content
}
export default EditCat