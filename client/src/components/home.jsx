import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
// import { GoogleMap, useLoadScript, useJsApiLoader } from '@react-google-maps/api';
import axios from 'axios';
import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const icon = L.icon({
    iconUrl: "./placeholder.png",
    iconSize: [38, 38],
  });

  const position = [51.505, -0.09];

  function ResetCenterView(props) {
    const { selectPosition } = props;
    const map = useMap();

    useEffect(() => {
      if (selectPosition) {
        map.setView(
          L.latLng(selectPosition?.lat, selectPosition?.lon),
          map.getZoom(),
          {
            animate: true
          }
        )
      }
    }, [selectPosition, map]);

    return null;
  }


function Home(props) {

    const { selectPosition } = props;
    const locationSelection = [selectPosition?.lat, selectPosition?.lon];

    const [data, setData] = useState("")
    const [arr, setArr] = useState([])


    const generateTravel =  (event) => {
        const depart = event.target.parentElement.children[0].children[0].value;
        const arrive = event.target.parentElement.children[0].children[2].value;
        const sentence = event.target.parentElement.children[2].children[0].value;
        let finalS;
        if (depart === "" && arrive === "") {
            if (sentence != "") {
                finalS = sentence;
                // console.log(sentence);
            }
        }
        else if (depart != "" && arrive != "") {
            finalS = depart + " " + arrive;
            // console.log(depart + " " + arrive);
        }
        // console.log(finalS);
        axios.post("http://localhost:3003/", {
            msg:finalS
        })
            .then(res => {
                // console.log(res.data);
                setData(res.data[0])
                setArr(res.data[1])
                console.log(arr)
        })

    }
    

    return (
        <div className="mainHome">
            <div className="searchBarProfs">
                <input type="text" placeholder="Depart from" />
                <CompareArrowsIcon/>
                <input type="text" placeholder="Going to" />
            </div>
            <h1 className="or">Or</h1>
            <div className="searchBarProfs1">
                <input type="text" placeholder="Just type your plan here"/>
            </div>
            <button className="go" onClick={generateTravel}>Go</button>
            <div className="ansDiv">
                <div className="mapDiv">
                <MapContainer
                    center={position}
                    zoom={8}
                    style={{ width: "100%", height: "100%" }}
                    
                >
                    
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=XZXED0YTGd08geGh6UOw"
                />
                <ResetCenterView selectPosition={selectPosition} />
                {/* {selectPosition && (
                    <Marker position={locationSelection} icon={icon}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                    </Marker>
                )}
                <ResetCenterView selectPosition={selectPosition} /> */}
    </MapContainer>
                </div>
                <div className="textDiv">
                    <p>{data}</p>
                </div>
            </div>
        </div>
    );

}

export default Home;