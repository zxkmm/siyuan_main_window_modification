//TODO：namingspace is needed or not??

enum SiyuanColor {
  siyuan_highlight = "var(--b3-theme-background-light)",
  siyuan_background = "var(--b3-theme-background)",
  siyuan_surface = "var(--b3-theme-surface)",
}

export function applyStyles(css) {
  const head = document.head || document.getElementsByTagName("head")[0];
  const style = document.createElement("style");
  head.appendChild(style);
  style.appendChild(document.createTextNode(css));
}

export function addBodyBorder(
  _upBorderWidth_,
  _downBorderWidth_,
  _leftBorderWidth_,
  _rightBorderWidth_,
  _color_
) {
  var css = 
`body {
    border-top-width: ${_upBorderWidth_}px;
    border-bottom-width: ${_downBorderWidth_}px;
    border-left-width: ${_leftBorderWidth_}px;
    border-right-width: ${_rightBorderWidth_}px;
    border-style: solid;`;

  switch (_color_) {
    case "1":
      css += `  border-color: ${SiyuanColor.siyuan_highlight};`;
      break;
    case "2":
      css += `  border-color: ${SiyuanColor.siyuan_background};`;
      break;
    case "3":
      css += `  border-color: ${SiyuanColor.siyuan_surface};`;
      break;
    default:
      break;
  }

  css += `}`;

  console.log(css);

  applyStyles(css);
}

/*
in full screen mode, after moved the windows ctl btn to the left side, 
need to padding the toolbar buttons to prevent they overlapped with each other
*/
export function leftOffsetWindowControlBtns() {
  const _css_ = 
`
body.body--win32 .fullscreen > .protyle-breadcrumb,
body.body--win32 .fullscreen > .block__icons {
    padding-left: 120px;
    padding-right: 10px;
}
`;
  applyStyles(_css_);
}

export function adjustWindowControlBtnsLayout(
  _pos_,
  _layout_,
  _enabledSystem_
) {
  //sys: 1: win 2: linux 3: win and linux

  const opration_system = navigator.platform.toLocaleLowerCase();

  if (
    (_enabledSystem_.includes("1") && opration_system.includes("win")) ||
    (_enabledSystem_.includes("2") && opration_system.includes("linux")) ||
    (_enabledSystem_.includes("3") &&
      (opration_system.includes("win") || opration_system.includes("linux")))
  ) {
    if (_pos_ == 2) {
      windowControls.style.order = "-1";
      leftOffsetWindowControlBtns();
    }

    if (_layout_ == 2) {
      closeWindow.style.order = "-1";
      minWindow.style.order = "1";
      maxWindow.style.order = "0";
    } else if (_layout_ == 3) {
      closeWindow.style.order = "-1";
      minWindow.style.order = "0";
      maxWindow.style.order = "1";
    }
  }
}

export function adjustToolbarPadding(
  _upPadding_,
  _downPadding_,
  _leftPadding_,
  _rightPadding_
) {
  const css = 
`#toolbar.toolbar {
    
    --toolbar-padding-top: ${_upPadding_}px;
    --toolbar-padding-right: ${_rightPadding_}px;
    --toolbar-padding-bottom: ${_downPadding_}px;
    --toolbar-padding-left: ${_leftPadding_}px;
    
    padding: var(--toolbar-padding-top)
             var(--toolbar-padding-right)
             var(--toolbar-padding-bottom)
             var(--toolbar-padding-left);
  }
  
`;

  console.log(css);

  applyStyles(css);
}
