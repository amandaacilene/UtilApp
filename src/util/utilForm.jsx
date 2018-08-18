import React, { Component } from 'react' 
import { connect } from 'react-redux' 
import { bindActionCreators } from 'redux'

import Grid from '../template/grid'
import IconButton from '../template/iconButton'
import { add, changeDescription, search, clear} from './utilActions'

class UtilForm extends Component { 
    constructor(props) {
        super(props)
        this.keyHandler = this.keyHandler.bind(this) 
    }

    componentWillMount() { 
        this.props.search()
    }

    keyHandler(e) {
        const { add, search, description } = this.props
        if(e.key === 'Enter'){
            e.shiftKey ? search() : add(description) 
        } else if(e.key === 'Escape') {
            this.props.clear()
        }
    }
    render() { 
        const { add, search, description } = this.props
        return (
            <div role='form' className='utilForm'>
                <Grid cols='12 9 10'>
                    <input id='description' className='form-control' 
                    placeholder='Adicione uma tarefa' 
                    onChange={this.props.changeDescription} 
                    onKeyUp={this.keyHandler} value={this.props.description}></input>
                </Grid>

                <Grid cols='12 3 2'>
                    <IconButton style='primary' icon='plus' onClick={() => add(description)}></IconButton>
                    <IconButton style='info' icon='search' onClick={search}></IconButton>
                    <IconButton style='default' icon='close' onClick={this.props.clear}></IconButton>
                </Grid>
            </div>
        )
    } 
}
const mapStateToProps = state => ({description: state.util.description}) 
const mapDispatchToProps = dispatch =>
    bindActionCreators({ add, changeDescription, search, clear}, dispatch) 
export default connect(mapStateToProps, mapDispatchToProps)(UtilForm)

 