import { Component, EventEmitter, OnInit } from '@angular/core';
import { SystemLog } from 'src/app/models/SystemLog';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-systemlogs-page',
  templateUrl: './systemlogs-page.component.html',
  styleUrls: ['./systemlogs-page.component.scss']
})
export class SystemlogsPageComponent implements OnInit {

  /**
   * System logs
   */
  systemlogs: SystemLog[];

  /**
   * Systemlog Emitter
   */
  systemLogEmitter = new EventEmitter<SystemLog[]>();

  constructor(
    private apiService: ApiService,
  ) { }

  /**
   * Load the system log
   */
  ngOnInit(): void {
    this.getLogs();
  }

  /**
   * Get systemlogs and fire the emitter
   */
  getLogs() {
    this.apiService.systemlogs().subscribe(result => {
      if (result?.systemlogs) {
        this.systemlogs = result.systemlogs;
        this.systemLogEmitter.next(this.systemlogs)
      }
    })
  }

}
