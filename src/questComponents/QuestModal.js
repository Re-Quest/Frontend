
import React, {useState} from 'react';
import {View, Button, Platform, Pressable, TouchableOpacity, TextInput, Text, Image, Dimensions, Modal} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {StyleSheet} from "react-native";
import Refresh from "../../assets/refresh.png";

export const QuestModal= (props)=> {
	const [date, setDate] = useState(new Date(props.questJson.dueDate));
	const [showDate, setShowDate] = useState(Platform.OS === 'ios');
	const [showTime, setShowTime] = useState(Platform.OS === 'ios');

	const onChange = (event, selectedDate) => {
		const currentDate = selectedDate || date;
		setShowDate(Platform.OS === 'ios');
		setShowTime(Platform.OS === 'ios');
		currentDate.setSeconds(0);
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
		<View style={styles.centeredView}>
			<Modal
				animationType="slide"
				transparent={true}
				visible={props.modalVisible}
				onRequestClose={() => {
					props.setModalVisible(!props.modalVisible);
				}}
			>
				<TouchableOpacity style={styles.background} onPress={() => props.setModalVisible(false)}/>
				<View style={styles.centeredView}>
					<View style={styles.modal}>
						<Text style={styles.titleText}>QUEST</Text>

						<View style={styles.horizontalHolder}>
							<View style={styles.textBasic}>
								<Text>{props.questJson.heldUser.userId}</Text>
							</View>
							<Text style={styles.textNoBackground}>></Text>
							<View style={styles.textBasic}>
								<Text>{props.questJson.holdingUser.userId}</Text>
							</View>
						</View>

						<>
							{Platform.OS != 'ios' && (
								<View style={styles.horizontalHolderSpaceBetween}>
									<TouchableOpacity
										style={styles.textBasic}
										onPress={() => setShowTime(true)}>
										<Text>{date.toLocaleTimeString().substr(0,5)}</Text>
									</TouchableOpacity>
									<TouchableOpacity
										style={styles.textBasic}
										onPress={() => setShowDate(true)}>
										<Text>{date.toLocaleDateString()}</Text>
									</TouchableOpacity>
									<Text>DUE: </Text>
								</View>
							)}
						</>


						<View style={styles.horizontalHolderSpaceBetween}>
							<>
								{showTime && (
									<DateTimePicker
										style={{height: 30, flex: 1}}
										value={date}
										mode='time'
										is24Hour={true}
										display="default"
										onChange={onChange}
									/>
								)}

							</>
							<>
								{showDate && (
									<DateTimePicker
										style={{height: 30, flex: 1}}
										value={date}
										mode='date'
										is24Hour={true}
										display="default"
										onChange={onChange}
									/>
								)}
							</>
							<>
								{Platform.OS === 'ios' && (
									<Text>DUE:</Text>
								)}
							</>
						</View>

						<View style={styles.horizontalHolderSpaceBetween}>
							<TouchableOpacity style={styles.iconButton}>
								<Text>+</Text>
							</TouchableOpacity>
							<Text style={styles.modalChildBasic}>LAST COMMENT</Text>
						</View>


						<View style={styles.horizontalHolderSpaceBetween}>
							<View style={styles.commentHolder}>
								<Text style={styles.modalChildBasic}>
									{props.questJson.comments[props.questJson.comments.length - 1].comment}
								</Text>
							</View>
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
													if (i.key === index.key && !i.selected) {
														prevState.push({name: i.name.toString(), selected: true, key: i.key});
														setModified(true);
														if (i.name === "Re:Quest")
															setShowComment(true);
														else setShowComment(false);
													} else if (i.key === index.key && i.selected) {
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
									<TextInput
										style={styles.commentText}
										multiline={true}
										placeholder="Comment Detail"
									/>
									<TouchableOpacity style={styles.modalChildBasic}>
										<Text>Select Targets</Text>
									</TouchableOpacity>
								</>

							)}
						</View>

						<TouchableOpacity
							onPress={modified? () => null : () => props.setModalVisible(false)}>
							<Text style={styles.doneText}>
								{modified? "Apply":"Close"}
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		</View>
	);
};

