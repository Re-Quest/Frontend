
import React, {useState} from 'react';
import {View, Alert, Button, Platform,StatusBar, Pressable, TouchableOpacity, TextInput, Text, Image, Dimensions, Modal, ScrollView} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {StyleSheet} from "react-native";
import Refresh from "../../assets/refresh.png";
import colors from '../../assets/colors/colors';
import Images from '../mainComponents/Images';
import axios from 'axios';
import { useEffect } from 'react/cjs/react.development';

export const QuestModal= (props)=> {
	const [date, setDate] = useState(new Date(props.questJson.dueDate));
	const [showDate, setShowDate] = useState(Platform.OS === 'ios');
	const [showTime, setShowTime] = useState(Platform.OS === 'ios');
	const [comment, setComment] = useState(null);

	const onChange = (event, selectedDate) => {
		const currentDate = selectedDate || date;
		setShowDate(Platform.OS === 'ios');
		setShowTime(Platform.OS === 'ios');
		currentDate.setSeconds(0);
		setDate(currentDate);
	};

	const apply = () =>{
		if(comment === null || comment.length === 0){
			Alert.alert('write a comment');
			return;
		}

		const questId = props.questJson._id;
		console.log('apply');

		if(showComment){ // re:quest
			const data = {
				_id : questId,
				title : props.questJson.title,
				comment : comment,
				receiver : props.questJson.heldUser._id,
				dueDate : new Date(date),
			};
			console.log(data);
			axios.post("http://192.249.18.141:80/api/quest/request",data)
			.then((res)=>{
				console.log('success');
				props.setModalVisible(false);
				props.setRefresh(val=>!val);
			}).catch((e)=>console.log(e));

		}else if(props.questJson.state === "confirm"){// complete
			console.log(comment);
			axios.post("http://192.249.18.141:80/api/quest/complete",{_id : questId, comment : comment})
			.then((res)=>{
				props.setModalVisible(false);
				props.setRefresh(val=>!val);
			});
		}else if(props.questJson.state === "complete"){//terminate
			axios.post("http://192.249.18.141:80/api/quest/terminate",{_id : questId, comment : comment})
			.then((res)=>{
				props.setModalVisible(false);
				props.setRefresh(val=>!val);
			});

		}else{//confirm
			console.log('confirm');
			console.log(questId);
			axios.post("http://192.249.18.141:80/api/quest/confirm",{_id : questId, comment : comment})
			.then((res)=>{
				props.setModalVisible(false);
				props.setRefresh(val=>!val);
			})
			.catch((e)=>console.log(e));
		}
	};


	const normal = [
		{name:"Re:Quest", key:1, selected:false},
		{name:(props.questJson.state!=="confirm")?"Confirm":"Complete", key:2, selected:false},
	];
	const complete = [
		{name:"Re:Quest", key:1, selected:false},
		{name:"Terminate", key:3, selected:false}
	];

	const [buttonList, setButtonList] = useState((props.questJson.state!=="complete")?normal:complete);

	//if 'Re:Quest' selected, show comment text input. else, hide it.
	const [showComment, setShowComment] = useState(false);

	//if modifying quest, set last button to  "Apply".
	//else, set last button to Close.
	const [modified, setModified] = useState(false);

	useEffect(()=>{
		if(props.questJson.state==="terminate"){
			setButtonList([]);
		}else{
			setButtonList((props.questJson.state!=="complete")?normal:complete);
		}
	},[props.data]);

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
				<TouchableOpacity style={styles.background} onPress={() => props.setModalVisible(null)}/>
				
				<View style={styles.modalWrapper}>
						<ScrollView style={{width : '100%', height : 50}} horizontal={true}>
							<Text style={styles.titletxt}>{"["+props.questJson.title+"]"}</Text>
						</ScrollView>
						
						<View style={styles.midWrapper}>
							<View style={styles.txtbox}>
								<Text style={styles.txt}>{props.questJson.heldUser.userId.toUpperCase()}</Text>
							</View>
							<View>
								<Text style={styles.midtxt}>{`>`}</Text>
							</View>
							<View style={styles.txtbox}>
								<Text style={styles.txt}>{props.questJson.holdingUser.userId.toUpperCase()}</Text>
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



						<ScrollView style={{width : '100%', marginVertical : 5}}>
							{props.questJson.comments.map((item, idx)=>{
								const comment = item.comment;
								const state = item.stateChange;
								const date = new Date(item.date);
								const user = item.user.userId;
								const usernum = item.user.profileImg;

								return(
									<View style={styles.commentWrapper} key={idx}>
										<Image style={styles.userImg} source={Images.profile[usernum]} />
										<View style={styles.userWrapper}>
											<Text style={styles.midtxt} >{user}</Text>
											<Text style={styles.subtxt} >{state}</Text>
											<Text style={styles.commenttxt}>{comment}</Text>
										</View>
										
									</View>
								);
							})}
						</ScrollView>


						<View style={styles.horizontalHolder}>
							{
								buttonList.map((index) => {
									return (
										<TouchableOpacity
											style={index.selected ? styles.ButtonSelected : styles.ButtonUnSelected}
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
							<TextInput
								style={styles.commentText}
								multiline={true}
								placeholder="Comment Detail"
								onChangeText={(val)=>setComment(val)}
							/>
						</View>

						<TouchableOpacity style={{width:"100%", alignItems: "center"}}
							onPress={modified? () => {apply()} : () => props.setModalVisible(null)}>
							<Text style={styles.doneText}>
								{modified? "Apply":"Close"}
							</Text>
						</TouchableOpacity>
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
		marginTop: (Platform.OS=='ios')?22:StatusBar.height
	},

	modalWrapper : {
		position: 'absolute',
		width : '80%',
		maxHeight : 400,
		marginVertical : '25%',
		marginHorizontal : '10%',
		borderRadius : 20,
		backgroundColor : colors.white,
		flexDirection : 'column',
		justifyContent : 'space-between',
		padding : 20
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
	horizontalHolder: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems : 'center'
	},
	horizontalHolderSpaceBetween: {
		width: '90%',
		margin: 2,
		flexDirection: 'row-reverse',
		justifyContent: 'space-between',
		alignItems: "center"
	},


	ButtonUnSelected: {
		height : 24,
        borderRadius : 12,
        justifyContent : 'center',
		backgroundColor: colors.cool_white,
		paddingLeft: '3%',
		paddingRight: '3%',
		marginRight: '3%'
	},
	ButtonSelected: {
		height : 24,
        borderRadius : 12,
        justifyContent : 'center',
		backgroundColor: colors.blue,
		paddingLeft: '3%',
		paddingRight: '3%',
		marginRight: '3%'
	},
	stateButtonSelected: {
		paddingHorizontal : 7,
		color: colors.white,
		fontFamily : 'ReadexPro-Regular',
		fontSize : 15
	},
	stateButtonUnSelected: {
		paddingHorizontal : 7,
		color: colors.gray,
		fontFamily : 'ReadexPro-Regular',
		fontSize : 15
	},


	iconButton: {
		alignItems: 'center',
		justifyContent: 'center',
		width: 20,
		height: 20,
		borderRadius: 10,
		backgroundColor: "#CCCCCC",
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
	},
	detailHighlight : {
        marginTop : -3,
        fontSize : 17,
        fontFamily : 'ReadexPro-Medium',
        color : colors.blue,
        marginHorizontal : 5
    },

	//text style
	titletxt : {
		width : '100%',
        fontSize : 22,
        fontFamily : 'ReadexPro-Bold',
        color : colors.black,
    },
	midtxt : {
        fontFamily : 'ReadexPro-Bold',
        fontSize : 18,
        color : colors.black,
        marginHorizontal : 6
    },
    txt : {
        fontFamily : 'ReadexPro-Regular',
        fontSize : 15,
        color : colors.white
    },
	commenttxt : {
		fontFamily : 'ReadexPro-Regular',
        fontSize : 15,
        color : colors.black,
		marginHorizontal : 6,
		marginTop : -5,
		width : '100%',
	},
	subtxt : {
		fontFamily : 'ReadexPro-Regular',
        fontSize : 15,
        color : colors.gray,
		marginHorizontal : 6,
		marginTop : -5
	},
	doneText: {
		color: colors.blue,
		fontFamily : 'ReadexPro-Bold',
		fontSize: 18,

	},

	////
	midWrapper : {
        flexDirection : 'row',
        justifyContent : 'flex-start'
    },
	txtbox : {
        height : 24,
        borderRadius : 12,
        paddingHorizontal : 10,
        backgroundColor : colors.blue,
        justifyContent : 'center'

    },
	commentWrapper : {
		flexDirection : 'row',
		backgroundColor : colors.cool_white,
		width : '100%',
		borderRadius : 20,
		marginVertical : 5,
		padding : 7
	},
	userWrapper : {
		flex : 1,
		flexDirection : 'column',
		justifyContent : 'flex-start',
		alignItems : 'flex-start',
	},
	userImg : {
		width  : 40,
		height : 40,
		borderRadius : 20,
		backgroundColor : colors.white
	},

    
});
