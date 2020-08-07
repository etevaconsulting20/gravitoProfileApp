import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView, BackHandler, RefreshControl } from "react-native";
import CountryPicker, { getAllCountries } from "react-native-country-picker-modal"
import { connect } from "react-redux";
import * as _ from "lodash"
import I18n from "react-native-i18n";
import { _styles } from "../../../util/helpers/styles";
import {
    Container, Card, Body, Left, CardItem, Thumbnail,
    Right, Badge,
} from 'native-base';
import { HeaderBackButton } from "@react-navigation/stack"
import { ListItem, Icon, Button, SearchBar, Divider, Input } from 'react-native-elements'
import { appConfig } from "../../../settings/settings";
import { updateUserProfile } from "../../../actions"




class ProfileAboutYouScreen extends Component {
    state = {
        formData: null,
        countryData: null,

    }
    componentDidMount = () => {

        this.props.navigation.setOptions({
            headerTitle: this.props.route.params.contentType,
            headerTint: "white",
            headerTitleStyle: { fontFamily: appConfig.fontFamily },
            headerLeft: () => <HeaderBackButton tintColor={"white"} onPress={this.onBackPress}></HeaderBackButton>
        })
        this.props.navigation.dangerouslyGetParent().setOptions({
            tabBarVisible: false,
        })
        this.props.navigation.dangerouslyGetParent().dangerouslyGetParent().setOptions({
            headerShown: false
        })
        this.intializeFormData();

        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
        
    }
    componentWillUnmount() {
        this.props.navigation.dangerouslyGetParent().setOptions({
            tabBarVisible: true,
        })
        this.props.navigation.dangerouslyGetParent().dangerouslyGetParent().setOptions({
            headerShown: true
        })
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);

    }
    intializeFormData = async() => {
        let data = this.props.route.params.data;
        let formData = [
            {
                name: "email",
                value: data.email ? data.email : "",
                error: false,
                placeholder: "Email",
                label: "about-email",
                iconType: "font-awesome-5",
                iconName: "envelope",
                keyboardType: "email-address",
                disable: true
            },
            {
                name: "firstname",
                value: data.firstname ? data.firstname : "",
                error: false,
                placeholder: "First name",
                label: "about-firstName",
                iconType: "font-awesome-5",
                iconName: "id-card-alt",
                keyboardType: "default"
            },
            {
                name: "lastname",
                value: data.lastname ? data.lastname : "",
                error: false,
                placeholder: "Last name",
                label: "about-lastName",
                iconType: "font-awesome-5",
                iconName: "id-card-alt",
                keyboardType: "default"
            },
            {
                name: "nickname",
                value: data.nickname ? data.nickname : "",
                error: false,
                placeholder: "Nick name",
                label: "about-nickName",
                iconType: "font-awesome-5",
                iconName: "id-card-alt",
                keyboardType: "default"
            },
            {
                name: "countryCode",
                value: data.countryCode ? data.countryCode : "",
                error: false,
                placeholder: "Country code",
                label: "about-countryCode",
                iconType: "font-awesome-5",
                iconName: "globe-europe",
                keyboardType: "numeric"
            },
            {
                name: "phoneNumber",
                value: data.phoneNumber ? data.phoneNumber : "",
                error: false,
                placeholder: "Phone number",
                label: "about-phoneNumber",
                iconType: "font-awesome-5",
                iconName: "phone",
                keyboardType: "numeric"
            },
            {
                name: "address1",
                value: data.address ? data.address.address1 ? data.address.address1 : "" : "",
                error: false,
                placeholder: "Address 1",
                label: "about-address1",
                iconType: "font-awesome-5",
                iconName: "house-user",
                keyboardType: "default"
            },
            {
                name: "address2",
                value: data.address ? data.address.address2 ? data.address.address2 : "" : "",
                error: false,
                placeholder: "Address 2",
                label: "about-address2",
                iconType: "font-awesome-5",
                iconName: "house-user",
                keyboardType: "default"
            },
            {
                name: "city",
                value: data.address ? data.address.city ? data.address.city : "" : "",
                error: false,
                placeholder: "City",
                label: "about-city",
                iconType: "font-awesome-5",
                iconName: "house-user",
                keyboardType: "default"
            },
            {
                name: "country",
                value: data.address ? data.address.country ? data.address.country : "" : "",
                error: false,
                placeholder: "Country",
                label: "about-country",
                iconType: "font-awesome-5",
                iconName: "house-user",
                keyboardType: "default"
            },
            {
                name: "zip",
                value: data.address ? data.address.zip ? data.address.zip : "" : "",
                error: false,
                placeholder: "zip",
                label: "about-zip",
                iconType: "font-awesome-5",
                iconName: "house-user",
                keyboardType: "numeric"
            },
        ]
      await  this.getCountryCodeFromCallingCode(data.countryCode)
        this.setState({ formData: formData })

    }
    getFormdataValueForField(name) {
        let index = _.findIndex([...this.state.formData], (item, index) => item.name === name);
        return this.state.formData[index].value;
    }
    saveProfile = () => {
        let updatedDetails = {
            "address": {
                "address1": this.getFormdataValueForField("address1"),
                "address2": this.getFormdataValueForField("address2"),
                "city": this.getFormdataValueForField("city"),
                "country": this.getFormdataValueForField("country"),
                "zip": this.getFormdataValueForField("zip"),
            },
            "firstname": this.getFormdataValueForField("firstname"),
            "lastname": this.getFormdataValueForField("lastname"),
            "nickname": this.getFormdataValueForField("nickname"),
            "phoneNumber": this.getFormdataValueForField("phoneNumber"),
            "countryCode": this.getFormdataValueForField("countryCode"),
        }

        let newProfile = { ...this.props.route.params.data, ...updatedDetails }

        this.props.updateUserProfile(newProfile)
    }
    onBackPress = () => {
        this.saveProfile()

        this.props.navigation.pop()
        return true
    }
    onChangeField = (e, index) => {
        let formData = [...this.state.formData];
        formData[index].value = e.nativeEvent.text;
        this.setState({ formData: formData })
    }
    onSelectCountryCode = (countryData, index) => {
        let formData = [...this.state.formData];
        formData[index].value = "+" + countryData.callingCode[0];
        this.setState({ countryData: countryData })


    }
    getCountryCodeFromCallingCode = async (callingCode) => {

        try {
            let actualCallingCode = callingCode.split("+")[1];
            let allCountries = await getAllCountries()
            
            let index = _.findIndex(allCountries, (countryItem, index) => {
                return countryItem.callingCode == actualCallingCode
            })
           await this.setState({countryData:allCountries[index]})
            
        } catch (error) {
            let countryData={
                cca2:"FI"
            }
            this.setState({countryData:countryData})
        }
    }
    render() {

        return (
            <>
                <ScrollView
                    refreshControl={
                        <RefreshControl refreshing={false} onRefresh={() => { }} />
                    }
                >
                    <Card style={styles.AboutUsCard} >
                        {
                            this.state.formData ? this.state.formData.map((item, index) => {
                                if (item.name === "countryCode") {
                                    return (<Input
                                        inputContainerStyle={{ padding: 0, margin: 0 }}
                                        disabled={item.disable}
                                        containerStyle={{ display: "flex"}}
                                        key={`formdata-input-${index}`}
                                        keyboardType={item.keyboardType}
                                        label={<Text style={{ fontFamily: appConfig.fontFamily, fontSize: 16 }}>{I18n.t(item.label)}</Text>}
                                        inputStyle={{ fontSize: 16, fontFamily: appConfig.fontFamily }}
                                        InputComponent={React.forwardRef((props, ref) =>

                                            <CountryPicker
                                                
                                                countryCode={this.state.countryData ? this.state.countryData.cca2 : "FI"}
                                                withFlag={true}
                                                withCallingCode={true}
                                                withAlphaFilter
                                                onSelect={(countryData) => this.onSelectCountryCode(countryData, index)}
                                                withCallingCodeButton />

                                        )}
                                    />
                                    )
                                }
                                return (
                                    <Input
                                        inputContainerStyle={{ padding: 0, margin: 0 }}
                                        disabled={item.disable}
                                        containerStyle={{ display: "flex" }}
                                        key={`formdata-input-${index}`}
                                        keyboardType={item.keyboardType}
                                        label={<Text style={{ fontFamily: appConfig.fontFamily, fontSize: 16 }}>{I18n.t(item.label)}</Text>}
                                        value={item.value}
                                        inputStyle={{ fontSize: 16, fontFamily: appConfig.fontFamily }}
                                        leftIcon={<Icon type={item.iconType} solid={true} size={14} name={item.iconName} />}
                                        rightIcon={item.disable !== true ? <Icon type={item.iconType} solid={true} size={14} name={"edit"} /> : null}
                                        onChange={(e) => { this.onChangeField(e, index) }}
                                    />
                                )
                            }) : null
                        }

                    </Card>
                </ScrollView>
            </>
        )
    }
}
const styles = StyleSheet.create({
    button: {
        flex: 1,
        width: 'auto',
        height: 44,
        borderRadius: 40,
        backgroundColor: "#ff665e",
        alignSelf: 'center',
        justifyContent: 'center',
        margin: 2
    },
    buttonText: {
        fontFamily: "CeraPro-Medium",
        fontSize: 14,
        color: "#ffffff",
        alignSelf: "center",
        textAlign: "center"
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },

    ProfileImage: {
        borderRadius: 210 / 2,
        height: 210,
        width: 210,
        paddingBottom: 20
    },
    PreferenceList: {
        paddingLeft: 10,
        paddingRight: 10,
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'flex-start'
    },
    Divider: {
        borderTopColor: '#EBEBEB',
        padding: 0,
        borderTopWidth: 2,
        width: '92%',
        alignSelf: 'center',
        margin: 0
    },

    CandidateDetailsTxt: {
        color: '#000000',
        fontFamily: 'CeraPro-Regular',
        fontSize: 16,
        height: 34,
        marginTop: 3
    },
    iconimg: {
        height: 15,
        width: 15,
        margin: 7
    },
    AboutUsCard: {
        // padding:5,

        padding: 5,
        flex: 1,
        flexDirection: 'column',
        maxHeight: 'auto',
    },
    Title: {
        flex: 3,
        flexDirection: 'row',
        width: '100%',
        alignContent: 'stretch',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    UploadVideoVitaContainer: {
        height: 300,
        width: '100%',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0
    },
    uplaodImage: {
        height: 60,
        width: 60

    },
    uploadImageText: {
        flex: 1,
        flexDirection: 'row',
        color: 'black',
        fontSize: 16,
        textAlign: "center",
        marginTop: 12,
        maxHeight: 60,
        maxWidth: '100%',
        letterSpacing: 0.05,
        lineHeight: 20,
        fontFamily: 'CeraPro-Regular',
    },
    backgroundImage: {
        height: 228,
        width: 228,
        justifyContent: "center",
        alignItems: "center"
    },

});
const mapStateTopProps = ({ settings }) => {
    return { ...settings }
}
export default connect(mapStateTopProps, {
    updateUserProfile
})(ProfileAboutYouScreen);
