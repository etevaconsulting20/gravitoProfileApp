import React, { Component } from "react";
import { connect } from "react-redux";
import * as _ from 'lodash';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, RefreshControl } from "react-native"
import { _styles } from "../../../util/helpers/styles";
import {
    Container, Header, Content, Card, Body, Left, CardItem, Thumbnail,
    Right, Button, Icon, Label, Badge,
} from 'native-base';
import {
    getProfile, getUserConsents, getGlobalSegment
} from "../../../actions/index"
import { appConfig } from "../../../settings/settings";
import I18n from "react-native-i18n";

class Dividers extends React.Component {
    render() {
        return (<View>
            {this.props.type == "Simple" ? <View style={_styles.Separator}></View> :
                this.props.type == "RequiredSkills" ?
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: "center" }}>
                        <View style={styles.RequiredSkillsDivider}></View>
                        <Image style={{ maxHeight: 40, maxWidth: 40, marginTop: 15 }} source={this.props.source}></Image>
                        <View style={styles.RequiredSkillsDivider}></View>
                    </View> : this.props.type == "Experience" ?
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: "center" }}>
                            <View style={styles.RequiredSkillsDivider}></View>
                            <Image style={{ maxHeight: 40, maxWidth: 40, marginTop: 15 }} source={this.props.source}></Image>
                            <View style={styles.RequiredSkillsDivider}></View>
                        </View> : this.props.type == "CharTest" ?
                            <View style={{ width: '92%', borderTopColor: '#dcd8d6', borderTopWidth: 2, justifyContent: 'center', alignSelf: 'center' }}></View>
                            : <View style={styles.Divider}></View>}
        </View>)
    }
}

function iFrameSize() {
    if (Platform.OS === 'ios') {
        return { height: 900, width: 800 }
    } else {
        return { height: 350, width: '40%' }
    }
}
const getDomainSegments = (segmentData, domainName) => {

    var children = segmentData;
    let index = _.findIndex(children, (child) => {
        return child.domain == domainName
    });

    return index != -1 ? children[index].segments : null
}

const getDomainSimilarSegments = (similarSegmentsData, domainName) => {
    var children = similarSegmentsData
    let index = _.findIndex(children, (child) => {
        return child.domain == domainName
    });

    return index != -1 ? children[index].segments : null
}
const removeCommonSegments = (master, arrayToRemove) => {
    let includedNames = _.map(arrayToRemove, (item, i) => {
        return item.name
    })
    _.remove(master, (item) => {
        return _.includes(includedNames, item.name)
    })
    return master
}
class ProfileMainScreen extends Component {

    constructor(props) {
        super(props);
        this.onRefresh = this.onRefresh.bind(this)
    }
    componentDidMount = () => {
        this.props.getProfile();
        this.props.getUserConsents();
        this.props.getGlobalSegment()
        this.onFocus = this.props.navigation.addListener("focus", () => {
            setTimeout(() => {
                this.props.getProfile();
                this.props.getUserConsents();
                this.props.getGlobalSegment()
            }, 2000)

        })

    }
    componentWillUnmount = () => {
        this.props.navigation.removeListener("focus", () => {
            setTimeout(() => {
                this.props.getProfile();
                this.props.getUserConsents();
                this.props.getGlobalSegment()
            }, 2000)

        })
    }

    aboutyou =  (type, data) => {
        let paramObject = {
            contentType: type,
            data: data,
        }
        this.props.navigation.navigate("profile-aboutyou", paramObject)
    }
    manage = (type, data, name) => {
        switch (type) {
            case "Preferences": {
                let paramObject = {
                    contentType: type,
                    data: data,
                    name: name
                }
                this.props.navigation.navigate("profile-manage", paramObject)
                break;
            }
            case "Interest": {
                if (getDomainSimilarSegments(this.props.similarSegments, name)) {
                    let paramObject = {
                        contentType: type,
                        similarSegments: removeCommonSegments([...getDomainSimilarSegments(this.props.similarSegments, name)], data),
                        segments: data,
                        name: name
                    }
                    this.props.navigation.navigate("profile-manage", paramObject)
                }
                break;
            }
            default:
                break;

        }
    }

    onRefresh() {
        this.props.getProfile();
        this.props.getUserConsents();
        this.props.getGlobalSegment();
    }

