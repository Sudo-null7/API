const express = require('express');
const app = express()
const port = 80

//parse JSON request
app.use(express.json());
app.use(express.urlencoded({extended: false}));


let trains = [
    {
      "Letter":"A1",
      "DepartureTime":"12:00"
   },
   {
      "Letter":"A2",
      "DepartureTime":"12:30"
   },
   {
      "Letter":"B1",
      "DepartureTime":"13:00"
   },
   {
      "Letter":"B2",
      "DepartureTime":"13:30"
   },
   {
      "Letter":"C1",
      "DepartureTime":"14:30"
   },
   {
      "Letter":"C2",
      "DepartureTime":"15:00"
   }
];


// Sends the train variable to the server response
app.get('/train', (req, res) => {
  res.json(trains)
})

// get train json and get section according to Letter
app.get('/train/:Letter', (req, res) => {
    const Letter = req.params.Letter;

    for (let train of trains) {
      if(train.Letter === Letter) {
        res.json(train)
        return
      }
    }

    res.status(404).send('Train Not On list')
})

// adds train to array from post request
app.post('/train', (req, res) => {
  const train = req.body
  console.log(train);
  trains.push(train);
  res.send("Train(s) added to the list!");
});

// runs node script
app.listen(port, () => console.log(`Server listening at port ${port}`));