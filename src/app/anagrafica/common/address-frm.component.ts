import { Component, Self } from "@angular/core";
import { FormGroup, FormControl, NgControl, Validators, ValidationErrors } from "@angular/forms";
import { BaseFrmComponent } from "@base/base-frm.component";

@Component({
  selector: "app-address-frm",
  template: `
    <fieldset [formGroup]="frm">
      <h4>Fieldset indirizzo</h4>
      <label>Via</label><input formControlName="via" (blur)="onTouch()" /> <label>CAP</label
      ><input type="number" formControlName="cap" (blur)="onTouch()" /> <label>Città</label
      ><input type="text" formControlName="citta" (blur)="onTouch()" required /> <label>Prov</label
      ><input formControlName="prov" (blur)="onTouch()" />
    </fieldset>
  `,
  styles: ["input.ng-invalid { border: 2px red solid }"]
})
export class AddressFrmComponent extends BaseFrmComponent<IAddress> {
  initFrm() {
    return new FormGroup({
      via: new FormControl(""),
      cap: new FormControl(0, [Validators.min(30000), Validators.max(40000)]),
      citta: new FormControl(""), //AGGIUNTO required NEL TEMPLATE
      prov: new FormControl("", this.validProv)
    }) as FormGroupTyped<IAddress>;
  }
  constructor(@Self() public controlDir: NgControl) {
    super(controlDir);
  }

  validProv(ctrl: AbstractControlTyped<string>): ValidationErrors {
    if (ctrl && ctrl.value && ctrl.value.length == 2) return null;
    return { prov: false }; //INVALID PROV
  }
}