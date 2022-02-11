import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import CoinTable from "./CoinTable";
import CoinGrid from "./CoinGrid";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { createTheme } from "@mui/material/styles";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [isShow, setIsShow] = useState(false);
  const [isTyped, setIsTyped] = useState(false);
  const [coinsLenght, setCoinsLenght] = useState(48);

  const handleChange = (event) => {
   
    setrowsPerPage(event.target.value);

  };

  const theme = createTheme({
    palette: {
      primary: {
        main: "#808080",
      },
      secondary: {
        main: "#f44336",
      },
    },
  });

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=" +
          coinsLenght +
          "&page=1&sparkline=false"
      )
      .then((res) => {
        setCoins(res.data);
      })
      .catch((error) => console.log(error));
  }, [coinsLenght]);

  const InputChangeUpdate = (e) => {
    setSearch(e.target.value);
    setIsTyped(!isTyped);
    if (isShow) {
      setIsShow(false);
    }

    if (e.target.value === "") {
      setIsTyped(false);
      setIsShow(false);
    }
  };

  const [page, setPage] = React.useState(0);
  //const rowsPerPage = 12;
  const [rowsPerPage, setrowsPerPage] = useState(12);
  const coinssliced = coins.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const filteredCoins = coinssliced.filter((coin) => {
    return coin.name.toLowerCase().includes(search.toLowerCase());
  });

  const filteredCoinsAll = coins.filter((coin) => {
    return coin.name.toLowerCase().includes(search.toLowerCase());
  });

  function searchAll() {
    setIsShow(!isShow);
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const [gridview, setGridView] = React.useState("");

  useEffect(() => {
    if (gridview !== "list" || gridview === "") {
      setGridView(localStorage.getItem("Toggle"));
    } else {
      setGridView("list");
    }
  }, [gridview]);

  const handleChangeToggle = (event, nextView) => {
    setGridView(nextView);

    localStorage.setItem("Toggle", nextView);
  };

  return (
    <Box className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Search current</h1>
        <form>
          <input
            type="text"
            placeholder="Search curent page"
            className="coin-input"
            onChange={InputChangeUpdate}
          />
          <Button onClick={searchAll} variant="contained" sx={{ ml: "10px" }}>
            Search all
          </Button>
        </form>
      </div>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ maxWidth: 100, marginBottom: "1vw" }}>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="coin-select-label">Coins fetched</InputLabel>
            <Select
              labelId="coin-select-label"
              id="coin-select"
              value={rowsPerPage}
              label="select"
              onChange={handleChange}
            >
              <MenuItem value={12}>12</MenuItem>
              <MenuItem value={24}>24</MenuItem>
              <MenuItem value={36}>36</MenuItem>
              <MenuItem value={48}>48</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <ToggleButtonGroup
          value={gridview}
          exclusive
          onChange={handleChangeToggle}
          className="coin-toggle"
          sx={{ marginBottom: "1vw" }}
        >
          <ToggleButton value="list" aria-label="list">
            <ViewListIcon />
          </ToggleButton>
          <ToggleButton value="grid" aria-label="grid" sx={{}}>
            <ViewModuleIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      {gridview === "list" ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="left">Symbol</TableCell>
                <TableCell align="left">Price</TableCell>
                <TableCell align="left">Volume</TableCell>
                <TableCell align="left">Current price</TableCell>
                <TableCell align="left">Price change</TableCell>
                <TableCell align="left">MArket cap</TableCell>
              </TableRow>
            </TableHead>
            {isShow
              ? filteredCoinsAll.map((coin) => {
                  return (
                    <CoinTable
                      key={coin.id}
                      name={coin.name}
                      image={coin.image}
                      symbol={coin.symbol}
                      marketcap={coin.market_cap}
                      price={coin.current_price}
                      priceChange={coin.price_change_percentage_24h}
                      volume={coin.total_volume}
                    />
                  );
                })
              : filteredCoins.map((coin) => {
                  return (
                    <CoinTable
                      key={coin.id}
                      name={coin.name}
                      image={coin.image}
                      symbol={coin.symbol}
                      marketcap={coin.market_cap}
                      price={coin.current_price}
                      priceChange={coin.price_change_percentage_24h}
                      volume={coin.total_volume}
                    />
                  );
                })}
          </Table>
        </TableContainer>
      ) : !isShow ? (
        <Grid container spacing={2}>
          {filteredCoins.map((coin) => {
            return (
              <Grid item xs={3} md={2}>
                <CoinGrid
                  key={coin.id}
                  name={coin.name}
                  image={coin.image}
                  price={coin.current_price}
                  priceChange={coin.price_change_percentage_24h}
                />
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <Grid container spacing={2}>
          {filteredCoinsAll.map(({id,name,image,current_price,price_change_percentage_24h}) => {
            return (
              <Grid item xs={3}>
                <CoinGrid
                  key={id}
                  name={name}
                  image={image}
                  price={current_price}
                  priceChange={price_change_percentage_24h}
                />
              </Grid>
            );
          })}
        </Grid>
      )}

      {!isShow ? (
        <TablePagination
          count={coins.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[]}
          backIconButtonProps={{ className: theme.primary }}
        />
      ) : (
        <></>
      )}
    </Box>
  );
}

export default App;
