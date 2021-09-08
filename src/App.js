import { useState, useEffect } from "react";
import api from "./services/api";
import Giphy from './components/Giphy';
import axios from 'axios';

import chuckImg from './assets/chuck-norris-desenho.jpg';

import {
  Container,
  TextField,
  Button,
  Grid,
  makeStyles,
  Typography,
  Paper
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 50,
    flexGrow: 1,
  },
  input: {
    marginTop: 20
  },
  button: {
    marginTop: 10
  },
  paper: {
    marginTop: 70,
    padding: theme.spacing(2),
    textAlign: 'center',
  },
  img: {
    width: '60%'
  },
  giphy: {
    marginTop: 50,
    textAlign: 'center',
  }
}));

function App() {
  const classes = useStyles();

  const [joke, setJoke] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    handleJokes();
  }, []);

  const translateText = () => {
    axios.post('https://libretranslate.de/translate', {
      "q": joke,
      "source": "en",
      "target": "pt"
    })
    .then(res => {
      setJoke(res.data.translatedText);
    })
  }

  const handleJokes = () => {
    if (name !== "" && name.split(' ').length < 2) {
      api.get(`/random?firstName=${name}`).then((response) => {
        setJoke(response.data.value.joke);
      });
    } else if(name !== "" && name.split(' ').length === 2) {
      const nameComplete = name.split(' ');
      api.get(`/random?firstName=${nameComplete[0]}&lastName=${nameComplete[1]}`).then((response) => {
        setJoke(response.data.value.joke);
      });
    } else {
      api.get(`/random`).then((response) => {
        setJoke(response.data.value.joke);
      });
    }
  };

  return (
    <Container className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={6} justifyContent="center" container>
          <img className={classes.img} src={chuckImg} alt="Chuck Norris Desenho" />
        </Grid>
        <Grid item xs={6}>
          <TextField
            className={classes.input}
            fullWidth
            id="outlined-basic"
            label="Insira seu nome"
            variant="outlined"
            onChange={(event) => setName(event.target.value)}
          />
          <Button variant="contained" className={classes.button} color="primary" onClick={handleJokes}>
            Gerar piada
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper} elevation={2}>
            <Typography variant="h6" gutterBottom>{JSON.stringify(joke).toString()}</Typography>
          </Paper>
          <Button variant="contained" className={classes.button} color="secondary" onClick={translateText}>
            Traduzir texto
          </Button>
        </Grid>
      </Grid>
      <Grid className={classes.giphy} item xs={12}>
        <Giphy />
      </Grid>
    </Container>
  );
}

export default App;
