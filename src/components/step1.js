import React from 'react';
import { StyleSheet, Text, Image, View, TouchableOpacity, BackHandler } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Dropdown } from 'react-native-material-dropdown';
import theme from './common/theme';
import StatusBar from './common/statusbar';
import AppStatusBar from './common/appstatusbar';
import Next from '../../images/next.png';
import Dishes from '../dishes.json';

export default class Step1 extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
    		restaurants: null,
    		selectedMealType: "",
    		selectedNoOfPeople: 1
  		};
  		this.onNext = this.onNext.bind(this);
  	}
  	onMealChange(value, index, data) {
  		this.setState({selectedMealType: value}, () => {
			requestAnimationFrame(() => this.changePrefrence(value), 0);
		});
  	}
  	changePrefrence(value) {
  		var restaurants = [];
  		for(i = 0; i < Dishes.dishes.length; i++) {
  			for (j = 0; j < Dishes.dishes[i].availableMeals.length; j++) {
  				if(value.toUpperCase() === Dishes.dishes[i].availableMeals[j].toUpperCase()) {
  					var data = {};
  					data.id = Dishes.dishes[i].id;
  					data.value = Dishes.dishes[i].restaurant;
  					data.dish = Dishes.dishes[i].name;
  					restaurants.push(data);
  				}
  			}
  		}
  		console.log(restaurants);
  		this.setState({restaurants: restaurants});
  	}
  	onPersonChange(value, index, data) {
  		this.setState({selectedNoOfPeople: value});
  	}
  	onNext() {
  		if(!this.state.selectedMealType) {
  			alert("Please Select a Valid Meal")
  		}
  		else {
  			Actions.push('step2', {finalPersons: this.state.selectedNoOfPeople, finalMeal: this.state.selectedMealType,restaurants: this.state.restaurants});
  		}
  	}
  	
	render() {
		let mealType = [{
	      value: 'Breakfast',
	    }, {
	      value: 'Lunch',
	    }, {
	      value: 'Dinner',
	    }];

	    let noOfPeople =[{
	    	value: 1
	    }, {
	    	value: 2
	    }, {
	    	value: 3
	    }, {
	    	value: 4
	    }, {
	    	value: 5
	    }, {
	    	value: 6
	    }, {
	    	value: 7
	    }, {
	    	value: 8
	    }, {
	    	value: 9
	    }, {
	    	value: 10
	    }];
		return (
			<View style={styles.container}>
				<StatusBar bColor={theme.dark} />
				<AppStatusBar bColor={theme.dark} center={true} text="Step 1" textColor={theme.white} />
				<View style={styles.mainFlex}>
					<View style={styles.pickerContainer}>
						<Dropdown
						  containerStyle={styles.pickerStyle}
						  animationDuration={50}
				      	  label='Please Select a meal'
				      	  value={this.state.selectedMealType}
				      	  data={mealType}
				      	  labelFontSize = {15}
				      	  rippleCentered={true}
				      	  onChangeText = {(value, index, data) => this.onMealChange(value, index, data)}
				      	/>
				     </View>
				     <View style={styles.pickerContainer}>
						<Dropdown
						  containerStyle={styles.pickerStyle}
						  animationDuration={50}
						  pickerStyle={styles.pickStyle}
				      	  label='Please Enter Number of people'
				      	  value={this.state.selectedNoOfPeople}
				      	  data={noOfPeople}
				      	  labelFontSize = {15}
				      	  rippleCentered={true}
				      	  onChangeText = {(value, index, data) => this.onPersonChange(value, index, data)}
				      	/>
				     </View>
				</View>
				<TouchableOpacity style={styles.nextButton} onPress={this.onNext}>
					<Image style={styles.nextIcon} source={Next} />
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: theme.white,
		alignItems: 'center'
	},
	mainFlex: {
		flex: 1,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center'
	},
	pickerContainer: {
		width: '80%',
		alignItems: 'flex-start',
		justifyContent: 'center',
		paddingVertical: 10
	},
	pickerStyle: {
		maxHeight: 400,
		width: '100%',
	},
	pickStyle: {
		height: 200
	},
	nextButton: {
		position: 'absolute',
		bottom: 20,
		right: 20
	},
	nextIcon: {
		height: 60,
		width: 60	
	}
});