import { Component, Input, ChangeDetectionStrategy } from "@angular/core";

@Component({
     selector: "app-boolean-icon",
     templateUrl: "./boolean-icon.component.html",
     styleUrls: ["./boolean-icon.component.scss"],
     changeDetection: ChangeDetectionStrategy.OnPush
})
export class BooleanIconComponent {
     @Input() public state: boolean;
}
