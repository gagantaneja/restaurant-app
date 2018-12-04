import React from 'react';
import { StyleSheet, Text, Image, View, TouchableOpacity, BackHandler } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Dropdown } from 'react-native-material-dropdown';
import theme from './common/theme';
import StatusBar from './common/statusbar';
import AppStatusBar from './common/appstatusbar';
import Next from '../../images/next.png';
import Back from '../../images/lightback.png';

export default class Step2 extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
    		dishes: null,
    		restaurants: null,
    		selectedRestaurant: "",
  		};
  		this.onNext = this.onNext.bind(this);
  	}
  	componentWillMount() {
  		var newarr = [];
  		var flags = [];
  		var restaurants = this.props.restaurants;
	  	for( i=0; i<restaurants.length; i++) {
	    	if(flags[restaurants[i].value]) continue;
		    flags[restaurants[i].value] = true;
		    var data={};
		    data.value = restaurants[i].value;
		    newarr.push(data);
		}
		this.setState({restaurants: newarr});
  	}
  	onRestaurantChange(value, index, data) {
  		this.setState({selectedRestaurant: value}, () => {
			requestAnimationFrame(() => this.changePrefrence(value), 0);
		});
  	}
  	changePrefrence(value) {
  		var dishes = [];
  		var restaurants = this.props.restaurants;
  		for(i = 0; i < restaurants.length; i++) {
  			if(value === restaurants[i].value) {
  				data = {}
  				data.value = restaurants[i].dish;
  				dishes.push(data);
  			}
  		}
  		this.setState({dishes: dishes});
  	}
  	onNext() {
  		if(!this.state.selectedRestaurant) {
  			alert("Please Select a Restaurant")
  		}
  		else {
  			Actions.push('step3',{finalPersons: this.props.finalPersons, finalMeal: this.props.finalMeal, finalRestaurant: this.state.selectedRestaurant, dishes: this.state.dishes})
  		}
  	}
  	goBack() {
  		Actions.pop();
  	}
	render() {
		return (
			<View style={styles.container}>
				<StatusBar bColor={theme.dark} />
				<AppStatusBar bColor={theme.dark} left={true} Back={Back} leftFunction={this.goBack} center={true} text="Step 2" textColor={theme.white} />
				<View style={styles.mainFlex}>
					<View style={styles.pickerContainer}>
						<Dropdown
						  containerStyle={styles.pickerStyle}
						  animationDuration={50}
				      	  label='Please Select a restaurant'
				      	  value={this.state.selectedRestaurant}
				      	  data={this.state.restaurants}
				      	  labelFontSize = {15}
				      	  rippleCentered={true}
				      	  onChangeText = {(value, index, data) => this.onRestaurantChange(value, index, data)}
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
		width: '100%',
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