import React from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../actions'
import AddTodo from '../components/AddTodo.one';

const mapDispatchToProps = (dispatch, ownProps) => ({
    onSubmit: input => dispatch(addTodo(input))
})

export default connect(state => state , mapDispatchToProps)(AddTodo)
