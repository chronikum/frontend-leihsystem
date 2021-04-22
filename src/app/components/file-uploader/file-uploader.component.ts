import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent implements OnInit {

  /**
   * Trigger wwhen profile image was updated
   */
  @Input() trigger: EventEmitter<boolean>;

  /**
   * The text provided on the uploader
   */
  @Input() text: string = "Datei hochladen"

  /**
   * Defines the target of the upload
   */
  @Input() target: 'profile' | 'logo';


  constructor(
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
  }

  // At the drag drop area
  // (drop)="onDropFile($event)"
  onDropFile(event: DragEvent) {
    event.preventDefault();
    this.uploadFile(event.dataTransfer.files);
  }

  // At the drag drop area
  // (dragover)="onDragOverFile($event)"
  onDragOverFile(event) {
    console.log("DRAGGING")
    event.stopPropagation();
    event.preventDefault();
  }

  // At the file input element
  // (change)="selectFile($event)"
  selectFile(event) {
    this.uploadFile(event.target.files);
  }

  uploadFile(files: FileList) {
    if (files.length == 0) {
      console.log("No file selected!");
      return

    }
    let file: File = files[0];

    if (this.target === 'profile') {
      this.apiService.uploadProfilePicture$(file, this.apiService.currentUser).subscribe((event: any) => {
        if (typeof (event) === 'object') {
          console.log(event.body);
          console.log("File upload completed")
          this.trigger.next(true)
        }
      });
    }

    if (this.target === 'logo') {
      this.apiService.uploadLogo$(file).subscribe((event: any) => {
        if (typeof (event) === 'object') {
          console.log(event.body);
          console.log("File upload completed")
          this.trigger.next(true)
        }
      });
    }
  }

}
