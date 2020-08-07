import React ,{Component} from "react"
import {View , Text, FlatList,StyleSheet,TouchableOpacity} from "react-native"
import { Container,Tabs,Tab,Content, Body,List, ListItem,Right, Button, Accordion } from 'native-base';
import { appConfig } from "../../../settings/settings";
import { connect } from "react-redux";
import {getComms} from '../../../actions/index'
import I18n from "react-native-i18n";

 

  const styles = StyleSheet.create({
    
    item: {
      backgroundColor: appConfig.headerColor,
      padding: 10,
      marginVertical: 10,
      marginHorizontal: 10,
    },
    title: {
      fontSize: 14,
      fontFamily:appConfig.fontFamily
    },
  });

  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

class CommunicationMainScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
          refreshing: false,
        };
    }

      
    
    
    
      renderItem = ({ item }) => (
        <TouchableOpacity onPress={ () => this.actionOnRow(item)}>
            <Item title={item.title} />
        </TouchableOpacity>
      );
  
    actionOnRow(item) {

        var dataElement = {
            index:item.id, 
            data: null
        }

        switch(item.type){
            case 'email':
                dataElement.data = this.props.emailEvents
                break;
            case 'web':  
            dataElement.data = this.props.webEvents
            break;
            case 'mobile':
                dataElement.data = this.props.mobileEvents
                break;
            case 'sms':
                dataElement.data = this.props.smsEvents
                break;  
        }

       

        this.props.navigation.navigate("comms-message", dataElement)

    }

    componentDidMount = () => {
        this.props.getComms();

        this.onFocus = this.props.navigation.addListener("focus", () => {
            this.props.getComms();
        })

    }
    componentWillUnmount = () => {
        this.props.navigation.removeListener("focus", () => {
            this.props.getComms();
        })
    }


   
    render() {
        const { webEvents, emailEvents, mobileEvents, smsEvents, loading } = this.props
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Tabs  tabBarUnderlineStyle={{zIndex:999999,borderBottomWidth:3,borderColor:appConfig.primaryColor,backgroundColor:'#ffffff'}} >
                <Tab heading={I18n.t('communication-emailTitle')} tabStyle={{backgroundColor: '#fff'}} textStyle={{color: '#dcd8d6',fontWeight: 'normal', fontFamily:appConfig.fontFamily,fontSize:12}}  activeTabStyle={{backgroundColor: '#ffffff',borderColor:'#ff665e',}} activeTextStyle={{fontFamily:'Poppins-SemiBold', color: '#000',fontWeight: 'normal',fontSize:12}}>
                    
                    {emailEvents !== null? 
                    
                    <FlatList
                    data={emailEvents}
                    renderItem={this.renderItem}
                    keyExtractor={item => 'emailkey' + item.id}
                    scrollEventThrottle={250}
                    onRefresh={() => this.props.getComms()}
                    refreshing={loading}
                   
                  />
                        
                     
                    : !loading? <Text style={{padding:10, fontFamily:'Poppins-SemiBold', color: '#000'}}>{I18n.t("communication-noEmail")}</Text>:<Text>Loading.. please wait</Text>}
                </Tab>
                <Tab heading={I18n.t('communication-webTitle')}  tabStyle={{backgroundColor: '#fff'}} textStyle={{color: '#dcd8d6',fontWeight: 'normal', fontFamily:appConfig.fontFamily,fontSize:12}} activeTabStyle={{backgroundColor: 'white'}} activeTextStyle={{fontFamily:'CeraPro-Medium', color: '#000', fontWeight: 'normal',fontSize:12}}>
                {webEvents !== null? 
                    
                    <FlatList
                    data={webEvents}
                    renderItem={this.renderItem}
                    keyExtractor={item => 'webkey' + item.id}
                    scrollEventThrottle={250}
                    onRefresh={() => this.props.getComms()}
                    refreshing={loading}
                  />
                        
                     
                    : <Text style={{padding:10 , fontFamily:'Poppins-SemiBold', color: '#000'}}>{I18n.t("communication-noWebNotifications")}</Text>}
                </Tab>
                <Tab heading={I18n.t('communication-mobileTitle')} tabStyle={{backgroundColor: '#fff'}} textStyle={{color: '#dcd8d6',fontWeight: 'normal', fontFamily:appConfig.fontFamily,fontSize:12}}  activeTabStyle={{backgroundColor: '#ffffff',borderColor:'#ff665e',}} activeTextStyle={{fontFamily:'CeraPro-Medium', color: '#000',fontWeight: 'normal',fontSize:12}}>
                {mobileEvents !== null && mobileEvents.length > 0? 
                    
                    <FlatList
                    data={mobileEvents}
                    renderItem={this.renderItem}
                    keyExtractor={item => 'mobilekey' + item.id}
                    scrollEventThrottle={250}
                    onRefresh={() => this.props.getComms()}
                    refreshing={loading}
                  />
                        
                     
                    : <Text style={{padding:10, fontFamily:'Poppins-SemiBold', color: '#000'}}>{I18n.t("communication-noMobileNotifications")}</Text>}
                </Tab>
                <Tab heading={I18n.t('communication-smsTitle')}  tabStyle={{backgroundColor: '#fff'}} textStyle={{color: '#dcd8d6',fontWeight: 'normal', fontFamily:appConfig.fontFamily,fontSize:12}} activeTabStyle={{backgroundColor: 'white'}} activeTextStyle={{fontFamily:'CeraPro-Medium', color: '#000', fontWeight: 'normal',fontSize:12}}>
                {smsEvents !== null && smsEvents.length > 0? 
                    
                    <FlatList
                    data={smsEvents}
                    renderItem={this.renderItem}
                    keyExtractor={item => 'smskey' + item.id}
                    scrollEventThrottle={250}
                    onRefresh={() => this.props.getComms()}
                    refreshing={loading}
                  />
                        
                     
                    : <Text style={{padding:10, fontFamily:'Poppins-SemiBold', color: '#000'}}>{I18n.t("communication-noSMSNotifications")}</Text>}
                </Tab>
            </Tabs>
            </View>
        )
    }
}

const mapStateToProps = ({ comms }) => {
    return comms
}
export default connect(mapStateToProps, {
    getComms

})(CommunicationMainScreen);
