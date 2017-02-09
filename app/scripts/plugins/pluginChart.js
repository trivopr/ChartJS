/**
 *  @name plugin
 *  @description description
 *  @version 1.0
 *  @options
 *    option
 *  @events
 *    event
 *  @methods
 *    init
 *    publicMethod
 *    destroy
 */
;(function($, window, undefined) {
  'use strict';

  var pluginName = 'plugin-chart';
  var data1, data2;
  function fitToContainer(canvas){
    // Make it visually fill the positioned parent
    canvas.style.width ='100%';
    canvas.style.height='100%';
    // ...then set the internal size to match
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }


  data1 =  {
    labels: ['5', '10', '15', '20', '25', '26', '35'],
    datasets: [{
      label: 'apples',
      data: [12, 19, 3, 17, 28, 24, 7],
      backgroundColor: 'green'
    }, {
      label: 'oranges',
      data: [30, 29, 5, 5, 20, 3, 10],
      backgroundColor: 'orange'
    }]
  };


  data2 =  {
    labels: ['Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'apples',
      data: [12, 19, 3, 17, 28, 24, 7],
      backgroundColor: 'transparent'
    }, {
      label: 'oranges',
      data: [30, 29, 5, 5, 20, 3, 10],
      backgroundColor: 'transparent'
    }]
  };

  // Chart1
  var chartOption1 = {
    type: 'bar',
    data: data1,
    options: {
      tooltips: {
        enabled: true,
        backgroundColor: '#000'
      },
      title: {
        text: 'THIS IS BAR CHART',
        display: true,
        position: 'top',
        fontColor: 'blue',
        fontSize: 40
      },
      onResize: function() {
        console.log('Screen Resized');
      },
      legend: {
        display: true,
        onClick: function() {
          alert(1);
        }
      },
      elements: {
        arc: {
          backgroundColor: 'orange',
          borderColor: 'red'
        },
        line: {
          backgroundColor: '#d5d5',
          borderColor: 'blue'
        },
        point: {
          radius: 5,
          backgroundColor: '#4a0',
          pointStyle: 'circle',
          hoverRadius: 7
        }
      }

    }
  };

  var chartOption2 = {
      type: 'line',
      labels : ['January','February','March','April','May','June','July'],
      data: data2,
      options: {
        title: {
          text: 'THIS IS LINE CHART',
          display: true,
          position: 'top',
          fontColor: 'blue',
          fontSize: 40
        },
        elements: {
          arc: {
            backgroundColor: 'orange',
            borderColor: 'red'
          },
          line: {
            backgroundColor: '#d5d5',
            borderColor: 'green'
          },
          point: {
            radius: 5,
            backgroundColor: '#4a0',
            borderColor: 'blue',
            pointStyle: 'square',
            hoverRadius: 7
          }
        }
      }
    };


  var data3;


  data3 =  {
    labels: ['Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat'],
    datasets: [{
      label: 'Multiple Color',
      data: [12, 30, 40, 20, 50, 35],
      backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)'
      ],
      borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
  };

  var chartOption3 = {
      type: 'bar',
      data: data3,
      options: {
        title: {
          text: 'BAR CHART MULTIPLE BACKGROUND ON SINGLE LABLE',
          display: true,
          position: 'top',
          fontColor: 'rgba(54, 162, 235, 1)',
          fontSize: 40
        },
        scales: {
          type: 'linear',
          display: false,
          yAxes: [{
            ticks: {
                max: 100,
                min: 0,
                stepSize: 10
            }
          }],
          xAxes: [{
            ticks: {
                max: 100,
                min: 0,
                stepSize: 10
            }
          }]
        }
      }
    };

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
    var canvas = document.querySelector('canvas');
    fitToContainer(canvas);
  }

  Plugin.prototype = {
    init: function() {

      // var numberChart = that.element.data('chartNumber');
      var ctx1 = $('#home canvas').get(0).getContext('2d');
      var chart1 = new window.Chart(ctx1, chartOption1);
          chart1;

      var ctx2 = $('#profile canvas').get(0).getContext('2d');
      var chart2 = new window.Chart(ctx2, chartOption2);
          chart2;

      var ctx3 = $('#barchart canvas').get(0).getContext('2d');
      var chart3 = new window.Chart(ctx3, chartOption3);
          chart3;
    },

    destroy: function() {
      // remove events
      // deinitialize
      $.removeData(this.element[0], pluginName);
    }
  };

  $.fn[pluginName] = function(options, params) {
    return this.each(function() {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      }
    });
  };

  $.fn[pluginName].defaults = {
    key: 'value',
    onCallback: null
  };

  $(function() {
    $('[data-' + pluginName + ']')[pluginName]();
  });

}(jQuery, window));
