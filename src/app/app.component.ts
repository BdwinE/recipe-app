import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { LoggingService } from './services/logging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    this.authService.autoLogin();
    this.loggingService.printLog('Hello From App Component');
  }
  constructor(
    private authService: AuthService,
    private loggingService: LoggingService
  ) {}
}
