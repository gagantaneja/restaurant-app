import React from 'react';
import { StyleSheet, Text, Image, View, TouchableOpacity, ScrollView, BackHandler } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Dropdown } from 'react-native-material-dropdown';
import theme from './common/theme';
import StatusBar from './common/statusbar';
import AppStatusBar from './common/appstatusbar';
import DishItem from './dishitem';
import Next from '../../images/next.png';
import Back from '../../images/lightback.png';

export default class Step3 extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
    		dishes: null,
    		dishCount: [{
    			"id": 1,
    			"dish": "",
    			"quantity": 1
    		}]
  		};
  		this.onNext = this.onNext.bind(this);
  		this.onDishChange = this.onDishChange.bind(this);
  		this.onQuantityChange = this.onQuantityChange.bind(this);
  		this.onAdd = this.onAdd.bind(this);
  	}
  	componentWillMount() {
  		this.setState({dishes: this.props.dishes});
  	}
  	onDishChange(value, index, data, id) {
  		var dishCount = this.state.dishCount;
  		for(i = 0; i < dishCount.length; i++ ) {
  			if(dishCount[i].dish === value && dishCount[i].id !== id) {
  				alert("Please Select a Different Dish");
  				var arr = this.removeByAttr(dishCount, 'id', id);
  				this.setState({dishCount: arr});
  			}
  			else {
  				if(dishCount[i].id === id) {
  					dishCount[i].dish = value;
  					dishCount[i].quantity = 1;
  				}
  			}
  		}
  	}
  	onQuantityChange(value, index, data, id) {
  		var dishCount = this.state.dishCount;
  		for(i = 0; i < dishCount.length; i++ ) {
  			if(dishCount[i].id === id) {
  				dishCount[i].quantity = value;
  			}
  		}
  	}
  	removeByAttr(arr, attr, value){
	    var i = arr.length;
	    while(i--){
	       if( arr[i] 
	           && arr[i].hasOwnProperty(attr) 
	           && (arguments.length > 2 && arr[i][attr] === value ) ){ 
	           arr.splice(i,1);
	       }
	    }
	    return arr;
	}
   	onNext() {
   		var totalDishes = 0;
   		var dishCount = this.state.dishCount;
  		for(i = 0; i < dishCount.length; i++ ) {
  			totalDishes = totalDishes + dishCount[i].quantity;
  		}
  		if(totalDishes < this.props.finalPersons) {
  			alert("Sorry! you need to add more dishes")
  		}
  		else {
  			Actions.push('review', {finalPersons: this.props.finalPersons, finalMeal: this.props.finalMeal, finalRestaurant: this.props.finalRestaurant, dishes: this.state.dishCount});
  		}
  		
  	}
  	goBack() {
  		Actions.pop();
  	}
  	onAdd() {
  		var data = {};
  		var dishCount = this.state.dishCount;
  		var count = this.state.dishCount.length;
  		count = count+1;
  		data.id = count;
  		data.dish = "";
  		data.quantity = 1;
  		dishCount.push(data);
  		this.setState({dishCount: dishCount});
  	}
	render() {
		let noOfServings =[{
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
				<AppStatusBar bColor={theme.dark} left={true} Back={Back} leftFunction={this.goBack} center={true} text="Step 3" textColor={theme.white} />
				<ScrollView style={styles.scrollStyle}>
					<View style={styles.mainFlex}>
						{this.state.dishCount.map((value, i) => {
		                    return(<DishItem key={i} index={value.id} quantity={value.quantity} dish={value.dish} dishes={this.state.dishes} servingsData={noOfServings} onQuantityChange={this.onQuantityChange} onDishChange={this.onDishChange} />);
		                })}
					</View>
				</ScrollView>
				<TouchableOpacity style={styles.nextButton} onPress={this.onNext}>
					<Image style={styles.nextIcon} source={Next} />
				</TouchableOpacity>
				<TouchableOpacity style={styles.plusButton} onPress={this.onAdd}>
					<Text style={styles.plus}>+</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: '100%',
		backgroundColor: theme.white,
		alignItems: 'center'
	},
	scrollStyle: {
		height: '100%',
		width: '100%'
	},
	mainFlex: {
		flex: 1,
		width: '100%',
		alignItems: 'center'
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
	},
	plusButton: {
		position: 'absolute',
		bottom: 20,
		left: 20,
		width: 60,
		height: 60,
		backgroundColor: 'green',
		borderRadius: 100,
		alignItems: 'center',
		justifyContent: 'center',
	},
	plus: {
		fontSize: 30,
		bottom: 2,
		color: theme.white
	}
});