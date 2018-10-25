import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-stacked-area-chart',
  templateUrl: './stacked-area-chart.component.html',
  styleUrls: ['./stacked-area-chart.component.css']
})
export class StackedAreaChartComponent implements OnInit {
  @Input() data ;
  @Input() x_min ;
  @Input() x_max ;
  public options: any ;
 
  constructor() { }

  ngOnInit() {
    
  }

  ngOnChanges(){
    this.initializeGraphOptions();
  }
  
  public initializeGraphOptions(){
  this.options = {
    chart: {
      type: 'stackedAreaChart',
      height: 350,
      // width:450,
      margin : {  
          top: 20,
          right: 20,
          bottom: 30,
          left: 100
      },
      x: function(d){return d[0];},
      y: function(d){return d[1];},
      useVoronoi: true,
      clipEdge: true,
      showControls:false,
      duration: 100,
      useInteractiveGuideline: true,
      xAxis: {
          showMaxMin: false,
          ticks:5
        //   tickFormat: function(d){
        //     return d3.format(',.8f')(d);
        // }
      },
      yAxis: {
           tickFormat: function(d){
            return d3.format('e')(d);
        }
      },
      xDomain: [this.x_min  ,this.x_max],     
      zoom: {
          enabled: true,
          scaleExtent: [1, 100],
          useFixedDomain: false,
          useNiceScale: false,
          horizontalOff: false,
          verticalOff: true,
          unzoomEventType: 'dblclick.zoom'
      },
  }
  }
  }
 
}
