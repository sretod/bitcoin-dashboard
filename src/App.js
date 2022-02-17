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
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import ManageSearch from "@mui/icons-material/ManageSearch";
import SearchIcon from "@mui/icons-material/Search";
import Tooltip from "@mui/material/Tooltip";
import TableBody from "@mui/material/TableBody";

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [isShow, setIsShow] = useState(false);
  const [isTyped, setIsTyped] = useState(false);

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
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=48& page=1 & sparkline=false"
      )
      .then((res) => {
        setCoins(res.data);
      })
      .catch((error) => {
        console.log(error);
        alert("You dont have internet connection");
      });
  }, []);

  const InputChangeUpdate = (e) => {
    console.log(e.target.value);
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

  const [page, setPage] = useState(0);
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

  const [gridview, setGridView] = React.useState("list");

  useEffect(() => {
    if (localStorage.getItem("Toggle") === "grid") {
      setGridView("grid");
    }
  }, [gridview]);

  const handleChangeToggle = (event, nextView) => {
    setGridView(nextView);

    localStorage.setItem("Toggle", nextView);
  };

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "35ch",
      },
    },
  }));

  return (
    <Box className="coin-app">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              Crypto Dashboard
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search current page"
                inputProps={{ "aria-label": "search" }}
                onChange={InputChangeUpdate}
                value={search}
                autoFocus
              />
            </Search>
            <Tooltip title="Search all" placement="bottom" arrow>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ mr: 2, ml: 2 }}
                onClick={searchAll}
              >
                <ManageSearch />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          paddingLeft: "16px",
          paddingRight: "16px",
          paddingTop: "8px",
        }}
      >
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
        <TableContainer component={Paper} sx={{ paddingLeft: "16px", paddingRight: "16px"}}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="left">Symbol</TableCell>
                <TableCell align="left">Price</TableCell>
                <TableCell align="left">Volume</TableCell>
                <TableCell align="left">Current price</TableCell>
                <TableCell align="left">Price change</TableCell>
                <TableCell align="left">Market cap</TableCell>
              </TableRow>
            </TableHead>
            <TableBody >
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
            </TableBody>
          </Table>
        </TableContainer>
      ) : !isShow ? (
        <Grid
          container
          spacing={2}
          sx={{ paddingLeft: "16px", paddingRight: "16px" }}
        >
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
          {filteredCoinsAll.map((coin) => {
            return (
              <Grid item xs={3}>
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
      )}

      {!isShow ? (
        <TablePagination
          count={coins.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[]}
          backIconButtonProps={{ className: theme.primary }}
          component="div"
        />
      ) : (
        <></>
      )}
    </Box>
  );
}

export default App;
