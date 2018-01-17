import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.scss']
})
export class EditBlogComponent implements OnInit {

  ckeditorContent;
  constructor() {
    this.ckeditorContent = `<p>My HTML</p>`;
  }

  ngOnInit() {
  }

  onChange($event: {}) {

  }

  onReady($event: {}) {

  }

  onFocus($event: {}) {

  }

  onBlur($event: {}) {

  }
}
