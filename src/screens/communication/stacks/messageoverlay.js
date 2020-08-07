import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, ScrollView } from 'react-native';

import { _styles } from '../../../util/helpers/styles';
import { Container, Header, Left, Right, Body, Button } from 'native-base';
import { WebView } from "react-native-webview";
import I18n from "react-native-i18n";

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { appConfig } from '../../../settings/settings';


export default class MessageOverlayComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
          currentIndex: 0,
          data: []
        };
        this.showNextEvent = this.showNextEvent.bind(this);
        this.showPreviousEvent = this.showPreviousEvent.bind(this);
    }   

    componentDidMount(){
        this.setState({currentIndex:this.props.route.params.index, data: this.props.route.params.data});
    }

  renderWebView(props){
    return (
        <>
            {props.content?<WebView
            ref={webView => this.webView = webView}
            style={{backgroundColor:"transparent",flex:1}}
            nativeConfig={{props: {webContentsDebuggingEnabled: true}}}
            originWhitelist={['*']}
            scalesPageToFit={true}
            javaScriptEnabled={true}
            source={{ html: props.content }}
          />:<Text>{props.title}</Text>
        }
        </>
        )
  }



  showNextEvent(){
      var index = this.state.currentIndex;
      if(index < this.state.data.length - 1){
        index = this.state.currentIndex + 1;
        this.setState({currentIndex:index});
      }
      
  }

  showPreviousEvent(){
    var index = this.state.currentIndex;
    if(index > 0){
        index = this.state.currentIndex - 1;
        this.setState({currentIndex:index});
    }
    
  }

  prevStyle() {
    if(this.state.currentIndex == 0){
        return {
            flexDirection : 'row', marginRight:10, opacity:0.2
          }
    }else{
        return {
            flexDirection : 'row', marginRight:10, opacity:1
          }
    }  
    
  }

  nextStyle() {
    if(this.state.data.length > 0  && this.state.currentIndex === (this.state.data.length -1)){
        return {
            flexDirection : 'row', opacity:0.2
          }
    }else{
        return {
            flexDirection : 'row', opacity:1
          }
    }  
    
  }
  

  render() {


    return (
      <Container>
        <ScrollView style={_styles.container}>
        <Header style={_styles.header}>
                <Left style={{flex:2}}>
                <TouchableOpacity style={{flexDirection : 'row'}} onPress={()=>this.props.navigation.goBack()}>
                <MaterialCommunityIcons name="arrow-left" style={{fontSize:30,color:'black'}}></MaterialCommunityIcons>
                            <Text
                                uppercase={false}
    style={_styles.profileBack}>{I18n.t("communication-backButton")}</Text>
            </TouchableOpacity>
                </Left >
             
                <Right style={{flex:2}}>
                <TouchableOpacity disabled={this.state.currentIndex === 0} style={this.prevStyle()} onPress={()=>this.showPreviousEvent()}>
                <MaterialCommunityIcons name="menu-left" style={{fontSize:30,color:'black'}}></MaterialCommunityIcons>
                            <Text
                                uppercase={false}
    style={_styles.profileBack}>{I18n.t("communication-previousButton")}</Text>
            </TouchableOpacity>

      
                <TouchableOpacity disabled={this.state.currentIndex === this.state.data.length - 1} style={this.nextStyle()} onPress={()=>this.showNextEvent()}>
               
                            <Text
                                uppercase={false}
    style={_styles.profileBack}>{I18n.t("communication-nextButton")}</Text>
     <MaterialCommunityIcons name="menu-right" style={{fontSize:30,color:'black'}} ></MaterialCommunityIcons>
            </TouchableOpacity>
                </Right>
                
            </Header>
            <View style={styles.formContainer}>

               

                {this.renderWebView(this.props.route.params.data[this.state.currentIndex])}
            


                </View>

        </ScrollView>
      </Container>

    );


  }

}

const styles = StyleSheet.create({
  buttonText: {
    flex: 1, flexDirection: 'column',
    fontFamily: "Poppins-Medium",
    fontSize: 17,
    color: "#000000",
    alignSelf: 'center',
    textAlign: 'center'
  },
  bottomContent: {
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#fbfbfb'
  },
  disabled: {
      color:appConfig.infoColor
  },
  logo: {
    width: 95,
    height: 62,
    marginBottom: 33,
    marginLeft: 35,
    marginRight: 33,
    alignSelf: 'center',

  },
  topcurve: {
    width: 149.8,
    height: 153.2,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1
  },
  bottomcurve: {
    width: 115,
    height: 309,
    position: 'relative',
    alignSelf: 'flex-end',
    zIndex: 0,
    marginTop: -180,
  },
  signup: {
    height: 45,
    fontFamily: 'Poppins-Medium',
    fontSize: 20,
    letterSpacing: 0.09,
    textAlign: "center",
    color: "#000000",
    marginTop: '3%'
  },
  formContainer: {
    marginTop: '0%',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    zIndex: 1
  },
  formItem: {
    marginTop: 22,
    marginLeft: '10%',
    width: 298,
    height: 44,
    borderRadius: 40,
  },
  reqSent: {
    height: 55,
    fontFamily: appConfig.fontFamily,
    fontSize: 16,
    letterSpacing: 0.09,
    textAlign: "center",
    color: "#000000",
  },
  reqDesc: {
    marginLeft: 38,
    marginRight: 38,
    fontFamily: 'Poppins-Light',
    fontSize: 16,
    letterSpacing: 0,
    textAlign: "center",
    color: "#000000",
    lineHeight: 24,
    alignSelf: 'center',
  },
  newReq: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    letterSpacing: 0,
    textAlign: "center",
    alignSelf: 'center',
    color: "#000000",
    lineHeight: 19,
    marginTop: '40%',
  },
  button: {
    marginLeft: 39,
    marginRight: 39,
    width: 298,
    height: 44,
    backgroundColor: "#6fe5d1",
    borderRadius: 40,
    alignSelf: 'center',
    alignContent: 'center'
  },
  terms: {
    height: 21,
    fontFamily: "CeraStencilPro-Bold",
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0,
    textAlign: "left",
    color: "#000000",
    marginLeft: "5%"
  },
  checkBoxContainer: {
    flexDirection: 'row',
    marginLeft: '10%',
    flexWrap: "wrap",
    marginBottom: -10
  },
  CheckBox: {
    marginTop: 13,
    borderRadius: 50
  },

  registeredLogin: {
    height: 21,
    fontFamily: "CeraPro-Regular",
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0,
    color: "#ff665e",
    textAlign: 'center',
    marginLeft: 5
  },
  registerButton: {
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  }


});




