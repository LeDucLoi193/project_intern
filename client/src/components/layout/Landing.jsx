import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router'

function Landing(props) {
	return (
		<Redirect to="/login" />
	)
}

Landing.propTypes = {

}

export default Landing

