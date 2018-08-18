import React from 'react' 

import PageHeader from '../template/pageHeader' 
import UtilForm from './utilForm'
import UtilList from './utilList'

export default props => (
    <div>
        <PageHeader name='Tarefas' small='Cadastro'></PageHeader> 
            <UtilForm />
        <UtilList />
    </div> 
)