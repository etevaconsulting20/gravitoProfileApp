import React, { Component } from "react"
import { connect } from "react-redux"
import I18n from "react-native-i18n";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Settings } from "react-native"
import {
    Container, Card, Body, Left, CardItem, Thumbnail,
    Right, Badge,
} from 'native-base';
import { changeLanguage } from "../../../actions/index"
import { _styles } from "../../../util/helpers/styles";
import { getLanguageFromCode } from "../../../util/helpers/helpers";
import { appConfig } from "../../../settings/settings";


class SettingsMainScreen extends Component {
    goToLanguages = () => {
        this.props.navigation.navigate("settings-language")
    }
    render() {
        return (
            <>
                <Container>

                    <ScrollView>
                        {/* AboutYouCard */}
                        <Card style={styles.AboutUsCard} >
                            <View
                                collapsable={false}
                                style={styles.cardHeader}>
                                <Left style={{ padding: 16 }}>
                                    <Text style={styles.Title}>{I18n.t("settings-language")}</Text>

                                </Left>
                                <Right style={{ padding: 16 }}>
                                    
                                    <View>
                                        <TouchableOpacity onPress={this.goToLanguages} ><Text style={_styles.mActionText}>{I18n.t('profile-edit')}</Text></TouchableOpacity>
                                    </View>
                                </Right>
                            </View>

                            <View style={styles.AboutUsDetails}>
                                <Left style={{ flex: 1.75 }}>
                                    <View>
                                        <Badge style={{backgroundColor:appConfig.infoColor,}} info>
                                        <Text style={{...styles.CandidateName,fontSize:14}}>{getLanguageFromCode(this.props.locale)}</Text>
                                        </Badge>
                                    </View>
                                    
                                </Left>

                            </View>
                        </Card>
                    </ScrollView>
                </Container>
            </>
        )
    }
}
const styles = StyleSheet.create({
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
    CandidateName: {
        color: '#ffff',
        fontFamily: 'Poppins-Medium',
        fontSize: 16,
        lineHeight: 20,
        paddingTop:5,
        
    },
    AboutUsCard: {
        // marginTop: 8,
        flex: 1,
        flexDirection: 'column',
        height: 'auto',
    },
    AboutUsDetails: {
        marginLeft: 18,
        marginTop: -4,
        marginBottom:15,
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'flex-start',
        maxHeight: 41,
        borderBottomColor: 'black'
    },
})

export default SettingsMainScreen