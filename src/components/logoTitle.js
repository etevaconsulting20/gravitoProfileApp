import React from 'react';
import {Image} from "react-native"
import {appConfig} from "../settings/settings"

function LogoTitle() {
    return (
      <Image
      style={{ width:48, height: 48 }}
        source={{
            uri:appConfig.headerLogoUrl
        }}
      />
    );
  }

  export default LogoTitle