var main_color = getComputedStyle(document.documentElement).getPropertyValue("--main_color")

function ae_information(name_value){
  console.log(name_value)
  document.getElementById('infor_name_id').innerText = name_value;
}


function uploadFile() {
  console.log("vao day")
  const fileInput = document.getElementById("picture_id");
  const file = fileInput.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const data = e.target.result.split(",")[1]; // Lấy dữ liệu base64 từ chuỗi Data URL
      const payload = {
        imgname: file.name,
        data: data, // Dữ liệu base64, không phải đối tượng
      };
      console.log("vao day")
      uibuilder.send({
        topic: "upload",
        payload: payload,
      });
    };
    reader.readAsDataURL(file); // Đọc file dưới dạng base64
  }
}


document.addEventListener('DOMContentLoaded', () => {
  const names = ["Biểu đồ 1", "Biểu đồ 2", "Biểu đồ 3","Biểu đồ 4","Biểu đồ 5"]; // Mảng chứa tên
  const arr2 = [25, 75, 50,50,25,75]; // Mảng chứa giá trị phần trăm
  const arr3 = arr2.map(value => 100 - value); // Tính phần trăm còn lại

  const container = document.getElementById('charts-container');

  names.forEach((name, index) => {
      const value = arr2[index]; // Giá trị phần trăm
      const remaining = arr3[index]; // Phần trăm còn lại

      // Tạo một div chứa tiêu đề và canvas
      const chartContainer = document.createElement('div');
      chartContainer.style.display = 'flex';
      chartContainer.style.alignItems = 'center';
      chartContainer.className = 'chart_skill_container';

      // Tạo tiêu đề
      const titleElement = document.createElement('div');
      titleElement.textContent = name;
      titleElement.className = 'ae_infor_row_skill_name';

      // Tạo canvas cho biểu đồ
      const canvasContainer = document.createElement('div');
      canvasContainer.className = 'canvas_container';
      const canvas = document.createElement('canvas');
      canvas.id = `myPieChart${index}`; // Đặt ID cho mỗi canvas
      canvas.className = 'chart_skills_matrix';
      canvasContainer.appendChild(canvas);
      chartContainer.appendChild(titleElement);
      chartContainer.appendChild(canvasContainer);
      container.appendChild(chartContainer);

      // Vẽ biểu đồ
      new Chart(canvas, {
          type: 'pie',
          data: {
              labels: [name, 'Khác'], // Đặt tên và label 'Khác'
              datasets: [{
                  data: [value, remaining], // Dữ liệu phần trăm
                  backgroundColor: ['#000000', '#ffffff'], // Màu sắc
                  borderColor: ['#000000'], // Màu viền
                  borderWidth: 1
              }]
          },
          options: {
              responsive: true,
              plugins: {
                  legend: {
                      position: 'center',
                  },
                  tooltip: {
                      enabled: false // Tắt tooltip
                  }
              }
          }
      });
  });
});




// const ctx = document.getElementById('myPieChart');
//             const myPieChart = new Chart(ctx, {
//                 type: 'pie',
//                 data: {
//                     datasets: [{
//                         data: [50, 50], // Phần trăm của từng phần
//                         backgroundColor: ['#000000', '#ffffff'], // Màu sắc
//                         borderColor: ['#000000'], // Màu viền
//                         borderWidth: 1
//                     }]
//                 },
//                 options: {
//                   responsive: true,
//                   plugins: {
//                       legend: {
//                           position: 'center',
//                       },
//                       tooltip: {
//                           enabled: false // Tắt tooltip
//                       }
//                     },
//                   },
//             });








