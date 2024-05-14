import { useEffect, useState } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import { useAuth } from './security/AuthContext'
import { createTodoApi, retrieveTodoApi, updateTodoApi } from '../api/TodoApiService'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import moment from 'moment'

export default function TodoComponent() {
    
       
    const {id} = useParams()
    const today = new Date();
    const[targetDate, setTargetDate] = useState(formatDate(today))
    const yesterday = new Date(today.setDate(today.getDate() - 1))
    const[description, setDescription] = useState('')
    

    const authContext = useAuth()
    const username = authContext.username
    const navigate = useNavigate()
    
    useEffect(
        () => retrieveTodos()
        )
        // useEffect(
        //     () => retrieveTodos(),
        //     [id]
        //     )
    

        function retrieveTodos(){
        if(id!==-1)
            {retrieveTodoApi(username, id)
            .then(response => {
                setDescription(response.data.description)
                setTargetDate(response.data.targetDate)
            })
            .catch(error => console.log(error))}
        }
    
        function onSubmit(values) {
            console.log(values)
            const todo = {
                id :id,
                username : username,
                description : values.description,
                targetDate : values.targetDate,
                done: false
            }
            if(id===-1){
                createTodoApi(username,todo)
                .then(response => {
                    console.log("success")
                    navigate('/todos')
                })
                .catch(error => console.log(error))
            }else{
                updateTodoApi(username,id,todo)
                .then(response => {
                    console.log("success")
                    navigate('/todos')
                })
                .catch(error => console.log(error))
            }
            
        }
    
        function validate(values) {
            let errors = {
                // description: 'Enter a valid description',
                // targetDate: 'Enter a valid target date'
            }
            
            if(values.description.length<3) {
                errors.description = 'Enter atleast 3 characters'
            }
        
            if(values.targetDate === null || values.targetDate === '' || moment(values.targetDate).isBefore(yesterday) ) {
                console.log(`Yesterday : ${yesterday}, TargetDate : ${values.targetDate}`)
                errors.targetDate = 'Enter a valid target date'
            }
    
    
            return errors
        }
    
    
      return (
        <div className="container">
            <h1>Enter Todo Details </h1>
            <div>
                <Formik initialValues={ { description, targetDate } } 
                    enableReinitialize = {true}
                    onSubmit = {onSubmit}
                    validate = {validate}
                    validateOnChange = {false}
                    validateOnBlur = {false}
                >
                {
                    (props) => (
                        <Form>
                            <ErrorMessage 
                                name="description"
                                component="div"
                                className = "alert alert-warning"
                            />
                            
                            <ErrorMessage 
                                name="targetDate"
                                component="div"
                                className = "alert alert-warning"
                            />

                            <fieldset className="form-group">
                                <label>Description</label>
                                <Field type="text" className="form-control" name="description" />
                            </fieldset>
                            <fieldset className="form-group">
                                <label>Target Date</label>
                                <Field type="date" className="form-control" name="targetDate"/>
                            </fieldset>
                            <div>
                                <button className="btn btn-success m-5" type="submit">Save</button>
                            </div>
                        </Form>
                    )
                }
                </Formik>
            </div>

        </div>
    )
}
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}
 