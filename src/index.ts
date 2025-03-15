declare global {
  var windowControls: any;
  var closeWindow: any;
  var minWindow: any;
  var maxWindow: any;
}

import { Plugin, showMessage, getFrontend } from "siyuan";
import "@/index.scss";

import { SettingUtils } from "./libs/setting-utils";

import { convertStringToArray } from "./helpers";

import {
  addBodyBorder,
  adjustToolbarPadding,
  adjustWindowControlBtnsLayout,
} from "./css_injection";



const STORAGE_NAME = "menu-config";

const frontEnd = getFrontend();

// TODO: use User-Agent Client Hints API to get platform

// if (navigator.userAgentData) {
//     navigator.userAgentData.getHighEntropyValues(["platform"])
//         .then(platform => {
//             console.log(platform);
//         })
//         .catch(error => {
//             console.error(error);
//         });
// } else {
//     console.log('User-Agent Client Hints API not supported.');
// }


const commonMenuNode = document.getElementById("commonMenu"); //it's the menu's id



export default class SiyuanMainWindowModification extends Plugin {
  private settingUtils: SettingUtils;












  reloadInterface() {
    // window.location.reload();
    showMessage(this.i18n.reload_hint);
  }

  async onload() {
    this.settingUtils = new SettingUtils(this, STORAGE_NAME);
    this.settingUtils.load();

    this.settingUtils.addItem({
      key: "begging",
      value: "",
      type: "hint",
      title: this.i18n.beggingTitle,
      description: this.i18n.beggingDesc,
    });

    this.settingUtils.addItem({
      key: "totalSwitch",
      value: true,
      type: "checkbox",
      title: this.i18n.totalSwitch,
      description: this.i18n.totalSwitchDesc,
    });

    this.settingUtils.addItem({
      key: "enableWindowControlBtnsReload",
      value: false,
      type: "checkbox",
      title: this.i18n.enableWindowControlBtnsReload,
      description: this.i18n.enableWindowControlBtnsReloadDesc,
    });
    this.settingUtils.addItem({
      key: "windowControlBtnPosition",
      value: 1,
      type: "select",
      title: this.i18n.windowControlBtnPosition,
      description: this.i18n.windowControlBtnPositionDesc,
      options: {
        1: "↗️",
        2: "↖️",
      },
    });
    this.settingUtils.addItem({
      key: "windowControlBtnsLayout",
      value: 1,
      type: "select",
      title: this.i18n.windowControlBtnsLayout,
      description: this.i18n.windowControlBtnsLayoutDesc,
      options: {
        1: "➖🔲❌️ (Windows and KDE Style)",
        2: "❌🔲➖",
        3: "❌➖🔲 (Mac Style)",
      },
    });
    this.settingUtils.addItem({
      key: "windowControlBtnApplyOs",
      value: 1,
      type: "select",
      title: this.i18n.windowControlBtnApplyOs,
      description: this.i18n.windowControlBtnApplyOsDesc,
      options: {
        1: "Windows",
        2: "Linux",
        3: "Windows & Linux",
      },
    });

    this.settingUtils.addItem({
      key: "addBodyBorder",
      value: false,
      type: "checkbox",
      title: this.i18n.addBodyBorder,
      description: this.i18n.addBodyBorderDesc,
    });

    this.settingUtils.addItem({
      key: "bodyBorderColor",
      value: 1,
      type: "select",
      title: this.i18n.bodyBorderColor,
      description: this.i18n.bodyBorderColor,
      options: {
        1: "SiYuan Highlight",
        2: "SiYuan Background",
        3: "SiYuan Surface",
      },
    });

    this.settingUtils.addItem({
      key: "bodyBorderTopWidth",
      value: 1,
      type: "slider",
      title: "⬆️" + this.i18n.bodyBorderTopWidth,
      description: this.i18n.bodyBorderTopWidthDesc,
      slider: {
        min: 0,
        max: 10,
        step: 1,
      },
    });

    this.settingUtils.addItem({
      key: "bodyBorderBottomWidth",
      value: 1,
      type: "slider",
      title: "⬇️" + this.i18n.bodyBorderBottomWidth,
      description: this.i18n.bodyBorderBottomWidthDesc,
      slider: {
        min: 0,
        max: 10,
        step: 1,
      },
    });

    this.settingUtils.addItem({
      key: "bodyBorderLeftWidth",
      value: 1,
      type: "slider",
      title: "⬅️" + this.i18n.bodyBorderLeftWidth,
      description: this.i18n.bodyBorderLeftWidthDesc,
      slider: {
        min: 0,
        max: 10,
        step: 1,
      },
    });

    this.settingUtils.addItem({
      key: "bodyBorderRightWidth",
      value: 1,
      type: "slider",
      title: "➡️" + this.i18n.bodyBorderRightWidth,
      description: this.i18n.bodyBorderRightWidthDesc,
      slider: {
        min: 0,
        max: 10,
        step: 1,
      },
    });

    this.settingUtils.addItem({
      key: "addToolbarPadding",
      value: false,
      type: "checkbox",
      title: this.i18n.addToolbarPadding,
      description: this.i18n.addToolbarPaddingDesc,
    });

    this.settingUtils.addItem({
      key: "toolbarPaddingTopWidth",
      value: 1,
      type: "slider",
      title: "⬆️" + this.i18n.toolbarPaddingTopWidth,
      description: this.i18n.toolbarPaddingTopWidthDesc,
      slider: {
        min: 0,
        max: 50,
        step: 1,
      },
    });

    this.settingUtils.addItem({
      key: "toolbarPaddingBottomWidth",
      value: 1,
      type: "slider",
      title: "⬇️" + this.i18n.toolbarPaddingBottomWidth,
      description: this.i18n.toolbarPaddingBottomWidthDesc,
      slider: {
        min: 0,
        max: 50,
        step: 1,
      },
    });

    this.settingUtils.addItem({
      key: "toolbarPaddingLeftWidth",
      value: 1,
      type: "slider",
      title: "⬅️" + this.i18n.toolbarPaddingLeftWidth,
      description: this.i18n.toolbarPaddingLeftWidthDesc,
      slider: {
        min: 0,
        max: 50,
        step: 1,
      },
    });

    this.settingUtils.addItem({
      key: "toolbarPaddingRightWidth",
      value: 1,
      type: "slider",
      title: "➡️" + this.i18n.toolbarPaddingRightWidth,
      description: this.i18n.toolbarPaddingRightWidthDesc,
      slider: {
        min: 0,
        max: 50,
        step: 1,
      },
    });

    this.settingUtils.addItem({
      key: "hint",
      value: "",
      type: "hint",
      title: this.i18n.hintTitle,
      description: this.i18n.hintDesc,
    });
  }

