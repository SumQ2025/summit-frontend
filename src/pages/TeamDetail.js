import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 62,
  height: 36,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(27px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: "#1d488b",
        opacity: 1,
        border: 0,
        ...theme.applyStyles("dark", {
          backgroundColor: "#2ECA45",
        }),
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color: theme.palette.grey[100],
      ...theme.applyStyles("dark", {
        color: theme.palette.grey[600],
      }),
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: 0.7,
      ...theme.applyStyles("dark", {
        opacity: 0.3,
      }),
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 32,
    height: 32,
  },
  "& .MuiSwitch-track": {
    borderRadius: 36 / 2,
    backgroundColor: "#E9E9EA",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
    ...theme.applyStyles("dark", {
      backgroundColor: "#39393D",
    }),
  },
}));
const TeamDetail = () => {
  const location = useLocation();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [locations, setLocations] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [teamNumber, setTeamNumber] = useState("");
  const { teamId } = location.state;
  const { setIsLoading } = useOutletContext();
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - locations.length) : 0;
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleSwitch = async (id) => {
    const updatedLocations = locations.map((location) => {
      if (location._id === id) {
        return { ...location, checked: !location.checked };
      }
      return location;
    });
    setLocations(updatedLocations);
  };
  const saveTeamDetail = async () => {
    const param = {
      locations,
      teamId,
      teamNumber,
      companyName,
    };
    setIsLoading(true);
    const response = await axios.post(`${SERVER_URL}/saveTeamDetail`, param);
    if (response.data.message === "success") {
      setIsLoading(false);
      window.location.href = "/admin/team";
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const param = {
        teamId,
      };
      setIsLoading(true);
      const response = await axios.post(
        `${SERVER_URL}/getLocationsById`,
        param
      );
      setIsLoading(false);
      setLocations(response.data.locations);
      setCompanyName(response.data.team.companyName);
      setTeamNumber(response.data.team.teamNumber);
    };
    fetchData();
  }, []);
  return (
    <div className="w-[500px]">
      <div className="flex gap-5 mb-3 px-5">
        <TextField
          label="Company name"
          variant="standard"
          className="w-full"
          value={companyName}
          onChange={(e) => {
            setCompanyName(e.target.value);
          }}
        />
        <TextField
          label="Team number"
          variant="standard"
          className="w-full"
          value={teamNumber}
          onChange={(e) => {
            setTeamNumber(e.target.value);
          }}
        />
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <StyledTableCell>No</StyledTableCell>
              <StyledTableCell align="center">Location Name</StyledTableCell>
              <StyledTableCell align="center">Enable / Disable</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? locations.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : locations
            ).map((location, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row" sx={{ width: "100px" }}>
                  {index + 1}
                </TableCell>
                <TableCell sx={{ width: "200px" }} align="center">
                  {location.name}
                </TableCell>
                <TableCell align="center">
                  <IOSSwitch
                    sx={{ m: 1 }}
                    checked={location.checked === true ? true : false}
                    onChange={() => {
                      handleSwitch(location._id);
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell align="right" colSpan={2}>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={4}
                  count={locations.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  slotProps={{
                    select: {
                      inputProps: {
                        "aria-label": "rows per page",
                      },
                      native: true,
                    },
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableCell>
              <TableCell align="right">
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  onClick={saveTeamDetail}
                >
                  Save
                </Button>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
};
export default TeamDetail;