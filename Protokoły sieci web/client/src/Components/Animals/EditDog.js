import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { selectDogById } from '../../app/store/dogListApi-slice'

import EditAnimalForm from './EditAnimalForm'

import { useGetDogsQuery } from '../../app/store/dogListApi-slice'

const EditDog = () => {

    const { id } = useParams()

    const dog = useSelector(state => selectDogById(state, id))

    console.log(dog);

    const content = dog ? <EditAnimalForm animal={dog} /> : <p>Loading...</p>

    return content
}
export default EditDog