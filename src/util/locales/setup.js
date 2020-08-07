import I18n from "react-native-i18n";
import en from "../locales/en";
import fi from "../locales/fi"



I18n.fallbacks=true;

I18n.translations={
 en:en,
 fi:fi
}

I18n.locale="en"

export default I18n;