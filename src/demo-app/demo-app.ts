import {Component} from 'angular2/core';
import {CardDemo} from './card/card-demo';
import {ButtonDemo} from './button/button-demo';
import {SidenavDemo} from './sidenav/sidenav-demo';
import {ProgressCircleDemo} from './progress-circle/progress-circle-demo';
import {Route, RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {Dir} from '../directives/dir/dir';
import {MdButton} from '../components/button/button';
import {PortalDemo} from './portal/portal-demo';
import {ModalDemo} from './modal/modal-demo';


@Component({
  selector: 'home',
  template: ''
})
export class Home {}

@Component({
  selector: 'demo-app',
  providers: [],
  templateUrl: 'demo-app/demo-app.html',
  styleUrls: ['demo-app/demo-app.css'],
  directives: [ROUTER_DIRECTIVES, Dir, MdButton],
  pipes: []
})
@RouteConfig([
  new Route({path: '/', name: 'Home', component: Home, useAsDefault: true}),
  new Route({path: '/button',   name: 'ButtonDemo', component: ButtonDemo}),
  new Route({path: '/card', name: 'CardDemo', component: CardDemo}),
  new Route({path: '/modal', name: 'ModalDemo', component: ModalDemo}),
  new Route({path: '/sidenav', name: 'SidenavDemo', component: SidenavDemo}),
  new Route({path: '/progress-circle', name: 'ProgressCircleDemo', component: ProgressCircleDemo}),
  new Route({path: '/portal', name: 'PortalDemo', component: PortalDemo}),
])
export class DemoApp { }
