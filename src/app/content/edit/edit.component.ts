import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params }            from '@angular/router';

import { FormBuilder, FormGroup, AbstractControl, Validator } from '@angular/forms';

import { NgValidatorExtendService } from '../../core/services/ng-validator-extend.service';
import { BlogService } from '../../core/services/blog.service';

import * as marked from 'marked';

@Component({
  selector: 'my-edit',
  templateUrl: 'edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  content:string;
  editFg:FormGroup;
  original:any;
  tip:string = '';
  canDelete:boolean = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private validExd:NgValidatorExtendService,
    private blogService: BlogService
  ) {  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if(params.id) {
        this.blogService.getOriginalArticleById(params.id).then((res) => {
          if(res.status == 200) {
            this.original = res.json()
            this.editFg = this.initForm(this.original);
            this.content = marked(this.original.content);
          }
       }).catch((e) => {
         this.editFg = this.initForm();
       })
     } else {
       this.editFg = this.initForm();
     }
    })

  }

  //初始化原始數據
  initForm(work: any = {}): FormGroup {
    return this.formBuilder.group({
      title: [work.title, this.validExd.required()],
      type: [work.type, this.validExd.required()],
      label: [work.label, this.validExd.required()],
      content: [work.content, this.validExd.required()]
    });
  }

  update(val) {
    this.content = marked(val);
  }
  submit() {
    if(this.original) {
      let data1:any = Object.assign(this.original,this.editFg.value);
      this.blogService.updateArticle(data1).then((res) => {
        if(res.status === 200) {
          this.blogService.currPageArticles = [];
          this.router.navigate(['/detail/'+ this.original._id]);
          this.blogService.updateAside.next(1)
        }
      }).catch((e:any) => {
        console.log(e)
      })
    } else {
      let data1:any = Object.assign({},this.editFg.value);
      data1.author = '黄嘉骏';
      this.blogService.createArticle(data1).then((res) => {
        if(res.status === 200) {
          this.blogService.currPageArticles = [];
          this.router.navigate(['/detail/'+ res.json()._id])
          this.blogService.updateAside.next(1)
        }
      }).catch((e:any) => {
        console.log(e)
      })
    }
  }

  delete(id) {
    if(!this.canDelete) {
      this.tip = '3秒内再次按删除按钮,将执行文章的删除';
      this.canDelete = true;
      setTimeout(() => {
        this.canDelete = false;
        this.tip = '';
      },3000);
      return;
    }
    this.blogService.deleteArticle(id).then((res) => {
      if(res.status === 200) {
        this.tip = '删除成功';
        this.blogService.updateAside.next(1);
        setTimeout(() => {
          this.router.navigate(['/main/1']);
        },500)
      }
    }).catch((e) => {
      if (e.status === 404) {
        this.tip = '没有查到此文章';
      }else {
        this.tip = e._body
      }
    })
  }
}
