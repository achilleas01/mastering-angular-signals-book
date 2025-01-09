import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-modal-demo',
  templateUrl: './modal-demo.component.html',
})
export class ModalDemoComponent {
  isModalVisible = signal(false);

  toggleModal() {
    this.isModalVisible.update((value) => !value);
  }
}
