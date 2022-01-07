
import React, {useState} from 'react';
import {View, Button, Platform, TouchableOpacity, TextInput, Text, Image} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {StyleSheet} from "react-native";
import Refresh from "../../assets/refresh.png";
export const QuestModal= ()=> {
	const [date, setDate] = useState(new Date(1598051730000));
	const [mode, setMode] = useState('date');
	const [show, setShow] = useState(false);

	const onChange = (event, selectedDate) => {
		const currentDate = selectedDate || date;
		setShow(Platform.OS === 'ios');
		setDate(currentDate);
	};


	const [buttonList, setButtonList] = useState([
		{name:"Re:Quest", key:1, selected:false},
		{name:"On Progress", key:2, selected:false},
		{name:"Terminate", key:3, selected:false}
	]);

	//if 'Re:Quest' selected, show comment text input. else, hide it.
	const [showComment, setShowComment] = useState(false);

	//if modifying quest, set last button to  "Apply".
	//else, set last button to Close.
	const [modified, setModified] = useState(false);

	return (
		<View  style={styles.container}>
			<TouchableOpacity style={styles.background}/>
			<View style={styles.modal}>
				<Text style={styles.titleText}>QUEST</Text>

				<View style={styles.horizontalHolder}>
					<View style={styles.textBasic}>
						<Text>Team1</Text>
					</View>
					<Text style={styles.textNoBackground}>></Text>
					<View style={styles.textBasic}>
						<Text>Me</Text>
					</View>
				</View>

				<Text style={styles.modalChildBasic}>COMMENT</Text>

				<View style={styles.horizontalHolderSpaceBetween}>
					<View style={styles.commentHolder}></View>
					<Image style={styles.roundImage} source={Refresh}/>
				</View>

				<View style={styles.horizontalHolder}>
					{
						buttonList.map((index) => {
							return (
								<TouchableOpacity
									style={styles.stateButton}
									key={index.key}
									onPress={() => {
										let prevState= [];
										for(let i of buttonList) {
											if (i.key == index.key && !i.selected) {
												prevState.push({name: i.name.toString(), selected: true, key: i.key});
												setModified(true);
												if (i.name == "Re:Quest")
													setShowComment(true);
												else setShowComment(false);
											} else if (i.key == index.key && i.selected) {
												prevState.push({name: i.name.toString(), selected: false, key: i.key});
												setShowComment(false);
												setModified(false);
											} else prevState.push({name:i.name.toString(), selected:false ,key:i.key});
										}
										setButtonList(prevState);
									}}
								>
									<Text style={index.selected ? styles.stateButtonSelected : styles.stateButtonUnSelected}>
										{index.name.toString()}
									</Text>
								</TouchableOpacity>
							)
						})
					}
				</View>
				<View style={{width:"100%", alignItems: "center"}}>
					{showComment && (
						<>
							<TextInput style={styles.commentText}
						                            multiline={true}
						                            placeholder="Comment Detail"
							/>
							<TouchableOpacity style={styles.modalChildBasic}>
								<Text>Select Targets</Text>
							</TouchableOpacity>
						</>

					)}
				</View>

				<TouchableOpacity>
					<Text style={styles.doneText}>
						{modified? "Apply":"Close"}
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);


};

const styles = StyleSheet.create({
	roundImage: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: 'black',
	},
	commentHolder: {
		backgroundColor: '#CCCCCC',
		width: '90%',
		marginLeft: '-10%',
		borderRadius: 10,
		height: 70
	},
	container: {
		position: 'absolute',
		height: '100%',
		width: '100%',
		backgroundColor: 'transparent',
	},
	modalChildBasic: {
		width: '90%',
		alignItems: 'flex-start',
		padding: 2
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
		marginTop: '20%',
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
		maxHeight: 300,
		width: '90%',
		textAlignVertical: 'top',
		backgroundColor: '#CCCCCC'
	},
	horizontalHolder: {
		width: '90%',
		margin: '2%',
		flexDirection: 'row',
		justifyContent: 'flex-start'
	},
	horizontalHolderSpaceBetween: {
		width: '90%',
		margin: '2%',
		flexDirection: 'row-reverse',
		justifyContent: 'space-between',
		alignItems: "center"
	},
	stateButton: {
		borderRadius: 30,
		backgroundColor: "#CCCCCC",
		paddingLeft: '3%',
		paddingRight: '3%',
		marginRight: '3%'
	},
	stateButtonSelected: {
		color: "#FFFFFF"
	},
	stateButtonUnSelected: {
		color: "#999999"
	},
	textBasic: {
		flex:1,
		backgroundColor: "#CCCCCC",
		paddingHorizontal: "3%",
		borderRadius: 30,
		marginRight: '3%'
	},
	textNoBackground: {
		marginRight: '3%'
	}
});