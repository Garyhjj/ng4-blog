import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validator } from '@angular/forms';

import { NgValidatorExtendService } from '../../core/services/ng-validator-extend.service';

@Component({
  selector: 'my-comment',
  templateUrl: 'comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  commentFg : FormGroup
  constructor(private formBuilder: FormBuilder, private validExd:NgValidatorExtendService) {  }

  ngOnInit() {
    this.commentFg = this.initForm();
  }

  //初始化原始數據
  initForm(work: any = {}): FormGroup {
    return this.formBuilder.group({
      name: ['', this.validExd.required()],
      email: ['', this.validExd.email()],
      url: ['', this.validExd.url()],
      content: ['', this.validExd.required()]
    });
  }

  submitFg() {
    console.log(this.commentFg)
  }
}
