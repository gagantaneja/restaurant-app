import React from 'react';
import { StyleSheet, Text, Image, View, TouchableOpacity, BackHandler } from 'react-native';
import { Actions } from 'react-native-router-flux';
import theme from './common/theme';
import StatusBar from './common/statusbar';
import AppStatusBar from './common/appstatusbar';
import Back from '../../images/lightback.png';

export default class Review extends React.Component {
	goBack() {
  		Actions.pop();
  	}
  	onSubmit() {
  		alert("Order Placed Successfully!")
  	}
	render() {
		return(
			<View style={styles.container}>
				<StatusBar bColor={theme.dark} />
				<AppStatusBar bColor={theme.dark} left={true} Back={Back} leftFunction={this.goBack} center={true} text="Review" textColor={theme.white} />
				<View style={styles.optionFlex}>
					<View style={styles.heading}>
						<Text style={styles.headingText}>
							Meal
						</Text>
					</View>
					<View style={styles.content}>
						<Text style={styles.headingText}>
							{this.props.finalMeal}
						</Text>
					</View>
				</View>
				<View style={styles.optionFlex}>
					<View style={styles.heading}>
						<Text style={styles.headingText}>
							No. of People
						</Text>
					</View>
					<View style={styles.content}>
						<Text style={styles.headingText}>
							{this.props.finalPersons}
						</Text>
					</View>
				</View>
				<View style={styles.optionFlex}>
					<View style={styles.heading}>
						<Text style={styles.headingText}>
							Restaurant
						</Text>
					</View>
					<View style={styles.content}>
						<Text style={styles.headingText}>
							{this.props.finalRestaurant}
						</Text>
					</View>
				</View>
				<View style={styles.optionFlex}>
					<View style={styles.heading}>
						<Text style={styles.headingText}>
							Dishes
						</Text>
					</View>
					<View style={styles.content}>
						<Text style={styles.headingText}>
							{this.props.dishes.map((value, i) => {
		                    	return(<Text key={i} style={styles.headingText}>{value.dish}  -  {value.quantity} {'\n'}</Text>)
		                	})}
						</Text>
					</View>
				</View>
				<TouchableOpacity style={styles.submitButton} onPress={this.onSubmit}>
					<Text style={styles.submitText}>Submit</Text>
				</TouchableOpacity>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: '100%',
		backgroundColor: theme.white,
		alignItems: 'center'
	},
	optionFlex: {
		flexDirection: 'row',
		width: '90%',
		paddingVertical: 20
	},
	heading: {
		flex: 0.35,
		alignItems: 'center'
	},
	content: {
		flex: 0.65,
		alignItems: 'center'
	},
	headingText: {
		fontSize: 16
	},
	submitButton: {
		position: 'absolute',
		bottom: 25,
		right: 25,
		width: 100,
		height: 40,
		borderRadius: 20,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'green'
	},
	submitText: {
		fontSize: 14,
		color: theme.white
	},
});