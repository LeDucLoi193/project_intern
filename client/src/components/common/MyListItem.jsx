import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types';
import React from 'react';
import { useStyles } from '../../customStyles/SidebarStyles';

function MyListItem({ index, styleIcon, icon, name, isChoose, linkTo, onItemClick }) {
	const classes = useStyles();

	const handleOnItemClick = () => {
		onItemClick && onItemClick(name);
	}

	return (
		<ListItem 
			button 
			key={index} 
			className={isChoose ? classes.listIsChoose : ""}
			onClick={handleOnItemClick}
		>
			<ListItemIcon className={isChoose ? classes.listItemIconIsChoose : styleIcon}>
				{icon}
			</ListItemIcon>
			<ListItemText primary={name}/>
		</ListItem>
	)
}

MyListItem.propTypes = {
	index: PropTypes.number,
	styleIcon: PropTypes.string,
	icon: PropTypes.node,
	name: PropTypes.string,
	isChoose: PropTypes.bool,
	linkTo: PropTypes.string,
	onItemClick: PropTypes.func,
}
MyListItem.defaultProps = {
	index: null,
	styleIcon: "",
	icon: null,
	name: "",
	isChoose: false,
	linkTo: "",
	onItemClick: null,
}

export default MyListItem


