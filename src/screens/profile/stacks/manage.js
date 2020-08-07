import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView, BackHandler } from "react-native";
import { connect } from "react-redux";
import * as _ from "lodash"
import I18n from "react-native-i18n";
import {
    Container, Card, Body, Left, CardItem, Thumbnail,
    Right, Badge,
} from 'native-base';
import { HeaderBackButton } from "@react-navigation/stack"
import { ListItem, Icon, Button, SearchBar, Divider } from 'react-native-elements'
import { appConfig } from "../../../settings/settings";
import { changeLanguage, updateUserConsents,saveSegment } from "../../../actions/index"






class ProfileManageScreen extends Component {
    state = {
        selectedItems: [],
        filterItems: [],
        nonSelectedItems: [],
        search: ""

    };


    componentDidMount = () => {

        this.props.navigation.setOptions({
            headerTitle: this.props.route.params.name,
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
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress)
        this.intialize()


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
    intialize = () => {
        if (this.props.route.params.contentType === "Preferences") {
            let selectedItems = this.getGivenConsents(this.props.route.params.data.consents);
            let nonSelectedItems = this.getRejectConsents(this.props.route.params.data.consents)


            this.setState({ selectedItems: selectedItems, nonSelectedItems: nonSelectedItems,filterItems:nonSelectedItems })
            return;
        }
        if(this.props.route.params.contentType === "Interest"){
            let selectedItems =this.props.route.params.segments?this.props.route.params.segments:[] ;
            let nonSelectedItems = this.props.route.params.similarSegments?this.props.route.params.similarSegments:[]
            this.setState({ selectedItems: selectedItems, nonSelectedItems: nonSelectedItems, })
            return;
        }
    }
    onBackPress = () => {
        if (this.props.route.params.contentType === "Preferences"){
            this.saveConsents()
        }
        if(this.props.route.params.contentType === "Interest"){
            
            this.props.saveSegment({domainName:this.props.route.params.name,data:this.state.selectedItems})
        }
        
        this.props.navigation.pop()
        return true
    }
    onUnCheckItem = (item) => {
        let selectedItems = [...this.state.selectedItems]
        _.remove(selectedItems, (listItem) => {
            return listItem.name === item.name
        })
        let nonSelectedItems = [...this.state.nonSelectedItems]
        nonSelectedItems.push(item);

        this.setState({
            selectedItems: selectedItems,
            nonSelectedItems: nonSelectedItems
        }, () => {
            this.updateFilter(this.state.search)
        })


    }
    onCheckItem = (item) => {
        let nonSelectedItems = [...this.state.nonSelectedItems];
        let filterItems = [...this.state.filterItems]
        _.remove(nonSelectedItems, (listItem) => {
            return listItem.name === item.name
        })
        _.remove(filterItems, (listItem) => {
            return listItem.name === item.name
        })
        let selectedItems = [...this.state.selectedItems]
        selectedItems.push(item)
        this.setState({
            selectedItems: selectedItems,
            nonSelectedItems: nonSelectedItems,
            filterItems: filterItems
        })
    }
    getGivenConsents = (consentData) => {
        let filterValues = _.filter(consentData, (item) => item.value === true)
        let outputData = _.map(filterValues, (consentItem) => {
            return {
                ...consentItem
            }
        })
        return outputData;

    }

    getRejectConsents = (consentData) => {
        let filterValues = _.filter(consentData, (item) => item.value === false)
        let outputData = _.map(filterValues, (consentItem) => {
            return {
                ...consentItem
            }
        })
        return outputData;

    }
    saveConsents = () => {

        let selected = _.map([...this.state.selectedItems], (item) => item.name)
        let oldConsents = this.props.route.params.data.consents;
        let newConsents = _.map(oldConsents, (oc) => {
            if (_.includes(selected, oc.name)) {
                return ({
                    ...oc,
                    value: true
                })
            }
            return ({
                ...oc,
                value: false
            })

        })
        let updatedConsents = {
            domainName: this.props.route.params.name,
            consentData: newConsents
        }

        this.props.updateUserConsents(updatedConsents)
    }
    updateSearch = (search) => {

        this.setState({ search: search });

        this.updateFilter(search)


    };
    updateFilter = (searchText) => {
        let nonSelectedItems = [...this.state.nonSelectedItems];

        let newFilterItem = _.filter(nonSelectedItems, (item, i) => {
            return _.includes(item.name, searchText)
        })
        this.setState({ filterItems: newFilterItem })
    }

    render() {

        return (
            <>
                <ScrollView>
                    <SearchBar
                        placeholder={I18n.t("profile-searchPlaceholder")}
                        style={style.listTitle}
                        onChangeText={(text) => this.updateSearch(text)}
                        lightTheme
                        value={this.state.search}
                    />
                    {
                        this.state.selectedItems?this.state.selectedItems.map((item, i) => {
                            return (
                                <ListItem
                                    key={i}
                                    title={item.name}
                                    titleStyle={style.listTitle}
                                    rightIcon={
                                        <Icon type="MaterialCommunityIcons"
                                            name="check-circle"
                                            color={appConfig.primaryColor}
                                        />
                                    }
                                    onPress={() => this.onUnCheckItem(item)}
                                />
                            )
                        }):null
                    }
                       <Text><Divider style={{ backgroundColor: 'blue' }} /></Text>
                    {
                        this.state.search != "" || this.props.route.params.contentType === "Preferences"  ?
                            this.state.filterItems.length > 0 ?
                                this.state.filterItems.map((item, i) => {
                                    return (
                                        <ListItem
                                            key={i}
                                            title={item.name}
                                            titleStyle={style.listTitle}
                                            rightIcon={
                                                <Icon type="MaterialCommunityIcons"
                                                    name="panorama-fish-eye"
                                                    color={appConfig.infoColor}
                                                />
                                            }
                                            onPress={() => this.onCheckItem(item)}
                                        />
                                    )
                                }) : <View style={{ display: "flex", justifyContent: "center", flexDirection: "row" }}>
                                    <Text style={style.listTitle}>No items founds</Text>
                                </View>
                            : null
                    }
                 
                 

                </ScrollView>
            </>
        )
    }
}

const style = StyleSheet.create({
    listTitle: {
        fontFamily: appConfig.fontFamily,
        fontSize: 16,
        letterSpacing: 0.09,
        color: "#000000",

    },
    Title: {
        fontFamily: 'CeraStencilPro-Black',
        fontSize: 18,
        letterSpacing: 0.09,
        color: "#000000",
        paddingBottom: 10
    },
    cardHeader: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'flex-start',
        maxHeight: 61,

    },
    languageText: {
        color: 'black',
        fontFamily: 'CeraPro-Medium',
        fontSize: 16,
        lineHeight: 20,
        paddingTop: 5,

    },
    AboutUsCard: {
        // marginTop: 8,
        flex: 1,
        flexDirection: 'column',
        height: 'auto',
    },
})

const mapStateTopProps = ({ settings }) => {
    return { ...settings }
}
export default connect(mapStateTopProps, {
    changeLanguage,
    updateUserConsents,
    saveSegment
})(ProfileManageScreen);

