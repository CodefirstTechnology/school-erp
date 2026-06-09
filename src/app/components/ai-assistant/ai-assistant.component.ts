import { Component } from '@angular/core';

@Component({
  selector: 'app-ai-assistant',
  templateUrl: './ai-assistant.component.html',
  styleUrls: ['./ai-assistant.component.css']
})
export class AiAssistantComponent {
  isOpen = false;
  isPulsing = true;

  toggleChat(): void {
    this.isOpen = !this.isOpen;
    this.isPulsing = false;
  }
}
