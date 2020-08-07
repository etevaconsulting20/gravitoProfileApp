
import * as _ from 'lodash';



import {
    GET_SEGMENTS,
    GET_SEGMENTS_SUCCESS,
    GET_SEGMENTS_FALIURE,
    SAVE_SEGMENTS,
    SAVE_SEGMENTS_SUCCESS,
    SAVE_SEGMENTS_FALIURE,
    GET_GLOBAL_SEGMENTS,
    GET_GLOBAL_SEGMENTS_SUCCESS,
    GET_GLOBAL_SEGMENTS_FALIURE,

} from '../actions/types'

// initial state 
const INIT_STATE = {
    profileSegments: [


    ],
    similarSegments: [],
    attribute: '',
    loading: false,
    plotdata: null,
    filteredSimilarSegments: [],
    newStructure: [],
    domains: [],
    segmentsSelected: []

}
import { NotifyUser } from "../util/helpers/helpers"
import I18n from "react-native-i18n";
import { act } from 'react-test-renderer';



export default (state = INIT_STATE, action) => {

    switch (action.type) {
        case GET_SEGMENTS:
            return { ...state, loading: true }
        case GET_SEGMENTS_SUCCESS:
           
            if (action.payload.data.segmentDataSet) {
                // check if the global segments are already loaded.
                if (state.similarSegments.length > 0) {
                    action.payload.data.segmentDataSet.forEach(element => {
                        _.remove(state.similarSegments, { id: element.id });
                    });
                }
                var profilesegment = action.payload.data.segmentDataSet
                var unique = _.uniq(_.map(profilesegment, _.property('domain')))

                var newStructure = unique.map((domain, index) => {
                    return (
                        _.filter(profilesegment, { 'domain': domain })

                    )
                })
                var plotdata = {
                    "name": " GRAVITO ",
                    "children": [

                    ]
                }
                newStructure.map((domain, index) => {
                    let domainleaf = {
                        "name": unique[index],
                        "children": [],
                    }
                    domain.map((segment, i) => {
                        let newSegement = {
                            "name": segment.name,
                            "size": 3812,
                            "children": []
                        }
                        domainleaf.children.push(newSegement)
                    })
                    plotdata.children.push(domainleaf)


                })

                return { ...state, loading: false, profileSegments: action.payload.data.segmentDataSet, plotdata: plotdata, filteredSimilarSegments: [] };
            } else {
                return { ...state, loading: false, profileSegments: [] };
            }
        case GET_SEGMENTS_FALIURE:
            NotifyUser.error(I18n.t("notification.networkerror"))
            return { ...state, loading: false };

        case GET_GLOBAL_SEGMENTS:

            return { ...state, loading: true }
        case GET_GLOBAL_SEGMENTS_SUCCESS:
            if (action.payload.data) {

                var globalsegment = action.payload.data
                var unique = _.uniq(_.map(globalsegment, _.property('domain')))

                var newStructure = unique.map((domain, index) => {
                    return (
                        {
                            domain: domain,
                            segments: _.filter(globalsegment, { 'domain': domain })
                        }

                    )
                })


                return { ...state, loading: false, similarSegments: newStructure };
            } else {
                return { ...state, loading: false, similarSegments: [] };
            }
        case GET_GLOBAL_SEGMENTS_FALIURE:

            return { ...state, loading: false };



        case SAVE_SEGMENTS:

            debugger
            let profileSegments = [...state.profileSegments]
            //pull out the data from profileSegments
            _.remove(profileSegments, (seg, index) => {
                return seg.domain === action.payload.domainName;
            })
            let newSegmentsForDomain = action.payload.data.map((domainSeg, index) => {
                return domainSeg
            })

            return {
                ...state, loading: true,
                profileSegments: [...profileSegments, ...newSegmentsForDomain]
            };
        case SAVE_SEGMENTS_SUCCESS:

            return { ...state, loading: false };
        case SAVE_SEGMENTS_FALIURE:

            return { ...state, loading: false };
        default:
            return { ...state };
    }
}


