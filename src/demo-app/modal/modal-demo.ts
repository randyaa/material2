import { Component, provide, ElementRef, Injector,
    IterableDiffers, KeyValueDiffers, Renderer} from 'angular2/core';
import {MdButton} from '../../components/button/button';
//import {MD_MODAL_DIRECTIVES} from '../../components/modal/modal';

import {ModalDialogInstance} from '../../components/modal/models/ModalDialogInstance';
import {ModalConfig} from '../../components/modal/models/ModalConfig';
import {Modal} from '../../components/modal/providers/Modal';
import {ICustomModal} from '../../components/modal/models/ICustomModal';

import {YesNoModalContent, YesNoModal} from '../../components/modal/commonModals/yesNoModal';
import {OKOnlyContent, OKOnlyModal} from '../../components/modal/commonModals/okOnlyModal';

@Component({
    selector: 'modal-demo',
    templateUrl: 'demo-app/modal/modal-demo.html',
    styleUrls: ['demo-app/modal/modal-demo.css'],
    directives: [MdButton]
})
export class ModalDemo {
    constructor(private modal: Modal, private elementRef: ElementRef,
                private injector: Injector, private _renderer: Renderer) {}

    /* tslint:disable */
    // We defaulted quit key to 81 at app bootstrap, to make it 27 we have to specify it for each modal config
    static modalConfigs = {
        'large': new ModalConfig("lg", false, 27),
        'small': new ModalConfig("sm", false, 27),
        'yesno': new ModalConfig("sm", false, 27),
        //'key': undefined, // Modal will use default config, which we set at app bootstrap (setting in app bootstrap is optional)
        'blocking': new ModalConfig("lg", true, null), // null for keyboard means no keyboard keys can close the modal.
        'inElement': new ModalConfig("lg", true, null),
        'customWindow': new ModalConfig("lg", true, 27)
    };
    static modalData = {
        'large': new YesNoModalContent('Simple Large modal', 'Press ESC or click OK / outside area to close.', true),
        'small': new YesNoModalContent('Simple Small modal', 'Press ESC or click OK / outside area to close.', true),
        'yesno': new YesNoModalContent('Simple 2 button custom modal', 'Answer the question', false, "Yes", "No"),
        'key': new YesNoModalContent('Special Exit Key', 'Press q to close.', true),
        'blocking': new YesNoModalContent('Simple Blocking modal', 'You can only click OK to close this modal.', true),
        'inElement':new YesNoModalContent('Simple In Element modal', 'Try stacking more modals, click OK to close.', true),
    };
    /* tslint:enable */

    openDialog(type: string) {
        let dialog:  Promise<ModalDialogInstance>;
        let component = YesNoModal;

        // Workaround for https://github.com/angular/angular/issues/4330
        // providing resolved providers to IterableDiffers, KeyValueDiffers & Renderer.
        // Since customWindow uses 'ngClass' directive & 'ngClass' requires the above providers we need to supply them.
        // One would expect angular to get them automatically but that not the case at the moment.
        //let bindings = Injector.resolve([
        //    provide(ICustomModal, {useValue: ModalDemo.modalData[type]}),
        //    provide(IterableDiffers, {useValue: this.injector.get(IterableDiffers)}),
        //    provide(KeyValueDiffers, {useValue: this.injector.get(KeyValueDiffers)}),
        //    provide(Renderer, {useValue: this._renderer})
        //]);

            dialog = this.modal.open(
                <any>component,
                //bindings,
                [],
                new ModalConfig("lg", false, 27));


        dialog.then((resultPromise) => {
            return resultPromise.result.then((result) => {
                //this.lastModalResult = result;
            }, () => console.log("this.lastModalResult = 'Rejected!'"));
        });
    }
}