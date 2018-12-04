import React from 'react';
import { StyleSheet, Text, Image, View, TouchableOpacity, BackHandler } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import theme from './common/theme';

export default class Step3 extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			selectedServing: 1,
			selectedDish: ""
		}
	}
	componentWillMount() {
		this.setState({selectedDish: this.props.dish})
		this.setState({selectedServing: this.props.quantity})
	}
	componentWillReceiveProps(nextProps) {
		this.setState({selectedDish: nextProps.dish})
		this.setState({selectedServing: nextProps.quantity})
	}
	render() {
		return(
			<View style={styles.itemContainer}>
				<View style={styles.pickerContainer}>
					<Dropdown
						containerStyle={styles.pickerStyle}
						animationDuration={50}
				      	label='Select a dish'
				      	value={this.state.selectedDish}
				      	data={this.props.dishes}
				      	labelFontSize = {12}
				      	rippleCentered={true}
				      	onChangeText = {(value, index, data) => this.props.onDishChange(value, index, data, this.props.index)}	
				    />
				</View>
				<View style={styles.servingPickerContainer}>
					<Dropdown
						containerStyle={styles.pickerStyle}
						animationDuration={50}
				      	label='Qt.'
				      	value={this.state.selectedServing}
				      	data={this.props.servingsData}
				      	labelFontSize = {12}
				      	rippleCentered={true}
				    	onChangeText = {(value, index, data) => this.props.onQuantityChange(value, index, data, this.props.index)}
				    />
				</View>
			</View>
		);
	}
}
const styles = StyleSheet.create ({
	itemContainer: {
		flexDirection: 'row',
		width: '90%'
	},
	pickerContainer: {
		width: '70%',
		maxHeight: 400,
		alignItems: 'flex-start',
		justifyContent: 'center',
		paddingVertical: 10,
		paddingRight: 10
	},
	servingPickerContainer: {
		width: '30%',
		alignItems: 'flex-start',
		justifyContent: 'center',
		paddingVertical: 10
	},
	pickerStyle: {
		width: '100%',
	},
});