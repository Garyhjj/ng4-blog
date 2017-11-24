/*
組件需要傳入的數據結構
{
  pageSize:number,//每頁容量
  dataTotal:number,//總數據數量
  currPage:number,//目前頁碼
  currRoute:string,//目前除頁碼id的路由地址
  pageLength:number//顯示的最多頁碼數
}
 */

import { Component, OnInit, Input }     from '@angular/core';
import { Router }              from '@angular/router';

class Pager {
  page:number;
  constructor(private num:number){
    this.page = num;
  }
}

@Component({
  moduleId:module.id,
  selector: 'my-page',
  templateUrl: 'page.component.html',
  styleUrls: ['page.component.css'],
})

export class PageComponent implements OnInit{
  @Input("mypage")
  pageMes:{
    pageSize:number,//每頁容量
    dataTotal:number,//總數據數量
    currPage:number,//目前頁碼
    currRoute:string,//目前除頁碼id的路由地址
    pageLength:number//顯示的最多頁碼數
  };
  constructor(
    private router:Router
  ){};

  pageTotal:number;//分頁總數
  pageShow :Pager[];//視圖的頁碼數組
  pageSelected:number;//選中的頁碼
  pageLength:number;//最後顯示的頁碼個數
  ngOnInit(){
    this.pageTotal= Math.ceil(this.pageMes.dataTotal/this.pageMes.pageSize);
    this.pageMes.pageLength = isNaN(this.pageMes.pageLength)? 5:this.pageMes.pageLength;
    this.pageLength = Math.min(this.pageMes.pageLength,this.pageTotal);
    this.pageShow = [];
    for(let i = 0;i<this.pageLength;i++){
      let mypager= new Pager(i+1);
      this.pageShow.push(mypager);
    }
    //確定當前頁碼
    this.pageSelected = isNaN(+this.pageMes.currPage)? 1: Number(this.pageMes.currPage);
    //跳轉并渲染
    this.jump(this.pageSelected);
  }
  //頁碼渲染
  pageRender(change:number){
    for(let i = 0;i<this.pageShow.length;i++){
      this.pageShow[i].page = this.pageSelected -change+i
    }
  }
  //頁碼跳轉
  jump(i:number): void{
    this.pageSelected=i;
    var lastPageShow = this.pageShow[this.pageShow.length-1].page;

    //當選中最後一頁時
    if(this.pageSelected === this.pageTotal){
      this.pageRender(this.pageLength-1);
    } else {
      if(this.pageLength>3){
        if(this.pageTotal && this.pageSelected > lastPageShow-2 && this.pageSelected < this.pageTotal-1){
          this.pageRender(this.pageLength-3);
        }else if(this.pageSelected < this.pageShow[0].page + 2 && this.pageSelected > 2){
          this.pageRender(2)
        //當從前面選擇倒數第二頁時重新渲染顯示的頁碼信息
        }else if(this.pageSelected === this.pageTotal-1){
          this.pageRender(this.pageLength-2);
        //當從後面選擇第二頁時重新渲染顯示的頁碼信息
        }else if(this.pageSelected === 2){
          this.pageRender(1);
        }
      }else if(this.pageLength === 3){
        if(this.pageSelected>lastPageShow-1 && this.pageSelected < this.pageTotal || this.pageSelected<this.pageShow[0].page+1 && this.pageSelected > 1){
          this.pageRender(1);
      };
      }else if(this.pageLength === 2){
        if(this.pageSelected>lastPageShow-1 && this.pageSelected < this.pageTotal){
          this.pageRender(0);
        }else if(this.pageSelected<this.pageShow[0].page+1 && this.pageSelected > 1){
          this.pageRender(1);
        };
      }else{
        this.pageRender(0)
      }

    }
    this.router.navigate([this.pageMes.currRoute? this.pageMes.currRoute :'./',this.pageSelected]);
  }
  prePage(): void{
    (this.pageSelected>1) && this.jump(this.pageSelected-1);
  }
  nextPage(): void{
    (this.pageSelected<this.pageTotal) && this.jump(this.pageSelected+1);
  }
}
