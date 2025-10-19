import { Component, inject, signal, effect, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ConversationalUIModule,
  Message,
  User,
  SendMessageEvent,
} from '@progress/kendo-angular-conversational-ui';
import { GenkitService } from './services/genkit';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ConversationalUIModule],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class AppComponent {
  private genkitService = inject(GenkitService);

  public readonly user: User = { id: 1, name: 'You' };
  public readonly bot: User = { id: 0, name: 'Agent' };

  public messages = signal<Message[]>([
    { 
      author: this.bot, 
      text: 'Hello! Ask me about order status (e.g., for order 123-456).', 
      timestamp: new Date() 
    },
  ]);

  private agentResponse = this.genkitService.response;

  constructor() {
    effect(() => {
      const newResponse = this.agentResponse();
      if (newResponse) {
        this.messages.update((current) => [...current, newResponse]);
        this.genkitService.resetResponse();
      }
    });
  }

  public onSendMessage(event: SendMessageEvent): void {
    const message: Message = {
      author: this.user,
      text: event.message.text,
      timestamp: new Date()
    };
    
    this.messages.update((current) => [...current, message]);
    
    const messageText = event.message.text ?? '';
    if (messageText.trim()) {
      this.genkitService.sendMessage(messageText);
    }
  }
}
