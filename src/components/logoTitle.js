import React from 'react';
import {Image} from "react-native"
import {appConfig} from "../settings/settings"
import { Left } from 'native-base';

function LogoTitle() {
    return (
      <Image
        style={{ width:45,height: 45,marginLeft:-190}}
        source={{
            uri:appConfig.headerLogoUrl
        }}
      />
    );
  }

  export default LogoTitle