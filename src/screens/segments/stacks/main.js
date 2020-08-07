import React, { Component } from "react"
import { connect } from "react-redux";
import { getSegment } from "../../../actions/index"
import I18n from "react-native-i18n";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Settings } from "react-native"
import {
    Container, Card, Body, Left, CardItem, Thumbnail,
    Right, Badge,
} from 'native-base';
import { Divider } from 'react-native-elements';
import { _styles } from "../../../util/helpers/styles";
import { appConfig } from "../../../settings/settings";


class SegmentsMainScreen extends Component {
    componentDidMount = () => {
        this.props.getSegment()
        this.onFocus = this.props.navigation.addListener("focus", () => {
            this.props.getSegment()
        })
    }
    componentWillUnmount = () => {
        this.props.navigation.removeListener("focus", () => {
            this.props.getSegment()
        })
    }
    render() {
        const { plotdata } = this.props
        return (
            <>
                <Container>

                    <ScrollView>
                        {/* AboutYouCard */}
                        <Card style={styles.AboutUsCard} >
                            {
                                plotdata.children.map((domain) => {
                                    return (
                                        <View key={domain.id}>
                                            <View
                                                collapsable={false}
                                                style={styles.cardHeader}>
                                                <Left style={{ padding: 16 }}>
                                                    <Text style={styles.Title}>{domain.name}</Text>

                                                </Left>
                                                <Right style={{ padding: 16 }}>

                                                    <View>
                                                        <TouchableOpacity onPress={this.goToLanguages} ><Text style={_styles.mActionText}>Edit</Text></TouchableOpacity>
                                                    </View>
                                                </Right>
                                            </View>

                                            <View style={styles.AboutUsDetails}>
                                                <Left style={{ flex: 1.75 }}>
                                                    <View>
                                                        <Badge style={{ backgroundColor: appConfig.primaryColor }} info>
                                                            <Text style={styles.CandidateName}>seg</Text>
                                                        </Badge>
                                                    </View>

                                                </Left>

                                            </View>
                                            <Divider></Divider>
                                        </View>
                                    )
                                })

                            }
                        </Card>

                    </ScrollView>
                </Container>
            </>
        )
    }
}

const styles = StyleSheet.create({
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
    CandidateName: {
        color: '#ffff',
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
    AboutUsDetails: {
        marginLeft: 18,
        marginTop: -4,
        marginBottom: 15,
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'flex-start',
        maxHeight: 41,
        borderBottomColor: 'black'
    },
})
const mapStateTopProps = ({ dashboard }) => {
    return { ...dashboard }
}

export default connect(mapStateTopProps, {
    getSegment
})(SegmentsMainScreen);