import { css } from 'styled-components';

import IndustryLight from 'assets/fonts/Industry-Light.ttf';
import IndustryLightItalic from 'assets/fonts/Industry-LightItalic.ttf';
import IndustryBook from 'assets/fonts/Industry-Book.ttf';
import IndustryBookItalic from 'assets/fonts/Industry-BookItalic.ttf';
import IndustryMedium from 'assets/fonts/Industry-Medium.ttf';
import IndustryMediumItalic from 'assets/fonts/Industry-MediumItalic.ttf';
import IndustryDemi from 'assets/fonts/Industry-Demi.ttf';
import IndustryDemiItalic from 'assets/fonts/Industry-DemiItalic.ttf';
import IndustryBold from 'assets/fonts/Industry-Bold.ttf';
import IndustryBoldItalic from 'assets/fonts/Industry-BoldItalic.ttf';
import IndustryBlack from 'assets/fonts/Industry-Black.ttf';
import IndustryBlackItalic from 'assets/fonts/Industry-BlackItalic.ttf';

import RobotoThin from 'assets/fonts/Roboto-Thin.ttf';
import RobotoThinItalic from 'assets/fonts/Roboto-ThinItalic.ttf';
import RobotoLight from 'assets/fonts/Roboto-Light.ttf';
import RobotoLightItalic from 'assets/fonts/Roboto-LightItalic.ttf';
import RobotoRegular from 'assets/fonts/Roboto-Regular.ttf';
// import RobotoRegularItalic from 'assets/fonts/Roboto-RegularItalic.ttf';
import RobotoMedium from 'assets/fonts/Roboto-Medium.ttf';
import RobotoMediumItalic from 'assets/fonts/Roboto-MediumItalic.ttf';
import RobotoBold from 'assets/fonts/Roboto-Bold.ttf';
import RobotoBoldItalic from 'assets/fonts/Roboto-BoldItalic.ttf';
import RobotoBlack from 'assets/fonts/Roboto-Black.ttf';
import RobotoBlackItalic from 'assets/fonts/Roboto-BlackItalic.ttf';

import FuturaSingle from 'assets/fonts/Futura.ttf';

import BigNoodleRegular from 'assets/fonts/BigNoodle.ttf';
import BigNoodleItalic from 'assets/fonts/BigNoodleItalic.ttf';

import OW2Bold from 'assets/fonts/OW2.ttf';

export const Industry = css`
  @font-face {
    font-family: 'Industry';
    src: url(${IndustryLight});
    font-weight: 200;
    font-style: normal;
  }
  @font-face {
    font-family: 'Industry';
    src: url(${IndustryLightItalic});
    font-weight: 200;
    font-style: italic;
  }
  @font-face {
    font-family: 'Industry';
    src: url(${IndustryBook});
    font-weight: 300;
    font-style: normal;
  }
  @font-face {
    font-family: 'Industry';
    src: url(${IndustryBookItalic});
    font-weight: 300;
    font-style: italic;
  }
  @font-face {
    font-family: 'Industry';
    src: url(${IndustryMedium});
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'Industry';
    src: url(${IndustryMediumItalic});
    font-weight: normal;
    font-style: italic;
  }
  @font-face {
    font-family: 'Industry';
    src: url(${IndustryDemi});
    font-weight: 500;
    font-style: normal;
  }
  @font-face {
    font-family: 'Industry';
    src: url(${IndustryDemiItalic});
    font-weight: 500;
    font-style: italic;
  }
  @font-face {
    font-family: 'Industry';
    src: url(${IndustryBold});
    font-weight: bold;
    font-style: normal;
  }
  @font-face {
    font-family: 'Industry';
    src: url(${IndustryBoldItalic});
    font-weight: bold;
    font-style: italic;
  }
  @font-face {
    font-family: 'Industry';
    src: url(${IndustryBlack});
    font-weight: 700;
    font-style: normal;
  }
  @font-face {
    font-family: 'Industry';
    src: url(${IndustryBlackItalic});
    font-weight: 700;
    font-style: italic;
  }
`;

export const Roboto = css`
  @font-face {
    font-family: 'Roboto';
    src: url(${RobotoThin});
    font-weight: 200;
    font-style: normal;
  }
  @font-face {
    font-family: 'Roboto';
    src: url(${RobotoThinItalic});
    font-weight: 200;
    font-style: italic;
  }
  @font-face {
    font-family: 'Roboto';
    src: url(${RobotoLight});
    font-weight: 300;
    font-style: normal;
  }
  @font-face {
    font-family: 'Roboto';
    src: url(${RobotoLightItalic});
    font-weight: 300;
    font-style: italic;
  }
  @font-face {
    font-family: 'Roboto';
    src: url(${RobotoRegular});
    font-weight: normal;
    font-style: normal;
  }

  //regular italic here

  @font-face {
    font-family: 'Roboto';
    src: url(${RobotoMedium});
    font-weight: 500;
    font-style: normal;
  }
  @font-face {
    font-family: 'Roboto';
    src: url(${RobotoMediumItalic});
    font-weight: 500;
    font-style: italic;
  }
  @font-face {
    font-family: 'Roboto';
    src: url(${RobotoBold});
    font-weight: bold;
    font-style: normal;
  }
  @font-face {
    font-family: 'Roboto';
    src: url(${RobotoBoldItalic});
    font-weight: bold;
    font-style: italic;
  }
  @font-face {
    font-family: 'Roboto';
    src: url(${RobotoBlack});
    font-weight: 700;
    font-style: normal;
  }
  @font-face {
    font-family: 'Roboto';
    src: url(${RobotoBlackItalic});
    font-weight: 700;
    font-style: italic;
  }
`;

export const Futura = css`
  @font-face {
    font-family: 'Futura';
    src: url(${FuturaSingle});
  }
`;

export const BigNoodle = css`
  @font-face {
    font-family: 'BigNoodle';
    src: url(${BigNoodleRegular});
  }
  @font-face {
    font-family: 'BigNoodle';
    src: url(${BigNoodleItalic});
    font-style: italic;
  }
`;

export const OW2 = css`
  @font-face {
    font-family: 'OW2';
    src: url(${OW2Bold});
  }
`;
