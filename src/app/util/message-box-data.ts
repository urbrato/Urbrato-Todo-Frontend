import {MessageBoxButtons} from "./message-box-buttons";
import {MessageBoxIcon} from "./message-box-icon";

export class MessageBoxData {
  message: string;
  title: string;
  buttons: MessageBoxButtons;
  icon: MessageBoxIcon;

  constructor(
    message: string,
    title: string,
    buttons: MessageBoxButtons,
    icon: MessageBoxIcon
  ) {
    this.message = message;
    this.title = title;
    this.buttons = buttons;
    this.icon = icon;
  }
}
