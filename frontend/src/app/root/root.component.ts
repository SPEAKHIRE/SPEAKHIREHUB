import { Component, OnInit } from '@angular/core';
import { RootService } from './root.service'

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css']
})
export class RootComponent implements OnInit {

  constructor(private rootService : RootService) { }

  ngOnInit() {
    this.rootService.getAPIData().subscribe((response: any)=>{
        console.log('response is ', response)
    },(error: any) => {
        console.log('error is ', error)
    })
  }

}
