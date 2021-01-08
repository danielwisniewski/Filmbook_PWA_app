import {
  ComponentFactoryResolver,
  Directive,
  ElementRef,
  HostListener,
  Input,
  ViewContainerRef,
} from '@angular/core';

import { FilmData } from '../../Models/film-data.model';
import { ContextMenuActionsComponent } from './context-menu-actions.component'

@Directive({
  selector: '[appMiniatureListContextMenu]',
})
export class MiniatureListContextMenuDirective {
  @Input('appMiniatureListContextMenu') data: FilmData;
  contextMenuPosition = { x: '0px', y: '0px' };
  constructor(
    private elRef: ElementRef,
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  @HostListener('contextmenu', ['$event']) contextmenu(event: MouseEvent) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX < event.screenX/2 ? 0 + 'px' : event.screenX + 'px';
    this.contextMenuPosition.y = this.elRef.nativeElement.offsetTop + 'px';

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      ContextMenuActionsComponent
    );
    this.viewContainerRef.clear();

    const componentRef = this.viewContainerRef.createComponent(
      componentFactory
    );
    componentRef.instance.film = this.data;
    componentRef.instance.contextMenuPosition = this.contextMenuPosition;
  }
}
