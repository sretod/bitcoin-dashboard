import * as React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";

const Rows = ({
  id,
  name,
  image,
  symbol,
  price,
  volume,
  priceChange,
  marketcap,
}) => {
  return (
    <TableRow
      key={id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell
        component="th"
        scope="row"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
        }}
      >
        <Avatar alt="btc symbo image" src={image} />
        <Box sx={{ ml: 3 }}>{name}</Box>
      </TableCell>
      <TableCell align="left">{symbol}</TableCell>
      <TableCell align="left">${price}</TableCell>

      <TableCell align="left">${volume.toLocaleString()}</TableCell>

      <TableCell align="left">
        {" "}
        {priceChange < 0 ? (
          <p className="coin-percent red">{priceChange.toFixed(2)}%</p>
        ) : (
          <p className="coin-percent green">{priceChange.toFixed(2)}%</p>
        )}
      </TableCell>

      <TableCell align="left">{priceChange}</TableCell>
      <TableCell align="left">
        {" "}
         ${marketcap.toLocaleString()}
      </TableCell>
    </TableRow>
  );
};

export default Rows;
