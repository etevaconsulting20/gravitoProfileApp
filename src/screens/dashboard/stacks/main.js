import React, { Component } from "react"
import {connect} from "react-redux"
import { View, Text,StyleSheet } from "react-native"
import { WebView } from "react-native-webview"
import Tree from "../../../components/treeChart/tree"
import { ButtonGroup } from "react-native-elements"
import { appConfig } from "../../../settings/settings"
import {getSegment} from "../../../actions/index"
import LoadingIndicator from "../../../components/loadingIndicator"
import{Tab,Tabs } from "native-base";
import I18n from "react-native-i18n";
class DashboardMainScreen extends Component {
  

  constructor() {
    super()
    this.state = {
      selectedIndex: 0
    }
    this.updateIndex = this.updateIndex.bind(this)
  }
  componentDidMount=()=>{
    this.props.getSegment()
    this.onFocus=  this.props.navigation.addListener("focus",()=>{
      
      this.props.getSegment()
    })
    
  }
  componentWillUnmount=()=>{
    this.props.navigation.removeListener("focus",()=>{
     
      this.props.getSegment()
    })
  }
  updateIndex(selectedIndex) {
    this.setState({ selectedIndex })
  }
getContentForIndex=(index)=>{
  switch(index){
    case 0:
      return(<Tree treeData={this.props.plotdata} />) 
    case 1:
      return (<Text>Second Segment</Text>)
    default:
      return(<Text>Fist Segment</Text>) 
  }
}
render() {
 
  return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Tabs locked  tabBarUnderlineStyle={{zIndex:999999,borderBottomWidth:3,borderColor:appConfig.primaryColor,backgroundColor:'#ffffff'}} >
          <Tab heading={I18n.t('dashboard-segmentTitle')} tabStyle={{backgroundColor: '#fff'}} textStyle={{color: '#dcd8d6',fontWeight: 'normal',}}  activeTabStyle={{backgroundColor: '#ffffff',borderColor:'#ff665e',}} activeTextStyle={{fontFamily:'CeraPro-Medium', color: '#000',fontWeight: 'normal'}}>
              
              {this.props.plotdata? 
              
              <Tree key="plot" treeData={this.props.plotdata} />
                  
               
              : <Text style={{padding:10, fontFamily:'Poppins-SemiBold', color: '#000'}}>{I18n.t("dashboard-noSegments")}</Text>}
          </Tab>
          <Tab heading={I18n.t('dashboard-deviceTitle')}  tabStyle={{backgroundColor: '#fff'}} textStyle={{color: '#dcd8d6',fontWeight: 'normal'}} activeTabStyle={{backgroundColor: 'white'}} activeTextStyle={{fontFamily:'CeraPro-Medium', color: '#000', fontWeight: 'normal'}}>
          {false? 
              <Text style={{padding:10 , fontFamily:'Poppins-SemiBold', color: '#000'}}>{I18n.t("dashboard-noDevices")}</Text>
              : <Text style={{padding:10 , fontFamily:'Poppins-SemiBold', color: '#000'}}>{I18n.t("dashboard-noDevices")}</Text>}
          </Tab>
          
          
      </Tabs>
      </View>
  )
}

}

const style = StyleSheet.create({
  Title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    letterSpacing: 0.09,
    
    
}
})

const mapStateTopProps = ({ dashboard }) => {
  return { ...dashboard }
}
export default connect(mapStateTopProps, {
 
  getSegment
})(DashboardMainScreen);