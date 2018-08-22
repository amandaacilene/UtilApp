import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import IconButton from '../template/iconButton'
import { markAsDone, markAsPending, remove, edit} from './utilActions'

const UtilList = props => {
    const renderRows = () => {
        const list = props.list || [] 
        return list.map(util => (
            <tr key={util._id}>
                <td className={util.done ? 'markAsDone' : ''}>{util.description}</td>
                <td>
                <IconButton style='edit' icon='edit' hide={util.done}
                        onClick={() => props.edit(util)}></IconButton>
                    <IconButton style='success' icon='check' hide={util.done}
                        onClick={() => props.markAsDone(util)}></IconButton>
                    <IconButton style='warning' icon='undo' hide={!util.done}
                        onClick={() => props.markAsPending(util)}></IconButton>
                    <IconButton style='danger' icon='trash-o' hide={!util.done}
                        onClick={() => props.remove(util)}></IconButton>
                </td> 
            </tr>
        )
    ) 
}
    return (
        <table className='table'>
            <thead><tr>
                <th>Descrição</th>
                <th className='tableActions'>Ações</th></tr>
                    </thead>
                    <tbody>
                        {renderRows()}
                    </tbody>
        </table> 
    )
}

const mapStateToProps = state => ({list: state.util.list})
const mapDispatchToProps = dispatch =>
    bindActionCreators({ markAsDone, markAsPending, remove, edit}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(UtilList)