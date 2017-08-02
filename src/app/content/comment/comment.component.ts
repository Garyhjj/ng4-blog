import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validator } from '@angular/forms';

import { NgValidatorExtendService } from '../../core/services/ng-validator-extend.service';

import { BlogService } from '../../core/services/blog.service';

import { Subscription }           from 'rxjs/Subscription';

import * as marked from 'marked';

@Component({
  selector: 'my-comment',
  templateUrl: 'comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit, OnDestroy {

  @Input() articleId:string;
  commentFg : FormGroup;
  mySubscribe : Subscription;
  reply : string = '';
  preload: string;
  constructor(
    private formBuilder: FormBuilder,
    private validExd:NgValidatorExtendService,
    private blogService: BlogService
  ) {  }

  ngOnInit() {
    this.commentFg = this.initForm();
    this.commentFg.controls.content.valueChanges.subscribe((val) => {
      this.preload = marked(val.replace(/script/g,"```"+"script"+"```"));
    })
    this.mySubscribe = this.blogService.reply.subscribe((val) => {
      this.reply = val;
    })
  }

  ngOnDestroy() {
    this.mySubscribe.unsubscribe();
  }
  //初始化原始數據
  initForm(work: any = {}): FormGroup {
    return this.formBuilder.group({
      author: ['', this.validExd.required()],
      email: ['', this.validExd.email()],
      url: ['', this.validExd.url()],
      content: ['', this.validExd.required()]
    });
  }

  submitFg() {
    let comment = Object.assign({},this.commentFg.value);
    comment.reply = this.reply;
    comment.articleId = this.articleId;
    this.blogService.createComment(comment).then((res) => {
      if(res.status == 200) {
        this.commentFg = this.initForm();
        this.blogService.newComment.next(res.json())
      };
    })
  }
}
