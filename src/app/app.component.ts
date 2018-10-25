import { Component, OnInit } from '@angular/core';
import {GraphType} from './GraphType';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {

  public title = 'chart';
  public fileToUpload: File = null;
  public fileData: any;
  public graphData: any;
  public unifiedGraphData=[];
  public x_min;
  public x_max;

  constructor(){}

  createGraph(){
   
   let maxLength = 0;
   this.unifiedGraphData=[];
   this.fileData.groups[0].peaks.forEach(item=>{
      let length: number = item.eic.intensity.length;
      if (length>maxLength){
        maxLength=length;
      }
    })
    let group_zero = this.fileData.groups.find(i => i.groupId == 1);
    group_zero.peaks.forEach(item=>{
      let length: Number = item.eic.intensity.length;
      let gt =[];
      this.graphData=[];
      for(let i=0;i<=maxLength;i++){
        gt=[];
        if(item.eic.rt[i] || item.eic.intensity[i]){
          gt.push(item.eic.rt[i]);
          gt.push(item.eic.intensity[i]);}
        else{
          gt.push(0);
          gt.push(0);
        }
        this.graphData.push(gt);

      }
      this.unifiedGraphData.push({
        key:item.sampleName,
        values:this.graphData
      });    
    });

    this.calculateXDomain(this.unifiedGraphData);
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    let reader = new FileReader();
    reader.onload = () => {
        var text = reader.result;
        this.fileData = JSON.parse(text.toString());
    }
    reader.onloadend = () =>{
      this.createGraph();

    }
    reader.readAsText(files.item(0));
    console.log(this.fileData);
    // this.createGraph();
  }

  calculateXDomain(data:any){
    let xMax=Number.POSITIVE_INFINITY;
    let xMin=Number.NEGATIVE_INFINITY;

    console.log(data);

    data.forEach(item => {
      item.values.forEach(valueElement => {

        if(valueElement[0]<xMax && valueElement[1]!=0){
          xMax=valueElement[0];
        }
        if(valueElement[0]>xMin && valueElement[1]!=0){
          xMin=valueElement[0];
        }
      });
    });
    this.x_min=xMax;
    this.x_max=xMin;        
  }

}