    returnAddress(address){
        var completeAddress = '';
        if(address.address1 !== ''){
            completeAddress += this.titleCase(address.address1) + ', ';
        }
        if(address.address2 !== ''){
            completeAddress += this.titleCase(address.address2) + ', ';
        }
        if(address.city !== ''){
            completeAddress += this.titleCase(address.city) + ', ';
        }
        if(address.country !== ''){
            completeAddress += this.titleCase(address.country) + ', ';
        }
        if(address.zip !== ''){
            completeAddress += this.titleCase(address.zip);
        }
        return completeAddress;
    }


    titleCase(str) {
        str = str.toLowerCase().split(' ');
        for (var i = 0; i < str.length; i++) {
          str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
        }
        return str.join(' ');
      }

    render() {
        const { profile, defaultConsents, domainConsents, segmentData, loading, similarSegments } = this.props

        return (
            <Container>

                <ScrollView
                    refreshControl={
                        <RefreshControl refreshing={loading} onRefresh={this.onRefresh} />
                    }
                >
                    {/* AboutYouCard */}
                    <View style={styles.AboutUsCard} >
                        <View
                            collapsable={false}
                            style={styles.cardHeader}>
                            <Left style={{ padding: 10 }}>
                                <Text style={styles.Title}>{I18n.t('profile-aboutyou')}</Text>
                            </Left>
                            <Right style={{ padding: 10 }}>
                                <View>
                                    <TouchableOpacity onPress={() => this.aboutyou(I18n.t("about-title"),profile)} ><Text style={_styles.mActionText}>{I18n.t('profile-edit')}</Text></TouchableOpacity>
                                </View>
                            </Right>
                        </View>

                        <View style={styles.AboutUsDetails}>
                            <Left style={{ flex: 1.75 }}>
                                <Text style={styles.CandidateName}>{profile && profile.lastname} {profile && profile.firstname}{profile && profile.nickname ? ' (' +  profile.nickname + ')' : ''}</Text>
                                <Text style={styles.CandidateRole}>{profile && profile.username ? profile.username : ''}</Text>
                                <Text style={styles.CandidateRole}>{profile && profile.countryCode} {profile && profile.phoneNumber}</Text>
                                <Text style={styles.CandidateRole}>{profile && profile.address?this.returnAddress(profile.address):''}</Text>
                            </Left>

                        </View>
                    </View>

                    {/* Default Consent Preferences */}
                    {defaultConsents !== null ?
                        <View style={styles.AboutUsCard} >
                            <View
                                collapsable={false}
                                style={{ ...styles.cardHeader, width: "100%", padding: 12 }}>
                                <Text style={styles.Title}>{I18n.t('profile-defaultPreferences')} </Text>
                            </View>
                            <View style={{ ...styles.Container, flexDirection: "column" }} >
                                <View style={styles.SkillsDetails} >
                                    {defaultConsents && defaultConsents.consents != null
                                        ?
                                        <View>
                                            <View style={{ flex: 1, flexDirection: 'row' }} >
                                                <Left>
                                                    <Text style={styles.Title}>{I18n.t('profile-consentHeading')}</Text>
                                                </Left>
                                                <Right>
                                                    <View>
                                                        <TouchableOpacity onPress={() => this.manage("Preferences", defaultConsents, I18n.t('profile-defaultPreferences'))} ><Text style={_styles.mActionText}>{I18n.t('profile-manage')}</Text></TouchableOpacity>
                                                    </View>
                                                </Right>
                                            </View>

                                            <Dividers type='Simple' />
                                            <View style={{
                                                flex: 1, flexDirection: 'row',
                                                flexWrap: 'wrap'
                                            }}>
                                                {defaultConsents.consents.map((consent, i) => (
                                                    consent.value !== false ?
                                                        Platform.OS == 'ios' ?
                                                            < Badge style={styles.badgeStyleIos} key={i}>

                                                                <Text style={[_styles.BadgesContent, { paddingVertical: 3, paddingHorizontal: 7 }]}>
                                                                    {typeof consent.value !== "undefined" && consent.value !== false ?
                                                                        consent.name
                                                                        : null}
                                                                </Text>
                                                            </ Badge> : < Badge style={styles.badgeStyle} key={i}>

                                                                <Text style={[_styles.BadgesContent, { paddingVertical: 3, paddingHorizontal: 7 }]}>
                                                                    {typeof consent.value !== "undefined" && consent.value !== false ?
                                                                        consent.name
                                                                        : null}
                                                                </Text>
                                                            </ Badge>
                                                        : null
                                                ))}
                                            </View>
                                        </View> : null}
                                </View>

                            </View>

                        </View> : null}
                    {domainConsents !== null ?
                        <View
                            collapsable={false}
                            style={styles.cardHeader}>
                            <Left style={{ flexDirection: 'row', padding: 10, flex: 2 }}>
                                <Text style={styles.Title}>{I18n.t('profile-domainPreferences')}</Text>
                            </Left>

                        </View> : null}
                    {/* Domain Consent Preferences */}
                    {domainConsents !== null ?
                        domainConsents.map((domainConsent, i) => (
                            <View key={`domain-consents${i}`} style={styles.AboutUsCard} >
                                <View
                                    collapsable={false}
                                    style={styles.sectionHeader}

                                >
                                    <Left style={{ flexDirection: 'row', padding: 10, flex: 2, textAlign: 'left' }}>
                                        <Text style={styles.sectionTitle}>{domainConsent.domain}</Text>
                                    </Left>

                                </View>
                                <View style={styles.Container} >
                                    <View style={styles.SkillsDetails} >
                                        {domainConsent && domainConsent.consents != null
                                            ?
                                            <View style={{ width: "100%" }}>
                                                <View style={{ flex: 1, flexDirection: 'row' }} >
                                                    <Left>
                                                        <Text style={styles.Title}>{I18n.t('profile-consentHeading')}</Text>
                                                    </Left>
                                                    <Right>
                                                        <View>
                                                            <TouchableOpacity onPress={() => this.manage("Preferences", domainConsent, domainConsent.domain)} ><Text style={_styles.mActionText}>{I18n.t('profile-manage')}</Text></TouchableOpacity>
                                                        </View>
                                                    </Right>
                                                </View>
                                                <Dividers type='Simple' />
                                                <View style={{
                                                    flex: 1, flexDirection: 'row',
                                                    flexWrap: 'wrap'
                                                }}>


                                                    {domainConsent.consents.map((consent, i) => (
                                                        consent.value !== false ?
                                                            Platform.OS == 'ios' ?
                                                                < Badge style={styles.badgeStyleIos} key={i}>

                                                                    <Text style={[_styles.BadgesContent, { paddingVertical: 3, paddingHorizontal: 7 }]}>
                                                                        {typeof consent.value !== "undefined" && consent.value !== false ?
                                                                            consent.name
                                                                            : null}
                                                                    </Text>
                                                                </ Badge> : < Badge style={styles.badgeStyle} key={`key${i}`}>

                                                                    <Text style={[_styles.BadgesContent, { paddingVertical: 3, paddingHorizontal: 7 }]}>
                                                                        {typeof consent.value !== "undefined" && consent.value !== false ?
                                                                            consent.name
                                                                            : null}
                                                                    </Text>
                                                                </ Badge>
                                                            : null

                                                    ))}
                                                </View>
                                            </View> : null}
                                    </View>
                                    {
                                        getDomainSimilarSegments(this.props.similarSegments, domainConsent.domain) ?
                                            <View style={{ width: "100%", marginTop: 20 }}>
                                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                                    <Left>
                                                        <Text style={styles.Title}>{I18n.t('profile-interestHeading')}</Text>
                                                    </Left>
                                                    <Right>
                                                        <View>
                                                            <TouchableOpacity onPress={() => this.manage("Interest", getDomainSegments(segmentData, domainConsent.domain), domainConsent.domain)} ><Text style={_styles.mActionText}>{I18n.t('profile-manage')}</Text></TouchableOpacity>
                                                        </View>
                                                    </Right>
                                                </View>
                                                <Dividers type='Simple' />
                                                <View style={{ flex: 1, flexDirection: 'row',flexWrap: 'wrap' }}>
                                                    {segmentData && segmentData != null
                                                        ?
                                                        getDomainSegments(segmentData, domainConsent.domain) ? getDomainSegments(segmentData, domainConsent.domain).map((segment, i) => {
                                                            return (
                                                                Platform.OS == 'ios' ?
                                                                    < Badge style={styles.badgeStyleIos} key={i}>

                                                                        <Text style={[_styles.BadgesContent, { paddingVertical: 3, paddingHorizontal: 7 }]}>
                                                                            {segment.name}
                                                                        </Text>
                                                                    </ Badge> : < Badge style={styles.badgeStyle} key={`key${i}`}>

                                                                        <Text style={[_styles.BadgesContent, { paddingVertical: 3, paddingHorizontal: 7 }]}>
                                                                            {segment.name}
                                                                        </Text>
                                                                    </ Badge>
                                                                
                                                            )
                                                        }) : <Text style={styles.JobPrefDes}>No interests for given domain</Text> : null
                                                    }
                                                </View>
                                            </View> : null
                                    }
                                </View>

                            </View>)) : null}
                </ScrollView>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    badgeStyleIos: {
        backgroundColor: appConfig.infoColor,
        margin: 3,
        flexDirection: 'row'
    },
    badgeStyle: {
        backgroundColor: appConfig.infoColor,
        margin: 3,

    },

    toastGreen: {
        height: 60,
        backgroundColor: "#1eb256",
        fontFamily:'Poppins-Medium',
        width: '100%',
        shadowColor: "rgba(72, 87, 100, 0.18)",
        justifyContent: "center",
        alignItems: "center",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 2,
        shadowOpacity: 1
    },
    // comman css for page
    button: {
        width: 298,
        height: 44,
        borderRadius: 40,
        backgroundColor: "#6fe5d1",
        alignSelf: 'center',
        textAlign: 'center',
        marginTop: '30%'

    }, logo: {
        width: 68,
        height: 30,
    },
    RoleRectangle: {
        width: 80, height: 70, borderRadius: 6, borderColor: '#000000', paddingTop: 10,
        borderWidth: 1, margin: 8, justifyContent: "center", alignItems: "center"
    },
    iconContainer: {
        width: 60,
        height: 60,
        alignItems: 'flex-end'
    },
    calendar: {
        width: 26,
        height: 29,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 16,
        paddingRight: 16,
    },
    Title: {
        fontFamily: appConfig.fontFamily,
        fontSize: 16,
        letterSpacing: 0.09,
        color: "#000000",

    },
    TitleDescp: {
        marginBottom: 5,
        marginTop: 4,
        fontFamily: 'Poppins-Light',
        fontSize: 15,
        lineHeight: 21,
        width: 230,
        color: "#000000"
    },
    TitleDes: {
        marginBottom: 16,
        marginTop: 14,
        fontFamily: 'Poppins-Light',
        fontSize: 15,
        lineHeight: 21,
        width: 230,
        color: "#000000"
    },
    cardHeader: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'flex-start',
        maxHeight: 61,
        backgroundColor: appConfig.headerColor

    },

    sectionHeader: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'flex-start',
        maxHeight: 30,
        marginTop: 10,
        borderBottomColor: appConfig.primaryColor,
        borderBottomWidth: 1,
        marginRight:10,
        marginLeft:10

    },
    sectionTitle: {
        fontFamily: 'Poppins-Medium',
        fontSize: 16,
        color:appConfig.primaryColor,
        letterSpacing: 0.09,
    },
    Divider: {
        borderTopColor: '#EBEBEB',
        padding: 0,
        borderTopWidth: 2,
        width: '92%',
        alignSelf: 'center',
        margin: 0
    },
    RequiredSkillsDivider: {
        borderTopColor: '#EBEBEB',
        borderTopWidth: 2,
        width: '30%',
        alignSelf: 'center',
        margin: 10

    },
    //profile strength card
    ProfileStrengthcard: {
        marginTop: 18,
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        height: 120,
        padding: 18,
        zIndex: 1
    },
    //Invisiblecard
    InvisibleCard: {
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 16,
        paddingRight: 16,
        marginTop: 30,
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        height: 185,
        padding: 18,
        borderLeftWidth: 4,
        borderRightWidth: 0,
        borderBottomWidth: 0,
        borderTopWidth: 0,
        borderColor: "#ff665e",

    },
    InvisibaleImage: {
        alignSelf: 'center',
        height: 100,
        width: 100,

    },
    mActionText: {
        color: '#ff665e',
        fontSize: 14,
        textAlign: "right",
        paddingRight: 0,
        fontFamily: 'Poppins-Bold',
        letterSpacing: 0.2,
        alignSelf: 'center',
        // marginBottom:8,

    },
    ProgressBar: {
        height: 84,
        width: 84,
    },
    ProgressBarTxt: {
        fontSize: 18,
        fontFamily: appConfig.fontFamily,
        textAlign: 'center', color: '#000000'
    },
    //about us
    AboutUsCard: {
        // marginTop: 8,
        flex: 1,
        flexDirection: 'column',
        height: 'auto',
    },
    AboutUsDetails: {
        marginLeft: 18,
        marginTop: 16,
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'flex-start',
        borderBottomColor: 'black',
        paddingBottom:20
    },
    UploadVideoVitaContainer: {
        height: 250,
        backgroundColor: '#FAFAF9',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 0
    },
    ProfileImage: {
        borderRadius: 150 / 2,
        height: 150,
        width: 150,
    },
    uplaodImage: {
        height: 50,
        width: 50,
    },
    uploadImageText: {
        flex: 1,
        flexDirection: 'row',
        color: 'black',
        fontSize: 16,
        textAlign: "center",
        marginTop: 12,
        maxHeight: 60,
        letterSpacing: 0.05,
        lineHeight: 20,
        flexWrap: 'wrap',
        fontFamily: appConfig.fontFamily,
    },
    CandidateName: {
        color: '#000000',
        fontFamily: appConfig.fontFamily,
        fontSize: 19,
        width: 234,
    },
    CandidateRole: {
        paddingTop:5,
        fontFamily: 'Poppins-Light',
        fontSize: 15,
        lineHeight: 21,

    },
    CandiadteDayRate: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        textAlign: 'right',
        alignSelf: 'flex-end',
        color: '#000000',
        fontSize: 14,
        paddingRight: 15,
        fontFamily: 'Poppins-Medium',
        letterSpacing: 0

    },
    dealImage: {
        height: 12,
        width: 13,

        alignSelf: 'center'
    },
    CandidateDetailsTxt: {
        flex: 1,
        flexWrap: 'wrap',
        color: '#000000',
        fontFamily: appConfig.fontFamily,
        fontSize: 14,
    },
    iconimg: {
        margin: 4,
        height: 14,
        width: 14
    },
    //characterTest card 
    characterTestCard: {
        marginTop: 16,
        flex: 1,
        flexDirection: 'column',
    },
    characterTestCardWarning: {
        marginTop: 16,
        flex: 1,
        flexDirection: 'column',
        flexWrap: 'wrap',
        height: 'auto',
        borderLeftWidth: 4,
        borderRightWidth: 0,
        borderBottomWidth: 0,
        borderTopWidth: 0,
        borderColor: "#ff665e",
    },
    characterTestContainer: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    characterTestImage: {
        maxWidth: 274,
        maxHeight: 275
    },
    required: {
        fontFamily: 'Poppins-Light',
        fontSize: 14,
        lineHeight: 20,
        letterSpacing: 0.05,
        color: '#000000',
        paddingTop: 2,
    },
    // Achievements
    AchievementsCard: {
        padding: 16,
        flex: 1,
        flexDirection: 'column',


    },
    AchievementsContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginBottom: 10
    },
    AchievementsDetails: {
        flex: 1,
        width: '100%'

    },
    AchievementsCompanyName: {
        marginTop: 5,
        fontSize: 16,
        lineHeight: 25,
        color: '#000000',
        fontFamily: appConfig.fontFamily,
        marginBottom: 13
    },
    AchievementsDes: {
        color: '#000000',
        fontFamily: 'Poppins-Light',
        fontSize: 15,
        lineHeight: 21,
        letterSpacing: 0,
        marginBottom: 6

    },
    //Job preferences
    JobprefCard: {
        // marginTop:16,
        padding: 16,
        flex: 1,
        flexDirection: 'column',
        height: 'auto',
    },
    JobprefCardWarning: {
        padding: 16,
        flex: 1,
        flexDirection: 'column',
        flexWrap: 'wrap',
        height: 'auto',
        borderLeftWidth: 4,
        borderRightWidth: 0,
        borderBottomWidth: 0,
        borderTopWidth: 0,
        borderColor: "#ff665e",
    },
    JobprefContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        // marginBottom:10,
    },
    JobprefDetails: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',

    },
    JobPrefDes: {
        color: '#000000',
        fontFamily: 'Poppins-Light',
        fontSize: 15,
        lineHeight: 21,
        letterSpacing: 0,
        marginBottom: 6

    },
    prefList: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    JobprefDetailsContent: {
        // marginTop:4,
        flex: 1,
        flexDirection: 'row',
        fontSize: 14,
        color: '#000000',
        fontFamily: appConfig.fontFamily,
        textAlign: 'center',
        textAlignVertical: 'center',
        flexWrap: 'nowrap'
    },
    // Skills
    SkillsCard: {
        padding: 18,
        flex: 1,
        flexDirection: 'column',
    },
    WarningSkillCard: {
        flex: 1,
        flexDirection: 'column',
        height: 'auto',
        borderLeftWidth: 4,
        borderColor: '#ff665e',
        marginLeft: -18,
        paddingLeft: 14,
    },
    SkillList: {
        flex: 1,
        flexDirection: 'column',
        height: 'auto',

    },
    SubTitle: {

        flex: 1,
        flexDirection: 'row',
        color: '#000000',
        fontFamily: appConfig.fontFamily,
        fontSize: 16,
        height: 25,
        lineHeight: 25,

    },
    CompanyTitle: {
        color: '#000000',
        fontFamily: appConfig.fontFamily,
        fontSize: 16,
        height: 25,
        lineHeight: 20,
        marginTop: 12,
        alignSelf: 'flex-start'
    },
    CompanyContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    Container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 15,
        marginBottom: 10,
    },
    container: {
        marginTop: 1,
        marginBottom: 0,
        flex: 1,
        backgroundColor: '#fbfbfb'
    },
    SkillsDetails: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        // marginBottom:35
    },
    // Companies worked at
    CompaniesHeader: {
        flex: 1,
        flexDirection: 'column',
        flexWrap: 'wrap',
        height: 'auto',
        padding: 18
    },
    companiesCard: {
        padding: 18,
        flex: 1,
        flexDirection: 'column',
        height: 'auto'
    },
    //Referenceslist
    TestimonialsDes: {
        color: '#000000',
        fontFamily: 'CeraPro-Light',
        fontSize: 15,
        lineHeight: 21,
        letterSpacing: 0,
        marginBottom: 6

    },
    Referenceslist: {
        flex: 1,
        paddingTop: 16,
        flexDirection: 'column',
        flexWrap: 'wrap',
        height: 'auto',
        padding: 18
    },
    testimonialComplete: {
        flex: 1,
        paddingTop: 16,
        flexDirection: 'column',
        flexWrap: 'wrap',
        height: 'auto',
        padding: 18,
        borderLeftWidth: 4,
        borderRightWidth: 0,
        borderBottomWidth: 0,
        borderTopWidth: 0,
        borderColor: "#ff665e",

    },
    testimonialRequested: {
        flex: 1,
        paddingTop: 16,
        flexDirection: 'column',
        flexWrap: 'wrap',
        height: 'auto',
        padding: 18,
        borderLeftWidth: 4,
        borderRightWidth: 0,
        borderBottomWidth: 0,
        borderTopWidth: 0,
        borderColor: "#72e5d2",

    },
    testimonialExpired: {
        flex: 1,
        paddingTop: 16,
        flexDirection: 'column',
        flexWrap: 'wrap',
        height: 'auto',
        padding: 18,
        borderLeftWidth: 4,
        borderRightWidth: 0,
        borderBottomWidth: 0,
        borderTopWidth: 0,
        borderColor: "#999999",

    },

    DownloadText: {
        color: '#000000',
        fontSize: 14,
        lineHeight: 28,
        marginRight: 16,
        fontFamily: 'Poppins-Bold',
        letterSpacing: 0.2,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    refrenceRateTxt: {
        flex: 1,
        color: '#000000',
        fontSize: 14,
        marginRight: 16,
        fontFamily: 'Poppins-Medium',
        letterSpacing: 0.2,
        textAlign: 'left'
    },
    ModalLinkText: {
        color: '#CCCCCC',
        fontSize: 14,
        marginRight: 16,
        fontFamily: 'Poppins-Bold',
        letterSpacing: 0.2,
        textAlign: 'center'
    },

    aboutTheTest: {
        fontFamily: appConfig.fontFamily,
        fontSize: 28,
        letterSpacing: 0.09,
        color: "#000000",
        textAlign: "left",
        padding: 20
    },

    aboutTheTestContainer: {
        padding: 20,
        marginBottom: 0
    },
    aboutTheTestContent: {
        fontFamily: appConfig.fontFamily,
        fontSize: 16,
        letterSpacing: 0.09,
        color: "#000000",
        textAlign: "left",
    },
    aboutTheTestContentBold: {
        fontFamily: 'Poppins-Bold',
        fontSize: 17,
        letterSpacing: 0.09,
        color: "#000000",


    },
    aboutTestButton: {
        textAlign: 'center',
        fontFamily: appConfig.fontFamily,
        marginTop: 12,
        color: '#ff665e',
        fontSize: 17,
    },
    backgroundImage: {
        height: 165,
        width: 165,
        justifyContent: "center",
        alignItems: "center"
    },

});

const mapStateToProps = ({ profile, dashboard }) => {
    return { ...profile, ...dashboard }
}
export default connect(mapStateToProps, {
    getProfile, getUserConsents, getGlobalSegment

})(ProfileMainScreen);

