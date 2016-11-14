import express from 'express';
import cors from 'cors';
import fetch from 'isomorphic-fetch';

const app = express();
app.use(cors());
app.get('/', (req, res) => {
  res.json({
    hello: 'JS World',
  });
});

const pcUrl =
'https://gist.githubusercontent.com/isuvorov/ce6b8d87983611482aac89f6d7bc0037/raw/pc.json';

let pc = {};
fetch(pcUrl)
  .then(async (res) => {
    pc = await res.json();
  })
  .catch(err => {
    console.log('Что-то пошло не так:', err);
  });

app.get('/task3A', (req, res) => {
    res.status(200).json(pc);
  });

app.get('/task3A/board', async function (req, res) {
    res.status(200).json(pc.board);
  });

app.get('/task3A/board/vendor', async function (req, res) {
    res.status(200).json(pc.board.vendor);
  });

app.get('/task3A/board/model', async function (req, res) {
    res.status(200).json(pc.board.model);
  });

app.get('/task3A/board/cpu', async function (req, res) {
    res.status(200).json(pc.board.cpu);
  });

app.get('/task3A/board/cpu/model', async function (req, res) {
    res.status(200).json(pc.board.cpu.model);
  });

app.get('/task3A/board/cpu/hz', async function (req, res) {
    res.status(200).json(pc.board.cpu.hz);
  });

app.get('/task3A/board/image', async function (req, res) {
    res.status(200).json(pc.board.image);
  });

app.get('/task3A/board/video', async function (req, res) {
    res.status(200).json(pc.board.video);
  });

app.get('/task3A/ram', async function (req, res) {
    res.status(200).json(pc.ram);
  });

app.get('/task3A/ram/vendor', async function (req, res) {
    res.status(200).json(pc.ram.vendor);
  });

app.get('/task3A/ram/volume', async function (req, res) {
    res.status(200).json(pc.ram.volume);
  });

app.get('/task3A/ram/pins', async function (req, res) {
    res.status(200).json(pc.ram.pins);
  });

app.get('/task3A/os', async function (req, res) {
    res.status(200).json(pc.os);
  });

app.get('/task3A/floppy', async function (req, res) {
    res.status(200).json(pc.floppy);
  });

app.get('/task3A/hdd', async function (req, res) {
    res.status(200).json(pc.hdd);
  });

app.get('/task3A/monitor', async function (req, res) {
    res.status(200).json(pc.monitor);
  });

app.get('/task3A/volumes', async function (req, res) {
  //console.log(req.path);
  const hddsArr = pc.hdd;
  let volumesArr = [];
  let sizesArr = [];

  for (let i = 0; i < Object.keys(hddsArr).length; i++) {
    let volume = JSON.stringify(hddsArr[i].volume).substr(1, 1);
    let size = JSON.stringify(hddsArr[i].size);
    if (volumesArr.indexOf(volume) == -1) {
      volumesArr.push(volume);
      sizesArr.push(+size);
    } else {
      sizesArr[volumesArr.indexOf(volume)] += +size;
    }
  }

  var volumesStr = '{"';
  for (let i = 0; i < volumesArr.length; i++) {
    volumesStr += volumesArr[i] + ':":"' + sizesArr[i] + 'B"';
    if (i < volumesArr.length - 1) {
      volumesStr += ', "';
    }
  }

  volumesStr += '}';

  res.status(200).json(JSON.parse(volumesStr));
});

app.get('/task3A/hdd/:hddId', async function (req, res) {
  const hddsArr = pc.hdd;
  if ((req.params.hddId >= 0)  &&
  (req.params.hddId <= Object.keys(hddsArr).length)) {
    res.status(200).json(hddsArr[req.params.hddId]);
  } else {
    res.status(404).send('Not Found');
  }
});

app.get('/task3A/hdd/:hddId/vendor', async function (req, res) {
  const hddsArr = pc.hdd;
  if ((req.params.hddId >= 0)  &&
  (req.params.hddId <= Object.keys(hddsArr).length)) {
    res.status(200).json(hddsArr[req.params.hddId].vendor);
  } else {
    res.status(404).send('Not Found');
  }
});

app.get('/task3A/hdd/:hddId/size', async function (req, res) {
  const hddsArr = pc.hdd;
  if ((req.params.hddId >= 0)  &&
  (req.params.hddId <= Object.keys(hddsArr).length)) {
    res.status(200).json(hddsArr[req.params.hddId].size);
  } else {
    res.status(404).send('Not Found');
  }
});

app.get('/task3A/hdd/:hddId/volume', async function (req, res) {
  const hddsArr = pc.hdd;
  if ((req.params.hddId >= 0)  &&
  (req.params.hddId <= Object.keys(hddsArr).length)) {
    res.status(200).json(hddsArr[req.params.hddId].volume);
  } else {
    res.status(404).send('Not Found');
  }
});
/*
app.get('/task3A/other', async function (req, res) {
  res.status(404).send('Not Found');
});

app.get('/task3A/some/other', async function (req, res) {
  res.status(404).send('Not Found');
});

app.get('/task3A/hdd/some/other', async function (req, res) {
  res.status(404).send('Not Found');
});
*/

app.get('/task3A/length', async function (req, res) {
  res.status(200).json(pc.length);
});

app.get('/task3A/height', async function (req, res) {
  res.status(200).json(pc.height);
});

app.get('/task3A/width', async function (req, res) {
  res.status(200).json(pc.width);
});

app.use((req, res) => {
  res.status(404).send('Not Found');
});

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
