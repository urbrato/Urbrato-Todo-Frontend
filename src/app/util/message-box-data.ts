import {MessageBoxButtons} from "./message-box-buttons";
import {MessageBoxIcon} from "./message-box-icon";

export class MessageBoxData {
  message: string; // текст сообщения
  title: string; // заголовок диалогового окна
  buttons: MessageBoxButtons; // набор кнопок
  icon: MessageBoxIcon; // значок

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
