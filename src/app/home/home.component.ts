import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  public fileToUpload: File = null;
  public fileData: any;
  public graphData: any;
  public unifiedGraphData=[];
  public allGroupsUnifiedGraphData=[];
  public groupMergedList=[];
  public x_min;
  public x_max;
  public x_min_all_groups;
  public x_max_all_groups;


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

    let xDomain=this.calculateXDomain(this.unifiedGraphData);
    this.x_min=xDomain[0];
    this.x_max=xDomain[1];
  }

  createGraphGroups(){
    // let mergeSampleData=[];
    let mergeSampleData: { [id: string] : [number]; } = {};
    let mergedList=[];
    let maxLength = 0;
    this.allGroupsUnifiedGraphData=[];
    this.fileData.groups.forEach(group => {
      group.peaks.forEach(item=>{
        let length: number = item.eic.intensity.length;
        if (length>maxLength){
          maxLength=length;
        }
      });
    });
    this.fileData.groups.forEach(group => {
      group.peaks.forEach(item=>{
       
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
        mergeSampleData[item.sampleName]=this.graphData;
      });
    });
    for (let key in mergeSampleData) {
      let value = mergeSampleData[key];
      this.allGroupsUnifiedGraphData.push({
        key:key,
        values:value
      });   
      // Use `key` and `value`
  }
    let xDomain=   this.calculateXDomain(this.allGroupsUnifiedGraphData);
    this.x_min_all_groups=xDomain[0];
    this.x_max_all_groups=xDomain[1];
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
      this.createGraphGroups();
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
    return [xMax,xMin];
         
  }
}
