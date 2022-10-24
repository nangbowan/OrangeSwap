import React from "react";
import { useTranslation } from "@pancakeswap/localization";
import Text from "../Text/Text";
import Dropdown from "../Dropdown/Dropdown";
import Button from "../Button/Button";
import LanguageIcon from "../Svg/Icons/Language";
import MenuButton from "./MenuButton";
import { Colors } from "../../theme";
import { Language } from "./types";
import { Position } from "../Dropdown/types";
import { Scale } from "../Button/types";

interface Props {
  currentLang: string;
  langs: Language[];
  setLang: (lang: Language) => void;
  color: keyof Colors;
  dropdownPosition?: Position;
  buttonScale?: Scale;
  hideLanguage?: boolean;
  isHeader?: boolean;
}

const LangSelector: React.FC<React.PropsWithChildren<Props>> = ({
  currentLang,
  langs,
  color,
  setLang,
  dropdownPosition = "bottom",
  buttonScale = "md",
  hideLanguage = false,
  isHeader = false,
}) => {
  const { t } = useTranslation();
  return (
    <Dropdown
      position={dropdownPosition}
      target={
        isHeader ? (
          <Button scale={buttonScale} variant="text" startIcon={<LanguageIcon color={color} width="24px" />}>
            {!hideLanguage && <Text color={color}>{currentLang?.toUpperCase()}</Text>}
          </Button>
        ) : (
          <Button className="lange_btn" scale={buttonScale} variant="text">
            {/* {!hideLanguage && <Text color={color}>{currentLang?.toUpperCase()}</Text>} */}
            <Text className="lange_text" color={"#fff"} fontSize="24px">
              {t('lange')}
            </Text>
          </Button>
        )
      }
    >
      {langs.map((lang) => (
        <MenuButton
          key={lang.locale}
          fullWidth
          onClick={() => setLang(lang)}
          // Safari fix
          style={{ minHeight: "32px", height: "auto" }}
        >
          {lang.language}
        </MenuButton>
      ))}
    </Dropdown>
  );
};

export default React.memo(LangSelector, (prev, next) => prev.currentLang === next.currentLang);
