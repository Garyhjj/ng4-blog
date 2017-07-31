import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, AbstractControl, Validator } from '@angular/forms';

import { NgValidatorExtendService } from '../../core/services/ng-validator-extend.service';
import { BlogService } from '../../core/services/blog.service';

@Component({
  selector: 'my-edit',
  templateUrl: 'edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  content:string;
  editFg:FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private validExd:NgValidatorExtendService,
    private blogService: BlogService
  ) {  }

  ngOnInit() {
    this.editFg = this.initForm();
  }

  //初始化原始數據
  initForm(work: any = {}): FormGroup {
    return this.formBuilder.group({
      title: ['', this.validExd.required()],
      type: ['', this.validExd.required()],
      label: ['', this.validExd.required()],
      content: ['', this.validExd.required()]
    });
  }

  update(val) {
    this.content = val;
  }
  submit() {
    let data1:any = Object.assign({},this.editFg.value);
    data1.author = '黄嘉骏';
    this.blogService.createArticle(data1).then((res) => {
      console.log(res)
    })
  }
}
