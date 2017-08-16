import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { BlogService } from '../../core/services/blog.service';

import { Subscription }           from 'rxjs/Subscription';

@Component({
  selector: 'my-msg',
  templateUrl: 'message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit, OnDestroy {
  @Input() articleId :string;
  comments:any[];
  mySubscribe : Subscription;

  constructor(private blogService: BlogService) {  }

  async ngOnInit() {
    let res = await this.blogService.getCommnetsByAritcleId(this.articleId);
    this.comments = res.json();
    this.mySubscribe = this.blogService.newComment.subscribe((val) => {
      this.comments.push(val);
    })
  }
  ngOnDestroy() {
    this.mySubscribe.unsubscribe();
  }
  /**
   * 更改回复对象，发布新的reply值，驱动订阅了reply的方法
   * @param  {string} author 回复的目标
   * @return {[type]}        [description]
   */
  replay(author:string) {
    this.blogService.reply.next(author);
  }
}
