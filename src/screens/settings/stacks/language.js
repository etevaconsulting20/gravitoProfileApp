import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { connect } from "react-redux"
import I18n from "react-native-i18n";
import {
    Container, Card, Body, Left, CardItem, Thumbnail,
    Right, Badge,
} from 'native-base';
import { ListItem, Icon } from 'react-native-elements'
import { appConfig } from "../../../settings/settings";
import { changeLanguage } from "../../../actions/index"


const list = [
    {
        name: 'English',
        code: "en",
        flagSrc: require("../../../assets/flags/english.png"),


    },
    {
        name: 'Finnish',
        code: "fi",
        flagSrc: require("../../../assets/flags/finnish.png"),

    },

]



class LanguageStack extends Component {
    componentDidMount = () => {
        this.props.navigation.setOptions({
            headerTitle: I18n.t("settings-changeLanguageHeader"),
            headerTint:"white"
        })
        this.props.navigation.dangerouslyGetParent().setOptions({
            tabBarVisible: false,
        })
        this.props.navigation.dangerouslyGetParent().dangerouslyGetParent().setOptions({
            headerShown: false
        })
    }
    componentWillUnmount() {
        this.props.navigation.dangerouslyGetParent().setOptions({
            tabBarVisible: true,
        })
        this.props.navigation.dangerouslyGetParent().dangerouslyGetParent().setOptions({
            headerShown: true
        })
    }
    onChangeLanguage = (code) => {
        this.props.changeLanguage(code)
        setTimeout(() => {
            this.props.navigation.pop()
        }, 200);
    }
    render() {
        return (
            <>
                <Container>
                    <ScrollView>
                        {/* AboutYouCard */}
                        <Card style={style.AboutUsCard} >
                        <View
                                collapsable={false}
                                style={style.cardHeader}>
                                <Left style={{ padding: 16 }}>
                                    <Text style={style.Title}>{I18n.t("settings-language")}</Text>

                                </Left>
                            </View>
                            <View>
                                {
                                    list.map((l, i) => {
                                        
                                        return (
                                            <ListItem
                                                key={i}
                                                leftAvatar={{ source:l.flagSrc  }}
                                                title={l.name}
                                                titleStyle={style.languageText}
                                                onPress={() => this.onChangeLanguage(l.code)}
                                                rightIcon={() => this.props.locale === l.code ? <Icon type="font-awsome" name="check" color={appConfig.primaryColor} /> : null}
                                                bottomDivider
                                            />
                                        )
                                    }
                                    )
                                }
                            </View>
                        </Card>
                    </ScrollView>
                </Container>
            </>)
    }
}

const style = StyleSheet.create({
    Title: {
        fontFamily: appConfig.fontFamily,
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
    changeLanguage
})(LanguageStack);

