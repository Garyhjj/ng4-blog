import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';

import { NgValidatorExtendService } from '../../../core/services/ng-validator-extend.service';

import { BlogService } from '../../../core/services/blog.service';

import { Subscription }           from 'rxjs/Subscription';

import * as marked from 'marked';
import { JwtHelper } from 'angular2-jwt';
import { tify, sify } from 'chinese-conv';
import { APPConfig } from '../../../shared/config/app.config';

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
  error: string = '';
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(
    private formBuilder: FormBuilder,
    private validExd:NgValidatorExtendService,
    private blogService: BlogService
  ) {  }

  ngOnInit() {
    this.initData();
    this.mySubscribe = this.blogService.reply.subscribe((val) => {
      this.reply = val;
    })
  }

  /**
   * 初始化表单
   */
  initData() {
    this.commentFg = this.initForm();
    this.preload = '';
    this.commentFg.controls.content.valueChanges.subscribe((val) => {
      this.preload = marked(val.replace(/script/gi,"```"+"script"+"```"));
    })
  }
  ngOnDestroy() {
    this.mySubscribe.unsubscribe();
  }
  //初始化原始數據
  initForm(work: any = {}): FormGroup {
    return this.formBuilder.group({
      author: ['', [this.validExd.required(), this.validExd.selfDefine((ctrl,jwtHelper) => {
        let val = ctrl.value;
        let token = localStorage.getItem('id_token');
        if(val != tify(APPConfig.administrator.name) && val != sify(APPConfig.administrator.name)) return null;
        if(!token) return {
          unauthorized:true
        };
        return !jwtHelper.isTokenExpired(token)? null :{
          unauthorized:true
        }
      },this.jwtHelper)]],
      email: ['', this.validExd.email()],
      url: ['', this.validExd.url()],
      content: ['', this.validExd.required()]
    });
  }

  /**
   * 提交表单
   */
  submitFg() {
    let comment = Object.assign({},this.commentFg.value);
    comment.reply = this.reply;
    comment.articleId = this.articleId;
    this.blogService.createComment(comment).then((res) => {
      if(res.status == 200) {
        this.initData();
        this.blogService.newComment.next(res.json())
      };
    }).catch((e)=> {
      if(+e.status === 401) {
        this.error = '游客不能够使用作者名称来作评论'
      }
    })
  }
}
