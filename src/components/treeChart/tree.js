import React, { Component,useRef,PureComponent } from "react"
import { View, Text } from "react-native"
import { WebView } from "react-native-webview"
import getContent from "./htmlContent"
import LoadingIndicator from "../loadingIndicator"
import { appConfig } from "../../settings/settings"

class Tree extends PureComponent{
    state={
        loading:false
    }
    componentDidUpdate=()=>{
        
        this.webView.reload()
    }
    render(){
      
        return (
        <>
            <WebView
            key="webview"
            ref={webView => this.webView = webView}
            style={{backgroundColor:"transparent"}}
            nativeConfig={{props: {webContentsDebuggingEnabled: true}}}
            originWhitelist={['*']}
            scalesPageToFit={true}
            javaScriptEnabled={true}
            source={{ html: getContent(),baseUrl:"file:///android_asset/" }}
            // onLoadStart={()=>this.setState({loading:true})}
            onLoad={() => {
                // setTimeout(()=>{
                //     this.setState({loading:false})
                // },500)
                let messageObject={
                    type:"treeData",
                    data:this.props.treeData
                }
                const configEvent = `window.postMessage(${JSON.stringify(messageObject)}, "*");
                true;`
                this.webView.injectJavaScript(configEvent);
        
            }}
          />
          <LoadingIndicator isVissible={this.state.loading} color={appConfig.primaryColor} message="Loading.."/>
        </>
        )
    }
}

export default Tree