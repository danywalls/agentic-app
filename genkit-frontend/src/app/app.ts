import { Component, inject } from '@angular/core';
import { KENDO_CONVERSATIONALUI, SendMessageEvent } from '@progress/kendo-angular-conversational-ui';
import { GenkitService } from './services/genkit';
import { USER } from './entities/models';


@Component({
  selector: 'app-root',
  imports: [KENDO_CONVERSATIONALUI],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  genkitService = inject(GenkitService);
  user = USER;
  messages = this.genkitService.messages;

  public onSendMessage(event: SendMessageEvent): void {
    const messageText = event.message.text ?? '';
    if (messageText.trim()) {
      this.genkitService.sendMessage(messageText);
    }
  }
}
