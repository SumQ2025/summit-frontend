import React, { useState, useEffect } from "react";
import axios from "axios";
import { useOutletContext } from "react-router-dom";

import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import DownloadIcon from "@mui/icons-material/Download";
import Button from "@mui/material/Button";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

const Photo = () => {
  const [teams, setTeams] = useState([]);
  const [locations, setLocations] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [locationId, setLocationId] = useState("");
  const [teamId, setTeamId] = useState("");

  const { setIsLoading } = useOutletContext();

  const handleLocationChange = (event) => {
    setLocationId(event.target.value);
  };

  const handleTeamChange = (event) => {
    setTeamId(event.target.value);
  };

  const downloadPhoto = async () => {
    const params = {
      locationId,
      teamId,
    };
    const response = await axios.get(`${SERVER_URL}/downloadPhoto`, {
      params,
      responseType: "blob",
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "summit.zip");
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);

    window.URL.revokeObjectURL(url);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const locationRes = await axios.get(`${SERVER_URL}/getLocations`);
      const teamRes = await axios.get(`${SERVER_URL}/getTeams`);

      if (locationRes.data.message === "success") {
        setLocations(locationRes.data.locations);
      }
      if (teamRes.data.message === "success") {
        setTeams(teamRes.data.teams);
      }

      if (
        teamRes.data.teams.length !== 0 &&
        locationRes.data.locations.length !== 0
      ) {
        setTeamId(teamRes.data.teams[0]._id);
        setLocationId(locationRes.data.locations[0]._id);
        const param = {
          teamId: teamRes.data.teams[0]._id,
          locationId: locationRes.data.locations[0]._id,
        };
        const response = await axios.post(`${SERVER_URL}/getPhotosById`, param);
        if (response.data.message === "success") {
          setIsLoading(false);
          setPhotos(response.data.photos);
        }
      } else {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const getPhotosById = async () => {
      if (!teamId || !locationId) return;
      const param = {
        teamId,
        locationId,
      };
      setIsLoading(true);
      const response = await axios.post(`${SERVER_URL}/getPhotosById`, param);
      if (response.data.message === "success") {
        setIsLoading(false);
        setPhotos(response.data.photos);
      }
    };
    getPhotosById();
  }, [teamId, locationId]);

  return (
    <div className="w-[1200px]">
      <div className="flex gap-3 mb-5">
        <FormControl sx={{ width: "150px" }}>
          <InputLabel id="demo-simple-select-label">select location</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            value={locationId}
            label="select location name"
            onChange={handleLocationChange}
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
        <FormControl sx={{ width: "150px" }}>
          <InputLabel id="demo-simple-select-label">select team</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            value={teamId}
            label="select team name"
            onChange={handleTeamChange}
          >
            {teams.length > 0 &&
              teams.map((team, key) => {
                return (
                  <MenuItem value={team._id} key={key}>
                    {team.companyName}, {team.teamNumber}
                  </MenuItem>
                );
              })}
          </Select>
        </FormControl>
        <Button
          variant="outlined"
          startIcon={<DownloadIcon />}
          size="small"
          onClick={downloadPhoto}
        >
          Download
        </Button>
      </div>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {photos.length > 0 ? (
            photos.map((photo, index) => {
              return (
                <Grid key={index} size={3}>
                  <Item>
                    <img
                      src={`${SERVER_URL}/uploads/${photo.path}`}
                      alt={photo.path}
                      className="w-full h-[250px]"
                    />
                    <div className="flex flex-col mt-2">
                      <span className="text-[20px]">{photo.clueId.title}</span>
                      <span> {photo.clueId.point} POINTS</span>
                      <span>{photo.clueId.description}</span>
                    </div>
                  </Item>
                </Grid>
              );
            })
          ) : (
            <div className="text-[black] flex justify-center w-full">
              <span>No data available</span>
            </div>
          )}
        </Grid>
      </Box>
    </div>
  );
};

export default Photo;