var chart = JSC.chart('chartDiv', {
    type: 'organizational down',
    legend_visible: false,
    defaultPoint_events_click: function() { 
      var name_value = this.name
      ae_information(name_value);
    },
    series: [
      {
        defaultPoint: {
          focusGlow: { color: '%color', opacity: 0.3 },
          connectorLine: { color: main_color, width: 1 }, 
          label: {
            text: '<span><span><img  width=50 height=50 transform=translate(-35,7) src=%img></span><span><span style="color:black;x=-30;y=0;font-weight:bold">%name</span><span>%data</span>',
            margin_left: 30,
            align: 'left',
          },
          annotation: {
            width:120,
            height:70,
            corners: 'round',
            radius: 5,
            margin: [10, 20, 0, 0],
            outline_color:'red',
          },
          outline_color:main_color,
          outline_width: 1,
          color: 'white', //màu nền của các nhánh
        },
        points: [
          {
            name: 'Eric',
            id: 'eric',
            attributes: {
              img: 'img/Org5.png',
              data: '<ul style="font-size:10px;color:black;y=-20"><li>AE-Manager</li><li>877654</li><li>EXT:2614</li></ul>',
            //   tasks: '<ul> <li>Operations</li> <li>Bookkeeping</li><li><i>Strategy</i></li></ul>',
            },  
          },
          
          {
            name: 'Stephen',
            id: 'stephen',
            parent: 'eric',
            attributes: {
            img: 'img/Org2.png',
            data: '<ul style="font-size:10px;color:black;y=-20"><li>Manager</li><li>877670</li><li>EXT:2615</li></ul>',
            //   tasks: '<ul><li>Product Strategy</li><li>Artistic Direction</li><li><i>Product Design</i></li></ul>',
            },
          },
          {
            name: 'Donald',
            id: 'donald',
            parent: 'stephen',
            attributes: {
              img: 'img/donald.JPG',
              data: '<ul style="font-size:10px;color:black;y=-20"><li>VSM</li><li>01053296</li><li>EXT:2612</li></ul>',
            //   tasks: '<ul><li>Marketing HR</li><li>Market Research</li></ul>',
            },
          },

          {
            name: 'Grant',
            id: 'grant',
            parent: 'donald',
            attributes: {
              img: 'img/Org2.png',
              data: '<ul style="font-size:10px;color:black;y=-20"><li>GL</li><li>01054491</li><li>EXT:2612</li></ul>',
            //   tasks: '<ul><li>Marketing HR</li><li>Market Research</li></ul>',
            },
          },
          {
            name: 'Alvin',
            id: 'alvin',
            parent: 'donald',
            attributes: {
              img: 'img/Org2.png',
              data: '<ul style="font-size:10px;color:black;y=-20"><li>GL</li><li>01051219</li><li>EXT:2612</li></ul>',
              tasks: '<ul><li>Marketing HR</li><li>Market Research</li></ul>',
            },
          },
          {
            name: 'Tim',
            id: 'tim',
            parent: 'grant',
            attributes: {
              img: 'img/Org2.png',
              data: '<ul style="font-size:10px;color:black;y=-20"><li>TL</li><li>01058524</li><li>EXT:2612</li></ul>',
              tasks: '<ul><li>Marketing HR</li><li>Market Research</li></ul>',
            },
          },
          {
            name: 'Vector',
            id: 'vector',
            parent: 'tim',
            attributes: {
              img: 'img/Org2.png',
              data: '<ul style="font-size:10px;color:black;y=-20"><li>TL</li><li>01059342</li><li>EXT:2612</li></ul>',
              tasks: '<ul><li>Marketing HR</li><li>Market Research</li></ul>',
            },
          },
          {
            name: 'Philip',
            id: 'philip',
            parent: 'vector',
            attributes: {
              img: 'img/Org2.png',
              data: '<ul style="font-size:10px;color:black;y=-20"><li>TL</li><li>01070507</li><li>EXT:2612</li></ul>',
              tasks: '<ul><li>Marketing HR</li><li>Market Research</li></ul>',
            },
          },
          {
            name: 'Sam',
            id: 'sam',
            parent: 'alvin',
            attributes: {
              img: 'img/Org2.png',
              data: '<ul style="font-size:10px;color:black;y=-20"><li>TL</li><li>01056050</li><li>EXT:2612</li></ul>',
              tasks: '<ul><li>Marketing HR</li><li>Market Research</li></ul>',
            },
          },
          {
            name: 'Bryan',
            id: 'bryan',
            parent: 'sam',
            attributes: {
              img: 'img/Org2.png',
              data: '<ul style="font-size:10px;color:black;y=-20"><li>TL</li><li>01058097</li><li>EXT:2612</li></ul>',
              tasks: '<ul><li>Marketing HR</li><li>Market Research</li></ul>',
            },
          },
          {
            name: 'Strong',
            id: 'strong',
            parent: 'stephen',
            attributes: {
              img: 'img/Org2.png',
              data: '<ul style="font-size:10px;color:black;y=-20"><li>VSM</li><li>01051203</li><li>EXT:2068</li></ul>',
              tasks: '<ul><li>Purchasing</li><li>Review</li></ul>',
            },
          },
          {
            name: 'David',
            id: 'david',
            parent: 'strong',
            attributes: {
              img: 'img/Org2.png',
              data: '<ul style="font-size:10px;color:black;y=-20"><li>GL</li><li>01055714</li><li>EXT:2631</li></ul>',
              tasks: '<ul><li>Purchasing</li><li>Review</li></ul>',
            },
          },
          {
            name: 'Justin',
            id: 'justin',
            parent: 'david',
            attributes: {
              img: 'img/Org2.png',
              data: '<ul style="font-size:10px;color:black;y=-20"><li>TL</li><li>01055825</li><li>EXT:2631</li></ul>',
              tasks: '<ul><li>Purchasing</li><li>Review</li></ul>',
            },
          },
          {
            name: 'Ari',
            id: 'ari',
            parent: 'justin',
            attributes: {
              img: 'img/Org2.png',
              data: '<ul style="font-size:10px;color:black;y=-20"><li>TL</li><li>01057551</li><li>EXT:2631</li></ul>',
              tasks: '<ul><li>Purchasing</li><li>Review</li></ul>',
            },
          },
          {
            name: 'Kai',
            id: 'kai',
            parent: 'david',
            attributes: {
              img: 'img/Org2.png',
              data: '<ul style="font-size:10px;color:black;y=-20"><li>TL</li><li>01055140</li><li>EXT:2631</li></ul>',
              tasks: '<ul><li>Purchasing</li><li>Review</li></ul>',
            },
          },
          {
            name: 'Tony',
            id: 'tony',
            parent: 'david',
            attributes: {
              img: 'img/Org2.png',
              data: '<ul style="font-size:10px;color:black;y=-20"><li>TL</li><li>01051957</li><li>EXT:2631</li></ul>',
              tasks: '<ul><li>Purchasing</li><li>Review</li></ul>',
            },
          },
          {
            name: 'Tom',
            id: 'tom',
            parent: 'tony',
            attributes: {
              img: 'img/Org2.png',
              data: '<ul style="font-size:10px;color:black;y=-20"><li>TL</li><li>01054957</li><li>EXT:2631</li></ul>',
              tasks: '<ul><li>Purchasing</li><li>Review</li></ul>',
            },
          },

          {
            name: 'Steve',
            id: 'steve',
            parent: 'stephen',
            attributes: {
              img: 'img/steve.JPG',
              data: '<ul style="font-size:10px;color:black;y=-20;"><li>VSM</li><li>01058356</li><li>EXT:2611</li></ul>',
              tasks: '<ul><li>Marketing HR</li><li>Market Research</li></ul>',
            },
          },
          {
            name: 'Jerry',
            id: 'jerry',
            parent: 'steve',
            attributes: {
              img: 'img/Org3.png',
              data: '<ul style="font-size:10px;color:black;y=-20"><li>GL</li><li>01054201</li><li>EXT:2611</li></ul>',
              tasks: '<ul><li>Marketing HR</li><li>Market Research</li></ul>',
            },
          },
          {
            name: 'William',
            id: 'william',
            parent: 'jerry',
            attributes: {
              img: 'img/Org3.png',
              data: '<ul style="font-size:10px;color:black;y=-20"><li>TL</li><li>01053333</li><li>EXT:2611</li></ul>',
              tasks: '<ul><li>Marketing HR</li><li>Market Research</li></ul>',
            },
          },


          {
            name: 'Yorn',
            id: 'yorn',
            parent: 'william',
            attributes: {
              img: 'img/Org3.png',
              data: '<ul style="font-size:10px;color:black;y=-20"><li>TL</li><li>01056119</li><li>EXT:2611</li></ul>',
              tasks: '<ul><li>Marketing HR</li><li>Market Research</li></ul>',
            },
          },

          {
            name: 'Conte',
            id: 'conte',
            parent: 'steve',
            attributes: {
              img: 'img/Org3.png',
              data: '<ul style="font-size:10px;color:black;y=-20"><li>GL</li><li>01055701</li><li>EXT:2631</li></ul>',
              tasks: '<ul><li>Marketing HR</li><li>Market Research</li></ul>',
            },
          },
          {
            name: 'Dominic',
            id: 'dominic',
            parent: 'conte',
            attributes: {
              img: 'img/Org3.png',
              data: '<ul style="font-size:10px;color:black;y=-20"><li>TL</li><li>01053336</li><li>EXT:2632</li></ul>',
              tasks: '<ul><li>Marketing HR</li><li>Market Research</li></ul>',
            },
          },
          {
            name: 'Peter',
            id: 'peter',
            parent: 'dominic',
            attributes: {
              img: 'img/Org3.png',
              data: '<ul style="font-size:10px;color:black;y=-20"><li>TL</li><li>01053340</li><li>EXT:2632</li></ul>',
              tasks: '<ul><li>Marketing HR</li><li>Market Research</li></ul>',
            },
          },
          {
            name: 'Otis',
            id: 'otis',
            parent: 'peter',
            attributes: {
              img: 'img/Org3.png',
              data: '<ul style="font-size:10px;color:black;y=-20"><li>TL</li><li>01053340</li><li>EXT:2632</li></ul>',
              tasks: '<ul><li>Marketing HR</li><li>Market Research</li></ul>',
            },
          },

        //   {
        //     name: 'Tracy',
        //     id: 'tracy',
        //     parent: 'stephen',
        //     attributes: {
        //       img: 'img/Org7.png',
        //       data: '<ul><li>TL</li><li>773-555-4444</li><li><i>Chicago, IL</i></li></ul>',
        //       tasks: '<ul><li>Marketing HR</li><li>Market Research</li></ul>',
        //     },
        //   },

        ],
      },
    ],

  });










  document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('gameBoard');
    const timerDisplay = document.getElementById('timer');
    const messageDisplay = document.getElementById('message');
    const size = 4;
    let numbers = Array.from({ length: size * size - 1 }, (_, i) => i + 1).concat(null);
    let timerInterval;
    let seconds = 0;
    let gameStarted = false;

    function createBoard() {
        board.innerHTML = '';
        numbers.forEach((number, index) => {
            const tile = document.createElement('div');
            tile.classList.add('tile');
            if (number === null) {
                tile.classList.add('empty');
            } else {
                tile.textContent = number.toString().padStart(2, '0');
                tile.dataset.number = number;
            }
            tile.dataset.index = index;
            tile.addEventListener('click', handleTileClick);
            board.appendChild(tile);
        });
    }

    function handleTileClick(event) {
        if (!gameStarted) {
            startTimer();
            gameStarted = true;
        }

        const tile = event.target;
        const index = parseInt(tile.dataset.index, 10);
        const emptyIndex = numbers.indexOf(null);

        const validMoves = [
            index - 1, // Left
            index + 1, // Right
            index - size, // Up
            index + size // Down
        ];

        if (validMoves.includes(emptyIndex) && isAdjacent(index, emptyIndex)) {
            [numbers[index], numbers[emptyIndex]] = [numbers[emptyIndex], numbers[index]];
            createBoard();
            if (isSolved()) {
                stopTimer();
                messageDisplay.textContent = 'Chúc mừng! Bạn đã xếp số đúng.';
            }
        }
    }

    function isAdjacent(index1, index2) {
        const row1 = Math.floor(index1 / size);
        const col1 = index1 % size;
        const row2 = Math.floor(index2 / size);
        const col2 = index2 % size;
        return (Math.abs(row1 - row2) === 1 && col1 === col2) || (Math.abs(col1 - col2) === 1 && row1 === row2);
    }

    function isSolved() {
        return numbers.every((number, index) => number === null || number === index + 1);
    }

    function startTimer() {
        timerInterval = setInterval(() => {
            seconds++;
            timerDisplay.textContent = `Thời gian: ${seconds}s`;
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timerInterval);
    }

    function shuffleArray(array) {
        let currentIndex = array.length, randomIndex;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
        return array;
    }

    // Xáo trộn các số và tạo bảng khi trang được tải
    numbers = shuffleArray(numbers);
    createBoard();
});