const styles = StyleSheet.create({
	centeredView: {
		position: 'absolute',
		width: Dimensions.get('screen').width,
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 22
	},
	modalView: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5
	},
	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 2
	},
	buttonOpen: {
		backgroundColor: "#F194FF",
	},
	buttonClose: {
		backgroundColor: "#2196F3",
	},
	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center"
	},
	modalText: {
		marginBottom: 15,
		textAlign: "center"
	},
	roundImage: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: 'black',
	},
	commentHolder: {
		alignItems: "flex-end",
		justifyContent: "center",
		backgroundColor: '#CCCCCC',
		width: '95%',
		marginLeft: '-10%',
		borderRadius: 10,
		height: 70
	},
	modalChildBasic: {
		width: '90%',
		alignItems: 'flex-start',
		padding: 2
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
		margin: 2,
		flexDirection: 'row-reverse',
		justifyContent: 'space-between',
		alignItems: "center"
	},
	stateButton: {
		borderRadius: 10,
		backgroundColor: "#CCCCCC",
		paddingLeft: '3%',
		paddingRight: '3%',
		marginRight: '3%'
	},
	iconButton: {
		alignItems: 'center',
		justifyContent: 'center',
		width: 20,
		height: 20,
		borderRadius: 10,
		backgroundColor: "#CCCCCC",
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
		marginRight: '3%',
		alignItems: 'center'
	},
	textNoBackground: {
		marginRight: '3%'
	},
	background: {
		position: Dimensions.get('window').position,
		height: Dimensions.get('window').height,
		width: Dimensions.get('window').width,
		backgroundColor: 'rgba(0,0,0,0.5)'
	}
});
//
// 	return (
// 		<>
// 			{props.showQuest && (
// 				<View  style={styles.container}>
// 					<TouchableOpacity style={styles.background} onPress={props.setShowQuestFalse}/>
// 					<View style={styles.modal}>
// 						<Text style={styles.titleText}>QUEST</Text>
//
// 						<View style={styles.horizontalHolder}>
// 							<View style={styles.textBasic}>
// 								{/*<Text>{props.questJson.heldUser.userId}</Text>*/}
// 							</View>
// 							<Text style={styles.textNoBackground}>></Text>
// 							<View style={styles.textBasic}>
// 								{/*<Text>{props.questJson.holdingUser.userId}</Text>*/}
// 							</View>
// 						</View>
//
// 						<>
// 							{Platform.OS != 'ios' && (
// 								<View style={styles.horizontalHolderSpaceBetween}>
// 									<TouchableOpacity
// 										style={styles.textBasic}
// 										onPress={() => setShowTime(true)}>
// 										<Text>{date.toLocaleTimeString().substr(0,5)}</Text>
// 									</TouchableOpacity>
// 									<TouchableOpacity
// 										style={styles.textBasic}
// 										onPress={() => setShowDate(true)}>
// 										<Text>{date.toLocaleDateString()}</Text>
// 									</TouchableOpacity>
// 									<Text>DUE: </Text>
// 								</View>
// 							)}
// 						</>
//
//
// 						<View style={styles.horizontalHolderSpaceBetween}>
// 							<>
// 								{showTime && (
// 									<DateTimePicker
// 										style={{height: 30, flex: 1}}
// 										value={date}
// 										mode='time'
// 										is24Hour={true}
// 										display="default"
// 										onChange={onChange}
// 									/>
// 								)}
//
// 							</>
// 							<>
// 								{showDate && (
// 									<DateTimePicker
// 										style={{height: 30, flex: 1}}
// 										value={date}
// 										mode='date'
// 										is24Hour={true}
// 										display="default"
// 										onChange={onChange}
// 									/>
// 								)}
// 							</>
// 							<>
// 								{Platform.OS === 'ios' && (
// 									<Text>DUE:</Text>
// 								)}
// 							</>
// 						</View>
//
// 						<View style={styles.horizontalHolderSpaceBetween}>
// 							<TouchableOpacity style={styles.iconButton}>
// 								<Text>+</Text>
// 							</TouchableOpacity>
// 							<Text style={styles.modalChildBasic}>COMMENT</Text>
// 						</View>
//
//
// 						<View style={styles.horizontalHolderSpaceBetween}>
// 							<View style={styles.commentHolder}></View>
// 							<Image style={styles.roundImage} source={Refresh}/>
// 						</View>
//
// 						<View style={styles.horizontalHolder}>
// 							{
// 								buttonList.map((index) => {
// 									return (
// 										<TouchableOpacity
// 											style={styles.stateButton}
// 											key={index.key}
// 											onPress={() => {
// 												let prevState= [];
// 												for(let i of buttonList) {
// 													if (i.key === index.key && !i.selected) {
// 														prevState.push({name: i.name.toString(), selected: true, key: i.key});
// 														setModified(true);
// 														if (i.name === "Re:Quest")
// 															setShowComment(true);
// 														else setShowComment(false);
// 													} else if (i.key === index.key && i.selected) {
// 														prevState.push({name: i.name.toString(), selected: false, key: i.key});
// 														setShowComment(false);
// 														setModified(false);
// 													} else prevState.push({name:i.name.toString(), selected:false ,key:i.key});
// 												}
// 												setButtonList(prevState);
// 											}}
// 										>
// 											<Text style={index.selected ? styles.stateButtonSelected : styles.stateButtonUnSelected}>
// 												{index.name.toString()}
// 											</Text>
// 										</TouchableOpacity>
// 									)
// 								})
// 							}
// 						</View>
// 						<View style={{width:"100%", alignItems: "center"}}>
// 							{showComment && (
// 								<>
// 									<TextInput
// 										style={styles.commentText}
// 			                            multiline={true}
// 			                            placeholder="Comment Detail"
// 									/>
// 									<TouchableOpacity style={styles.modalChildBasic}>
// 										<Text>Select Targets</Text>
// 									</TouchableOpacity>
// 								</>
//
// 							)}
// 						</View>
//
// 						<TouchableOpacity
// 							onPress={() => props.setShowQuest(!props.showQuest)}>
// 							<Text style={styles.doneText}>
// 								{modified? "Apply":"Close"}
// 							</Text>
// 						</TouchableOpacity>
// 					</View>
// 				</View>
// 			)}
// 		</>
// 	);
//
//
// };
//
// const styles = StyleSheet.create({
// 	roundImage: {
// 		width: 40,
// 		height: 40,
// 		borderRadius: 20,
// 		backgroundColor: 'black',
// 	},
// 	commentHolder: {
// 		backgroundColor: '#CCCCCC',
// 		width: '95%',
// 		marginLeft: '-10%',
// 		borderRadius: 10,
// 		height: 70
// 	},
// 	container: {
// 		position: 'absolute',
// 		height: '100%',
// 		width: '100%',
// 		backgroundColor: 'transparent',
// 	},
// 	modalChildBasic: {
// 		width: '90%',
// 		alignItems: 'flex-start',
// 		padding: 2
// 	},
// 	background: {
// 		position: Dimensions.get('window').position,
// 		height: Dimensions.get('window').height,
// 		width: Dimensions.get('window').width,
// 		backgroundColor: 'rgba(0,0,0,0.5)'
// 	},
// 	ddayInput: {
// 		backgroundColor: 'white',
// 		marginBottom: 20,
// 		width: '75%',
// 		height: 40,
// 		borderBottomWidth: 1,
// 		borderBottomColor: '#a5a5a5'
// 	},
// 	modal: {
// 		marginHorizontal: 20,
// 		borderRadius: 10,
// 		alignItems: 'center',
// 		marginTop: '20%',
// 		backgroundColor: 'white',
// 	},
// 	doneText: {
// 		color: 'rgb(1,123,255)',
// 		fontSize: 15,
// 		margin: 10
// 	},
// 	titleText: {
// 		fontSize: 18,
// 		margin: 10
// 	},
// 	commentText: {
// 		borderRadius: 10,
// 		padding: '3%',
// 		minHeight: 60,
// 		maxHeight: 300,
// 		width: '90%',
// 		textAlignVertical: 'top',
// 		backgroundColor: '#CCCCCC'
// 	},
// 	horizontalHolder: {
// 		width: '90%',
// 		margin: '2%',
// 		flexDirection: 'row',
// 		justifyContent: 'flex-start'
// 	},
// 	horizontalHolderSpaceBetween: {
// 		width: '90%',
// 		margin: 2,
// 		flexDirection: 'row-reverse',
// 		justifyContent: 'space-between',
// 		alignItems: "center"
// 	},
// 	stateButton: {
// 		borderRadius: 10,
// 		backgroundColor: "#CCCCCC",
// 		paddingLeft: '3%',
// 		paddingRight: '3%',
// 		marginRight: '3%'
// 	},
// 	iconButton: {
// 		alignItems: 'center',
// 		justifyContent: 'center',
// 		width: 20,
// 		height: 20,
// 		borderRadius: 10,
// 		backgroundColor: "#CCCCCC",
// 	},
// 	stateButtonSelected: {
// 		color: "#FFFFFF"
// 	},
// 	stateButtonUnSelected: {
// 		color: "#999999"
// 	},
// 	textBasic: {
// 		flex:1,
// 		backgroundColor: "#CCCCCC",
// 		paddingHorizontal: "3%",
// 		borderRadius: 30,
// 		marginRight: '3%',
// 		alignItems: 'center'
// 	},
// 	textNoBackground: {
// 		marginRight: '3%'
// 	}
// });