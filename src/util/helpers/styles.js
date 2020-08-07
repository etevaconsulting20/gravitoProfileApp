import { Dimensions,StyleSheet,Platform,PixelRatio} from 'react-native';
import {appConfig} from "../../settings/settings"

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');
const scale = SCREEN_WIDTH / 320;
export function normalize(size) {
  const newSize = size * scale 
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  }
}
export const _styles=StyleSheet.create({
  webviewstyle:{
    ...Platform.select({
        ios: {
            flex:1,height:300,width:200,alignContent:'stretch',overflow:'hidden',backgroundColor: '#FAFAF9',alignSelf:'center'
        },
        android: {height:300,width:700,alignContent:'center'}
      })
    
},
toast:{
  height: 60,
  backgroundColor: "#fd665c",
  width:'100%',
  shadowColor: "rgba(72, 87, 100, 0.18)",
  shadowOffset: {
    width: 0,
    height: 2
  },
  shadowRadius: 2,
  shadowOpacity: 1
},
ModalLinkText: {
  color: '#CCCCCC',
  fontSize: 16,
  marginRight: 16,
  fontFamily: 'CeraPro-Bold',
  letterSpacing: 0.2,
  textAlign: 'center'
},
  availabilityButton: {
    minWidth: 90,
    maxWidth: 99,
    minHeight: 60,
    borderRadius: 6,
    borderColor: '#cccccc',
    backgroundColor: "#ffffff",
    textAlign: 'center',
    flex: 1,
    alignItems: 'center',
    margin: 5,
    fontFamily: "CeraPro-Regular",
    shadowColor: "rgba(72, 87, 100, 0.18)",
    shadowOffset: {
        width: 0,
        height: 2
    },
    shadowRadius: 2,
    shadowOpacity: 1
},
availabilityButtonLarge: {
  minWidth: '40%',
  minHeight: 100,
  borderRadius: 6,
  borderColor: '#cccccc',
  backgroundColor: "#ffffff",
  textAlign: 'center',
  flex: 1,
  alignItems: 'center',
  margin: 5,
  shadowColor: "rgba(72, 87, 100, 0.18)",
  shadowOffset: {
      width: 0,
      height: 2
  },
  shadowRadius: 2,
  shadowOpacity: 1
},
  buttonCompBtnTxt : {
    flex:1,
    flexDirection:'row',
    fontFamily: "CeraPro-Regular",
    fontSize: 14,
    textAlign: "center",
    color: "#000000"
  },
  smallbuttonCompBtnTxt : {
    flex:1,
    flexDirection:'row',
    fontFamily: "CeraPro-Regular",
    fontSize: 12,
    textAlign: "center",
    color: "#000000"
  },
  multiselectList:{
    textAlign: 'left',
    fontSize: 16,
    fontWeight: "300",
    fontStyle: "normal",
    lineHeight: 21,
    letterSpacing: 0,
    color: "#000000",
    fontFamily: "CeraPro-Regular",
  },
  searchInput:{
    textAlign: 'left',
    fontSize: 16,
    fontWeight: "400",
    fontStyle: "normal",
    color: "#000000",
    fontFamily: "CeraPro-RegularItalic",
  },
  searchInputItem:{
    backgroundColor:'#ffffff', borderColor:'#000000',height:40, alignContent:'space-around'},
  WADesc: {
    
    textAlign: 'left',
    fontSize: 16,
    fontWeight: "300",
    fontStyle: "normal",
    color: "#000000",
    fontFamily: 'CeraPro-Light'
},
subtitleSmall: {
  textAlign: 'left',
  fontSize: 12,
  fontWeight: "300",
  fontStyle: "normal",
  color: "#000000",
  fontFamily: 'CeraPro-Light'
},
  deleteIcon:{
    height:22,
    width:22
  },
  timeIcon:{
    height:16,
    width:16,
  },
  available : {
    fontFamily: 'CeraPro-Medium',
    fontSize: 16,
    letterSpacing: 0.07,
    color: '#008F00',
    textAlign:'right'
  },
  unavailable : {
      fontFamily: 'CeraPro-Medium',
      fontSize: 16,
      letterSpacing: 0.07,
      color: "#FF2600",
      textAlign:'right'
    },

  changePreferences : {
    fontFamily: 'CeraPro-Bold',
    fontSize: 12,
    fontStyle: "normal",
    letterSpacing: 0.17,
    color: "#000000",
    textAlign:'right'
  },
  BadgesContent:{
    // marginTop:3,
    
    ...Platform.select({
      ios: {
        color:'#000000',
      },
      android: {
        fontSize:12,
        color:'#000000',
        fontFamily:'Poppins-Regular',
        textAlignVertical:'center',
        flex:1,
        flexDirection:'row',
        flexWrap:'nowrap',
        alignSelf: 'center',
      }
    })
    
},
CTBadgesContent:{
  // marginTop:3,
  fontSize:14,
  color:'#000000',
  fontFamily:'Poppins-Regular',
  textAlignVertical:'center',
  flex:1,
  flexDirection:'row',
  flexWrap:'wrap',
  alignSelf: 'flex-start',
  
},
profileBack:{
  fontSize:normalize(12),
  color:'black',
  fontFamily: 'Poppins-SemiBold',
  marginTop:2
},
commsActions:{
  fontSize:normalize(12),
  color:'black',
  fontFamily: 'Poppins-LightItalic',
  marginTop:2
},
SubTitle: {
    textAlign: "center",
    fontFamily: 'CeraPro-Medium',
    fontSize: normalize(15),
    letterSpacing: 0.09,
    color: "#000000"
},
Title: {
    flex: 3,
    flexDirection: 'row',
    width: '100%',
    alignContent: 'stretch',
    justifyContent: 'space-around',
    alignItems: 'center'
},
Description: {
    textAlign: 'left',
    fontSize: 16,
    fontWeight: "300",
    fontStyle: "normal",
    lineHeight: 21,
    letterSpacing: 0,
    color: "#000000",
    fontFamily: 'CeraStencilPro-Regular'
},
  //header
  header:{
    ...Platform.select({
      ios: {
          height: 80
      },
      android: {
          height: 60,
      },
    }),
    elevation:0,
    borderBottomWidth:1,
    borderBottomColor:"lightgrey",
    backgroundColor: "#ffffff",
    shadowColor: "rgba(72, 87, 100, 0.18)",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 2,
    shadowOpacity: 1,
    
  },
  //highlighted
   highlighted:{
    backgroundColor: "#6fe5d1",
    borderColor:'#6fe5d1'
},
  //all block css
  BlockContainer: {
    marginTop:14,
    padding:16
  },
BlockTitle: {
    fontFamily: 'CeraStencilPro-Black',
    fontSize: 16,
    letterSpacing: 0.09,
    color: "#000000",
    paddingBottom:5
},
cardHeader:{
  flex:1,
  flexDirection:'row',
  alignSelf:'flex-start',
  maxHeight:61,
  
},
BlockDes:{
    fontFamily: 'CeraPro-Light',
    fontSize: 15,
    lineHeight:21,
    color: "#000000"
},
  //checkbox react-native
  CheckBox:{
    marginTop:10,
    marginRight:10,
    borderRadius:50
  },
  CheckBoxReason:{
    borderRadius:50
  },
  //headerActionButton
    ActionText:{
      color:appConfig.primaryColor, 
      fontSize:normalize(14), 
      textAlign:'right',
      paddingRight:0,
      fontFamily:'CeraPro-Bold', 
      letterSpacing:0.2,
      height: 25,
      lineHeight: 25,
      alignSelf:'center',
      marginTop:12,
    },
    Actionbutton:{
      color:'#ff665e', 
      fontSize:normalize(14), 
      textAlign:'right',
      paddingRight:0,
      fontFamily:'CeraPro-Bold', 
      letterSpacing:0.2,
      height: 25,
      lineHeight: 25,
      alignSelf:'center',
    },

    //headerActionButton wthout top margin
    mActionText:{
      color:appConfig.primaryColor, 
      fontSize:normalize(14), 
      textAlign:'right',
      paddingRight:0,
      fontFamily:'CeraPro-Bold', 
      letterSpacing:0.2,
      alignSelf:'center',
      marginBottom:8,
      
    },

  //divider
    divider:{
      
      color:'#EBEBEB',
 
      ...Platform.select({
        ios: {
          marginTop:5,
          height: 2,
          borderTopColor: '#EBEBEB',
          marginBottom:14,
        },
        android: {
          marginTop:5,
          height: 2,
          borderTopColor: '#EBEBEB',
          marginBottom:14,
        }
      })
    },
    //Scrren Container
    container: {
        flex: 1,
        backgroundColor: '#fbfbfb',
        height:'100%'
        
    },
    //back button
      backText:{
        fontSize:18,
        color:'black', 
        fontFamily:'CeraPro-Bold', 
      },
      backIcon:{
        fontSize:normalize(14),
        color:'black' ,
        marginLeft:3,
        marginRight : 2,
        fontFamily:'CeraPro-Bold', 
        fontWeight:'bold',
        alignSelf: 'center',
      },
      downIcon:{
        fontSize:normalize(14),
        color:'black' ,
        marginLeft:3,
        marginRight : 3,
        fontFamily:'CeraPro-Bold', 
        fontWeight:'bold',
        alignSelf: 'flex-end',
      },
    //main screen (login,signup ,appsetting)
      layoutContainer:{
        top:'10%',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        marginTop:'10%',
        overflow: 'scroll'
      },

      topcurve:{
        width: 149.8,
        height: 153.2,
        position:'absolute',
        top: 0,
        left: 0,
        zIndex: -1
      },
      bottomcurve:{
        width: 224,
        height: 230,
        position:'relative',
        alignSelf:'flex-end',
        zIndex: -1,
        marginTop:-180,
      },
      logoContainer:{
        textAlign:'center',
        flex: 1, 
        alignItems:'center',
        fontSize:16,
        color:'black', 
        fontFamily:'CeraStencilPro-Bold',
        marginRight:3
    },
      logoIconContainer:{
        textAlign:'center',
        flex: 1, 
        alignItems:'center',
        width: 216,
        height: 160,
        position:'absolute',
        alignSelf:'center',
      },
      logo:{
        width: 147,
        height: 65,
        paddingTop:33,
        paddingBottom:33,
        paddingLeft:35,
        paddingRight:33,
        borderColor: 'black'
      },
      login : {
        height: 45,
        fontFamily: 'CeraStencilPro-Black',
        fontSize: 20,
        letterSpacing: 0.09,
        textAlign: "center",
        color: "#000000",
        marginTop:'10%'
      },
      formContainer : {
        top:'18%',
        overflow: 'scroll'
      },
      errorBlock:{
        color:'tomato',
        fontFamily:"CeraPro-RegularItalic",
        fontSize:12,
        top:5,
        marginLeft:'15%',
        marginRight:'15%',
        fontStyle: "italic",
    
      },
      formItem:{
        marginTop:22,
        marginLeft:'10%',
        width: 298,
        height: 44,
        borderRadius: 40,
      },
      formItemInput:{
        ...Platform.select({
          ios: {
            flex:1,
            alignSelf:'center',
            fontFamily: "CeraPro-RegularItalic", 
            fontSize: 16,
            fontWeight: "500",
            fontStyle: "italic",
            color: "#000000"
          },
          android: {
            alignSelf:'center',
            paddingBottom:10,
            fontFamily: "CeraPro-RegularItalic",
            width: 300,
            height: 'auto',
            fontSize: 14,
            fontWeight: "500",
            fontStyle: "italic",
            lineHeight: 20,
            letterSpacing: 0.05,
            color: "#000000"
              }
        })
      },
      formItemInputDes:{ 
        ...Platform.select({
        ios: {
          flex:1,
          alignSelf:'center',
          fontFamily: "CeraPro-RegularItalic", 
          fontSize: 16,
          fontWeight: "500",
          fontStyle: "italic",
          color: "#000000",
          width: 300,
          height: 'auto',
          paddingBottom:10,
        },
        android: {
          alignSelf:'center',
          paddingBottom:10,
          fontFamily: "CeraPro-RegularItalic",
          width: 300,
          height: 'auto',
          fontSize: 14,
          fontWeight: "500",
          fontStyle: "italic",
          lineHeight: 20,
          letterSpacing: 0.05,
          color: "#000000"
            }
      })},
      forgotPassword:{
        alignSelf:"flex-end",
        marginRight:'10%',
        fontFamily: 'CeraStencilPro-Black',
        color:'black',
        fontWeight:'bold'
        
      },
      button : {
        width: 298,
        height: 44,
        borderRadius: 40,
        backgroundColor: "#6fe5d1",
        alignSelf:'center',
        textAlign:'center',
        marginTop:'20%'
    
      },
      buttonText:{
        // fontFamily: "CeraPro-Regular",
        // fontSize: 15,
        // lineHeight: 24,
        // letterSpacing: -0.41,
        // color: "#000000",
        // textAlign:'center',
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'nowrap',
        fontFamily: "CeraPro-Regular",
        fontSize: 14,
        textAlign: "center",
        color: "#000000"
      },
      getStartedButton:{
        justifyContent: 'center',
        flex:1,
        flexDirection: 'row',
        
      },
      notRegistered : {
        height: 21,
        fontFamily: "CeraStencilPro-Bold",
        fontSize: 14,
        lineHeight: 21,
        letterSpacing: 0,
        textAlign: "left",
        color: "#000000",
        
      },
      getStarted:{
        height: 21,
        fontFamily: "CeraStencilPro-Bold",
        fontSize: 14,
        lineHeight: 21,
        letterSpacing: 0,
        color: "#ff665e",
        textAlign:'left',
        marginLeft:5,
        fontWeight:'bold'
      },
      resetPassword:{
        justifyContent: 'center',
        flex:1,
        flexDirection: 'row'
      },
      
      alreadyRegistered: {
        height: 21,
        fontFamily: "CeraPro-Regular",
        fontSize: 14,
        lineHeight: 21,
        letterSpacing: 0,
        textAlign: "center",
        color: "#000000"
      },
      Separator: {
        ...Platform.select({
     ios: {
       borderTopColor: '#EBEBEB',
       padding: 0,
       borderTopWidth: 2,
       width: '100%',
       alignSelf: 'center',
       margin: 5
     },
     android: {
       borderTopColor: '#EBEBEB',
       padding: 0,
       borderTopWidth: 2,
       width: '100%',
       alignSelf: 'center',
       margin: 5
     }
   })
   },
   TouchableOpacityStyle:{
 
    position: 'absolute',
    width: 80,
    height: 40,
    right: 40,
    bottom: 30,
  },
 
  FloatingButtonView :{
    flex: 1,
    flexDirection: 'row', paddingTop: 10,
    paddingBottom: 5
  },
  FloatingButtonStyle: {
    flex:1,
    flexDirection:'row',
    width: 100,
    height: 40,
    borderRadius: 50, 
    backgroundColor: "#72e5d2",
    borderColor:'#5acdba',
    textAlignVertical:'center',
    alignSelf:'center',
    justifyContent:'center',
    padding: 8,
  },
floatingButtonText:{
  fontFamily: "CeraPro-Medium",
  fontSize: 16,
  color:'black',
  alignSelf: 'center', 
},
floatingButtonIcon : {
  fontSize: 8,
  marginTop:10,
  color:'white'
},

whatsThis:{
  color:'#ff665e', 
  fontSize:normalize(12), 
  textAlign:'left',
  paddingRight:0,
  fontFamily:'CeraPro-Bold', 
  letterSpacing:0.1
}
});