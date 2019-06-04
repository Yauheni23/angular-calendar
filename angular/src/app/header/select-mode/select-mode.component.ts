import { Component, OnInit } from '@angular/core';
import { calendar } from '../../constants';
import { EventManager } from '@angular/platform-browser';

@Component({
  selector: 'app-select-mode',
  templateUrl: './select-mode.component.html',
  styleUrls: ['./select-mode.component.less']
})
export class SelectModeComponent implements OnInit {
  private modes = calendar.MODES;
  private selectedMode = 'month'; // получить из роутера
  private isVisible = false;

  constructor(private eventManager: EventManager) {
    this.eventManager.addGlobalEventListener( 'document', 'click', this.hideMenu );
  }

  ngOnInit() {
  }

  hideMenu = (): void => {
    this.isVisible = false;
  }

  toggleMenu(event: Event): void {
    event.stopPropagation();
    this.isVisible = !this.isVisible;
  }

  selectMode(mode: string): void {
    this.selectedMode = mode;
  }
}
