import React, { useState, useEffect, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";

import defaultImg from "../assets/img/sketch.jpg";

import SearchBox from "../components/SearchBox";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const clueStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
};

const TablePaginationActions = (props) => {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const Clue = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [clues, setClues] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editValue, setEditValue] = useState(0);
  const [editDescription, setEditDescription] = useState("");
  const [editLocationId, setEditLocationId] = useState("");
  const [editPath, setEditPath] = useState("");
  const [editId, setEditId] = useState("");
  const [locations, setLocations] = useState([]);
  const [file, setFile] = useState(null);
  const [searchKey, setSearchKey] = useState("");
  const [imgState, setImgState] = useState(true);

  const { setIsLoading } = useOutletContext();

  const editClueFileRef = useRef(null);
  const defaultImgRef = useRef(null);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - clues.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEditClueImg = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
    let file = e.target.files[0];

    if (file) {
      let reader = new FileReader();

      reader.onload = function (e) {
        defaultImgRef.current.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const closeModal = () => {
    setEditModal(false);
    setImgState(true);
  };

  const handleCloseClick = () => {
    setImgState(false);
    setFile(null);
  };

  const deleteClue = async (clueId) => {
    const param = {
      id: clueId,
    };
    setIsLoading(true);
    const response = await axios.post(`${SERVER_URL}/deleteClue`, param);
    if (response.data.message === "success") {
      setIsLoading(false);
      setClues(response.data.clues);
    }
  };

  const editClue = async (clueId) => {
    setEditId(clueId);
    const param = {
      clueId,
    };
    setIsLoading(true);
    const response = await axios.post(`${SERVER_URL}/getClueById`, param);
    if (response.data.message === "success") {
      setIsLoading(false);
      const clue = response.data.clue;
      setEditTitle(clue.title);
      setEditValue(clue.point);
      setEditDescription(clue.description);
      setEditPath(clue.path);
      setEditLocationId(clue.locationId);
      setLocations(response.data.locations);
      setEditModal(true);
    }
  };

  const handleEditClue = async () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", editTitle);
    formData.append("value", editValue);
    formData.append("description", editDescription);
    formData.append("locationId", editLocationId);
    formData.append("editId", editId);
    formData.append("imgState", imgState);

    setIsLoading(true);
    const response = await axios.post(`${SERVER_URL}/editClue`, formData);
    if (response.data.message === "success") {
      setIsLoading(false);
      window.location.reload();
    }
  };

  const fetchClues = async () => {
    setIsLoading(true);
    const response = await axios.get(`${SERVER_URL}/getClues`);
    if (response.data.message === "success") {
      setIsLoading(false);
      setClues(response.data.clues);
    }
  };

  useEffect(() => {
    fetchClues();
  }, []);

  useEffect(() => {
    const fetchCluesByKey = async () => {
      if (searchKey === "") {
        fetchClues();
        return;
      }
      setIsLoading(true);
      const param = {
        searchKey,
      };
      const response = await axios.post(`${SERVER_URL}/getCluesByKey`, param);
      if (response.data.message === "success") {
        setIsLoading(false);
        setClues(response.data.clues);
      }
    };
    fetchCluesByKey();
  }, [searchKey]);

  return (
    <div className="w-[95%] mt-[-10px]">
      <SearchBox setSearchKey={setSearchKey} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <StyledTableCell>No</StyledTableCell>
              <StyledTableCell align="center">Location Name</StyledTableCell>
              <StyledTableCell align="center">Title</StyledTableCell>
              <StyledTableCell align="center">Value</StyledTableCell>
              <StyledTableCell align="center">Description</StyledTableCell>
              <StyledTableCell align="center">Image</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? clues.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : clues
            ).map((clue, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row" sx={{ width: "100px" }}>
                  {page * rowsPerPage + index + 1}
                </TableCell>
                <TableCell sx={{ width: "200px" }} align="center">
                  {clue.locationId.name}
                </TableCell>
                <TableCell align="center">{clue.title}</TableCell>
                <TableCell align="center">{clue.point}</TableCell>
                <TableCell sx={{ width: "700px" }} align="center">
                  {clue.description}
                </TableCell>
                <TableCell align="center" sx={{ width: "100px" }}>
                  {clue.path === "" ? (
                    <></>
                  ) : (
                    <img
                      src={`${SERVER_URL}/uploads/${clue.path}`}
                      alt="clue_img"
                      className="w-[70px]"
                    />
                  )}
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    sx={{ marginRight: "5px" }}
                    onClick={() => {
                      editClue(clue._id);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => {
                      deleteClue(clue._id);
                    }}
                  >
                    Delete
                  </Button>
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
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={7}
                count={clues.length}
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
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>

      <Modal
        keepMounted
        open={editModal}
        onClose={closeModal}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={clueStyle}>
          <div className="bg-[#1d488b] text-white p-3 text-[20px]">
            <span>Edit the detail of clue</span>
          </div>
          <div className="pt-[20px] p-[30px] flex flex-col gap-[15px]">
            <TextField
              label="Title"
              variant="standard"
              className="w-full"
              value={editTitle}
              onChange={(e) => {
                setEditTitle(e.target.value);
              }}
            />
            <TextField
              label="Value"
              variant="standard"
              value={editValue}
              className="w-full"
              onChange={(e) => {
                setEditValue(e.target.value);
              }}
            />
            <TextField
              label="Description"
              multiline
              maxRows={4}
              value={editDescription}
              variant="standard"
              onChange={(e) => {
                setEditDescription(e.target.value);
              }}
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                select location name
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                value={editLocationId}
                label="select location name"
                onChange={(e) => {
                  setEditLocationId(e.target.value);
                }}
              >
                {locations.length > 0 &&
                  locations.map((location, key) => {
                    return (
                      <MenuItem value={location._id} key={key}>
                        {location.name}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
            <InputLabel id="demo-simple-select-label">
              Click image to change photo
            </InputLabel>
            <div className="flex justify-center border-[1px] p-2 relative">
              <CloseIcon
                className="absolute top-0 right-0 hover:cursor-pointer"
                onClick={handleCloseClick}
              />
              <img
                src={
                  editPath && imgState === true
                    ? `${SERVER_URL}/uploads/${editPath}`
                    : defaultImg
                }
                alt="defaultImg"
                ref={defaultImgRef}
                className="w-[200px]"
                onClick={() => {
                  editClueFileRef.current.click();
                }}
              />
              <input
                type="file"
                className="hidden"
                ref={editClueFileRef}
                onChange={handleEditClueImg}
              />
            </div>
            <div className="mt-1">
              <Button
                variant="contained"
                className="w-full"
                sx={{ backgroundColor: "#1d488b" }}
                onClick={handleEditClue}
              >
                SAVE
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Clue;
