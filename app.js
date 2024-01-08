const a = document.querySelector('#a')
const b = document.querySelector('#b')
const c = document.querySelector('#c')

const btn = document.querySelector('button')
const result = document.querySelector('.result')
const equation = document.querySelector('.equation')

const calcDelta = (x, y, z) => {
  return y ** 2 - 4 * x * z
}
const roots = (x, y, z) => {
  const delta = calcDelta(x, y, z)
  return [(-y + Math.sqrt(delta)) / (2 * x), (-y - Math.sqrt(delta)) / (2 * x)]
}

btn.addEventListener('click', () => {
  equation.innerHTML = `${a.value}x<sup>2</sup> + ${b.value}x + ${c.value} = 0`
  if (calcDelta(a.value, b.value, c.value) >= 0 && a.value != 0) {
    result.innerHTML = roots(a.value, b.value, c.value).join(' ')
  } else if (calcDelta(a.value, b.value, c.value) < 0 && a.value != 0) {
    result.innerHTML = `<span class="red">
    No roots
    </span>`
  }
  chart(a.value, b.value, c.value)
})

const chart = (a,b,c) => {
  var ctx = document.getElementById('myChart')
  var data = {
    labels: [
      -10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    ],
    datasets: [
      {
        label: `f(x) = ${a}x*x+${b}x+${c}`,
        function: function (x) {
          return( (a * x * x )+ (b * x) +(c*1))
        },
        borderColor: 'rgba(255, 206, 86, 1)',
        data: [],
        fill: false,
      },
    ],
  }
  Chart.pluginService.register({
    beforeInit: function (chart) {
      var data = chart.config.data
      for (var i = 0; i < data.datasets.length; i++) {
        for (var j = 0; j < data.labels.length; j++) {
          var fct = data.datasets[i].function,
            x = data.labels[j],
            y = fct(x)
          data.datasets[i].data.push(y)
        }
      }
    },
  })
  var myBarChart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  })
}
