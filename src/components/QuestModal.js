
import React, {useState} from 'react';
import {View, Button, Platform, TouchableOpacity, TextInput, Text} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {StyleSheet} from "react-native";

export const QuestModal= ()=> {
	const [date, setDate] = useState(new Date(1598051730000));
	const [mode, setMode] = useState('date');
	const [show, setShow] = useState(false);

	const onChange = (event, selectedDate) => {
		const currentDate = selectedDate || date;
		setShow(Platform.OS === 'ios');
		setDate(currentDate);
	};

	const showMode = (currentMode) => {
		setShow(true);
		setMode(currentMode);
	};

	const showDatepicker = () => {
		showMode('date');
	};

	const showTimepicker = () => {
		showMode('time');
	};

	//DummyData
	const buttonList = [
		{name:"Re:Quest", key:1},
		{name:"On Progress", key:2},
		{name:"Terminate", key:3}
	];

	return (
		<View  style={styles.container}>
			<TouchableOpacity style={styles.background}/>
			<View style={styles.modal}>
				<Text style={styles.titleText}>QUEST</Text>
				<View style={styles.stateButtonHolder}>
					{
						buttonList.map((index) => {
							return (
								<TouchableOpacity
									style={styles.stateButton}
									key={index.key}
								>
									<Text>
										{index.name.toString()}
									</Text>
								</TouchableOpacity>
							)
						})
					}
				</View>
				<TextInput style={styles.commentText}
				           multiline={true}
				           placeholder="Comment Detail"
				/>
				<TouchableOpacity>
					<Text style={styles.doneText}>
						Generate!
					</Text>
				</TouchableOpacity>
			</View>
		</View>
		// <View>
		// 	<View>
		// 		<Button onPress={showDatepicker} title="Show date picker!" />
		// 	</View>
		// 	<View>
		// 		<Button onPress={showTimepicker} title="Show time picker!" />
		// 	</View>
		// 	{show && (
		// 		<DateTimePicker
		// 			testID="dateTimePicker"
		// 			value={date}
		// 			mode={mode}
		// 			is24Hour={true}
		// 			display="default"
		// 			onChange={onChange}
		// 		/>
		// 	)}
		// </View>
	);


};

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		height: '100%',
		width: '100%',
		backgroundColor: 'transparent'
	},
	background: {
		position: 'absolute',
		height: '100%',
		width: '100%',
		backgroundColor: 'rgba(0,0,0,0.5)'
	},
	ddayInput: {
		backgroundColor: 'white',
		marginBottom: 20,
		width: '75%',
		height: 40,
		borderBottomWidth: 1,
		borderBottomColor: '#a5a5a5'
	},
	modal: {
		marginHorizontal: 20,
		borderRadius: 10,
		alignItems: 'center',
		marginTop: '50%',
		backgroundColor: 'white',
	},
	doneText: {
		color: 'rgb(1,123,255)',
		fontSize: 15,
		margin: 10
	},
	titleText: {
		fontSize: 18,
		margin: 10
	},
	commentText: {
		borderRadius: 10,
		padding: '3%',
		minHeight: 60,
		width: '90%',
		textAlignVertical: 'top',
		backgroundColor: '#CCCCCC'
	},
	stateButtonHolder: {
		width: '90%',
		margin: '2%',
		flexDirection: 'row',
		justifyContent: 'flex-start'
	},
	stateButton: {
		borderRadius: 30,
		backgroundColor: "#CCCCCC",
		paddingLeft: '3%',
		paddingRight: '3%',
		marginRight: '3%'
	}
});