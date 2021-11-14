const chartOptions = {
  chart: {
    height: 200,
    type: 'line',
    zoom: {
      enabled: false
    },
    toolbar: {
      show: false
    },
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth',
    width: 1,
    colors: '#5643CC'
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr'],
    labels: {
      style: {
        colors: '#D6D6D9',
      }
    }
  },
  yaxis: {
    opposite: true,
    labels: {
      style: {
        colors: '#D6D6D9',
      }
    }
  },
  grid: {
    xaxis: {
      lines: {
        show: false
      }
    },
    yaxis: {
      lines: {
        show: false
      },
    },
  },
  toolbar: {
    show: false
  },
  markers: {
    size: 4,
    style: "circle",
    fillOpacity: 1,
    strokeOpacity: 0.3,
    colors: '#5643CC',
  },
};

export default chartOptions;