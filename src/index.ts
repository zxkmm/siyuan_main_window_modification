declare global {
    var windowControls: any;
    var closeWindow: any;
    var minWindow: any;
    var maxWindow: any;
}

import {
    Plugin,
    showMessage,
    getFrontend,
} from "siyuan";
import "@/index.scss";

import { SettingUtils } from "./libs/setting-utils";

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

const opration_system = navigator.platform.toLocaleLowerCase();

const commonMenuNode = document.getElementById('commonMenu'); //it's the menu's id

export default class siyuan_rmv_btn extends Plugin {

    private settingUtils: SettingUtils;

    convertStringToArray(userInput) {
        if (userInput) {
            var inputArray = userInput.split(/[,，]/);
            for (let i = 0; i < inputArray.length; i++) {
                inputArray[i] = inputArray[i].trim();
            }
            return inputArray;
        } else {
            // 处理 undefined
            return [];
        }
    }

    addBodyBorder(_upBorderWidth_, _downBorderWidth_, _leftBorderWidth_, _rightBorderWidth_){
        var css = `body {
            border-top-width: ${_upBorderWidth_}px;
            border-bottom-width: ${_downBorderWidth_}px;
            border-left-width: ${_leftBorderWidth_}px;
            border-right-width: ${_rightBorderWidth_}px;
            border-style: solid;
            border-color: var(--b3-theme-background-light);
        }`

        this.applyStyles(css);
        
    }

    applyStyles(css) {
        const head = document.head || document.getElementsByTagName('head')[0];
        const style = document.createElement('style');
        head.appendChild(style);
        style.appendChild(document.createTextNode(css));
    }

    leftOffsetWindowControlBtns() {
        const _css_ = `
        body.body--win32 .fullscreen > .protyle-breadcrumb,
        body.body--win32 .fullscreen > .block__icons {
            padding-left: 120px;
            padding-right: 10px;
        }
        `;
        this.applyStyles(_css_);
    }

    adjustWindowControlBtnsLayout(_pos_, _layout_, _enabledSystem_) {

        //sys: 1: win 2: linux 3: win and linux

        if (
            (_enabledSystem_.includes('1') && opration_system.includes('win')) ||
            (_enabledSystem_.includes('2') && opration_system.includes('linux')) ||
            (_enabledSystem_.includes('3') && (opration_system.includes('win') || opration_system.includes('linux')))
        ) {
            if (_pos_ == 2) {
                windowControls.style.order = "-1";
                this.leftOffsetWindowControlBtns();
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




    reloadInterface() {
        // window.location.reload();
        showMessage(this.i18n.reload_hint);
    }

    async onload() {

        this.settingUtils = new SettingUtils(this, STORAGE_NAME);
        this.settingUtils.load();
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
            }
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
            }
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
            }
        });

        this.settingUtils.addItem({
            key: "addBodyBorder",
            value: false,
            type: "checkbox",
            title: this.i18n.addBodyBorder,
            description: this.i18n.addBodyBorderDesc,
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
            }
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
            }
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
            }
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
            }
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

        console.dir(commonMenuNode);


        this.loadData(STORAGE_NAME);
        this.settingUtils.load();

        if (this.settingUtils.get("totalSwitch")) {



            if (this.settingUtils.get("enableWindowControlBtnsReload")) {
                this.adjustWindowControlBtnsLayout(
                    this.settingUtils.get("windowControlBtnPosition"),
                    this.settingUtils.get("windowControlBtnsLayout"),
                    this.settingUtils.get("windowControlBtnApplyOs")
                );
            }

            if (this.settingUtils.get("addBodyBorder")){
                this.addBodyBorder(
                    this.settingUtils.get("bodyBorderTopWidth"),
                    this.settingUtils.get("bodyBorderBottomWidth"),
                    this.settingUtils.get("bodyBorderLeftWidth"),
                    this.settingUtils.get("bodyBorderRightWidth")

                );
            }


        }
    }

    async onunload() {
        await this.settingUtils.save();
        // this.reloadInterface();
    }

    uninstall() {
        this.removeData(STORAGE_NAME);
        showMessage(this.i18n.uninstall_hint);
    }

}