  onLayoutReady() {
    // console.dir(commonMenuNode);

    this.loadData(STORAGE_NAME);
    this.settingUtils.load();

    if (this.settingUtils.get("totalSwitch")) {
      if (this.settingUtils.get("enableWindowControlBtnsReload")) {
        adjustWindowControlBtnsLayout(
          this.settingUtils.get("windowControlBtnPosition"),
          this.settingUtils.get("windowControlBtnsLayout"),
          this.settingUtils.get("windowControlBtnApplyOs")
        );
      }

      if (this.settingUtils.get("addBodyBorder")) {
        addBodyBorder(
          this.settingUtils.get("bodyBorderTopWidth"),
          this.settingUtils.get("bodyBorderBottomWidth"),
          this.settingUtils.get("bodyBorderLeftWidth"),
          this.settingUtils.get("bodyBorderRightWidth"),
          this.settingUtils.get("bodyBorderColor")
        );
      }

      if (this.settingUtils.get("addToolbarPadding")) {
        adjustToolbarPadding(
          this.settingUtils.get("toolbarPaddingTopWidth"),
          this.settingUtils.get("toolbarPaddingBottomWidth"),
          this.settingUtils.get("toolbarPaddingLeftWidth"),
          this.settingUtils.get("toolbarPaddingRightWidth")
        );
      }
    }
  }

  async onunload() {
    // await this.settingUtils.save();
    // this.reloadInterface();
  }

  uninstall() {
    this.removeData(STORAGE_NAME);
    showMessage(this.i18n.uninstall_hint);
  }
}
